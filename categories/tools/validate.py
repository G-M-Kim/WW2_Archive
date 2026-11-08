#!/usr/bin/env python3
"""Validate this category workflow's structure; this does not verify history."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COUNTRIES = [('DE', 'germany'), ('FR', 'france'), ('GB', 'united-kingdom'),
             ('US', 'united-states'), ('JP', 'japan'), ('IT', 'italy'),
             ('SU', 'soviet-union')]
RESULTS = {'reviewed', 'partial', 'blocked'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def read_json(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8'))


def local_path(path):
    require(path.startswith('categories/'), f'Forbidden path: {path}')
    dest = (ROOT.parent / path).resolve()
    require(dest.is_relative_to(ROOT.resolve()), f'Escaping path: {path}')
    return dest


def main():
    state = read_json('STATE.json')
    queue = read_json('QUEUE.json')
    schema = read_json('CATALOG_SCHEMA.json')
    auto = read_json('AUTOMATION.json')
    require(state['branch'] == 'draft/categories-seven-powers-v1', 'Wrong branch')
    require(state['write_prefix'] == 'categories/', 'Wrong write prefix')
    require(len(queue) == state['total_steps'] == 133, 'Expected 133 jobs')
    require(state['categories_per_country'] == 19, 'Expected 19 categories')
    require(state['country_order'] == [c for c, _ in COUNTRIES], 'Country order mismatch')
    require(auto['count'] == 132 and auto['manually_completed_count'] == 1 and auto['total_steps'] == 133 and auto['interval_hours'] == 2, 'Wrong schedule')
    require(auto['timezone'] == 'Asia/Seoul', 'Wrong timezone')
    if auto['status'] == 'enabled':
        require(bool(auto['automation_id']), 'Enabled automation has no ID')

    sources, questions = set(), set()
    question_rows = []
    for code, folder in COUNTRIES:
        for kind, filename, target in [('SRC', 'SOURCES.json', sources),
                                        ('RQ', 'QUESTIONS.json', questions)]:
            for row in read_json(f'{folder}/{filename}'):
                key = row['id']
                require(re.fullmatch(fr'CAT-{code}-{kind}-[0-9]{{4,}}', key), f'Bad ID: {key}')
                require(key not in target, f'Duplicate ID: {key}')
                target.add(key)
                needed = schema['source_required' if kind == 'SRC' else 'question_required']
                require(set(needed).issubset(row), f'Missing catalog fields: {key}')
                if kind == 'RQ':
                    require(row['status'] in {'open', 'in_progress', 'blocked', 'done'}, f'Bad question state: {key}')
                    question_rows.append(row)
                else:
                    require(row['access_status'] in {'source_checked', 'verified', 'candidate', 'disputed', 'inaccessible'}, f'Bad source state: {key}')

    seen_jobs, visited, pending = set(), [], []
    ledger = (ROOT / 'RUN_LOG.md').read_text(encoding='utf-8')
    for step, job in enumerate(queue, 1):
        code, folder = COUNTRIES[(step - 1) // 19]
        category = (step - 1) % 19 + 1
        jid = f'CAT-{code}-{category:02d}'
        require(job['step'] == step and job['job_id'] == jid, f'Job order mismatch: {step}')
        require(job['country_code'] == code and job['country_folder'] == folder, f'Country mismatch: {jid}')
        require(job['category_number'] == category, f'Category mismatch: {jid}')
        require(jid not in seen_jobs, f'Duplicate job: {jid}')
        seen_jobs.add(jid)
        article = local_path(job['article_path'])
        require(article.parent.name == folder, f'Article folder mismatch: {jid}')
        require(article.name.startswith(f'{category:02d}-'), f'Article number mismatch: {jid}')
        status = job['status']
        require(status in RESULTS | {'pending'}, f'Bad status: {jid}')
        if status == 'pending':
            pending.append(step)
            require(job['run_record'] is None, f'Pending job has result: {jid}')
            continue
        require(not pending, f'Visited job after pending job: {jid}')
        visited.append(job)
        require(article.exists(), f'Missing article: {jid}')
        require(job['run_record'] == f'categories/runs/{jid}.json', f'Run path mismatch: {jid}')
        record = json.loads(local_path(job['run_record']).read_text(encoding='utf-8'))
        required = {'job_id', 'step', 'country', 'category', 'started_at', 'completed_at', 'status',
                    'article_path', 'source_ids', 'question_ids', 'research_scope', 'limitations'}
        require(required.issubset(record), f'Missing run fields: {jid}')
        require(record['job_id'] == jid and record['step'] == step and record['status'] == status, f'Run mismatch: {jid}')
        require(record['article_path'] == job['article_path'], f'Run article mismatch: {jid}')
        require(record['country'] == job['country'] and record['category'] == job['category'], f'Run topic mismatch: {jid}')
        require(bool(record['research_scope']) and bool(record['completed_at']), f'Empty run result: {jid}')
        require(set(record['source_ids']).issubset(sources), f'Unregistered source: {jid}')
        require(set(record['question_ids']).issubset(questions), f'Unregistered question: {jid}')
        if category >= 16:
            require('rating_records' in record, f'Missing rating records: {jid}')
            for rating in record['rating_records']:
                require(set(schema['rating_required']).issubset(rating), f'Missing rating fields: {jid}')
                require(re.fullmatch(fr'CAT-{code}-GEO-[0-9]{{4,}}', rating['entity_id']), f'Bad facility ID: {jid}')
                require(rating['method_version'] == schema['rating_method'], f'Unknown rating method: {jid}')
                require(rating['score_status'] in {'source_based_estimate', 'candidate', 'disputed', 'inaccessible'}, f'Bad rating status: {jid}')
                upper = 20 if category in {16, 17} else 10
                score = rating['score']
                require(score is None or type(score) is int and 1 <= score <= upper, f'Rating out of range: {jid}')
                require(score is None or rating['score_status'] == 'source_based_estimate', f'Unsubstantiated score: {jid}')
                require(bool(rating['rationale']), f'Empty rating explanation: {jid}')
                require(set(rating['source_ids']).issubset(sources), f'Unregistered rating source: {jid}')
                bounds = rating['score_range']
                require(bounds is None or len(bounds) == 2 and all(type(x) is int and 1 <= x <= upper for x in bounds) and bounds[0] <= bounds[1], f'Bad rating interval: {jid}')
                dims = rating['dimension_ratings']
                require(len(dims) == 4 and all(x is None or type(x) is int and 1 <= x <= 5 for x in dims), f'Bad rating dimensions: {jid}')
                if score is not None:
                    require(all(x is not None for x in dims) and bool(rating['anchors']) and bool(rating['metrics']), f'Incomplete rating evidence: {jid}')
                    expected = 1 + ((upper - 1) * (sum(dims) - 4) + 8) // 16
                    require(score == expected, f'Rating formula mismatch: {jid}')
        require(ledger.count(f'| {jid} |') == 1, f'Ledger missing/duplicate job: {jid}')
        text = article.read_text(encoding='utf-8')
        require(jid in text, f'Article missing job ID: {jid}')
        for ref in re.findall(r'CAT-(?:DE|FR|GB|US|JP|IT|SU)-(?:SRC|RQ)-[0-9]{4,}', text):
            require(ref in sources | questions, f'Broken article reference: {ref}')

    require(state['CAT_VISITED_COUNT'] == len(visited), 'Visited count mismatch')
    require(state['CAT_NEXT_STEP'] == (pending[0] if pending else None), 'Next step mismatch')
    require(state['CAT_LAST_JOB_ID'] == (visited[-1]['job_id'] if visited else None), 'Last job mismatch')
    require(state['CAT_PHASE'] in {'scheduled', 'running', 'first_pass_finished'}, 'Invalid phase')
    require((state['CAT_PHASE'] == 'first_pass_finished') == (not pending), 'Finished phase mismatch')
    require(len(re.findall(r'\| CAT-(?:DE|FR|GB|US|JP|IT|SU)-[0-9]{2} \|', ledger)) == len(visited), 'Ledger row count mismatch')
    print(f'PASS: 133 jobs; visited={len(visited)} pending={len(pending)}; '
          f'sources={len(sources)} questions={len(questions)}. Structural check only.')


if __name__ == '__main__':
    main()
