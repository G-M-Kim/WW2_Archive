"use strict";

const ui = Object.fromEntries(Array.from(document.querySelectorAll("[id]"), node => [node.id, node]));
const COUNT = new Intl.NumberFormat("ko-KR");
const LABELS = ["문헌대조", "링크등록", "미등록"];
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const REPO = "https://github.com/G-M-Kim/WW2_Archive/blob/";
const PAGE_SIZE = 16;
const DAY = 86400000;
const state = { period: "", day: "", activeDay: "", evidence: "", limit: PAGE_SIZE };
let data;
let periods;
let firstDay;
let lastDay;
let lookup;

function node(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}

function link(label, href, external = false) {
  const item = node("a", label);
  item.href = href;
  if (external) {
    item.target = "_blank";
    item.rel = "noopener noreferrer";
  }
  return item;
}

function dateAt(value) {
  return new Date(value + "T00:00:00Z");
}

function formatDate(value) {
  return value.toISOString().slice(0, 10);
}

function shift(value, amount) {
  return formatDate(new Date(dateAt(value).getTime() + amount * DAY));
}

function monday(day) {
  return shift(day, -((dateAt(day).getUTCDay() + 6) % 7));
}

function formatShort(day) {
  return Number(day.slice(5, 7)) + "." + Number(day.slice(8, 10));
}

function weekLabel(first) {
  const last = shift(first, 6);
  const from = first.slice(0, 4) + "년 " + Number(first.slice(5, 7)) + "월 " + Number(first.slice(8, 10)) + "일";
  const endYear = first.slice(0, 4) === last.slice(0, 4) ? "" : last.slice(0, 4) + "년 ";
  const to = endYear + Number(last.slice(5, 7)) + "월 " + Number(last.slice(8, 10)) + "일";
  return from + " – " + to;
}

function stats(ids) {
  const counts = [0, 0, 0];
  for (const id of ids) counts[data.events[id][4]]++;
  return counts;
}

function density(count) {
  if (!count) return 0;
  if (count < 4) return 1;
  if (count < 12) return 2;
  if (count < 38) return 3;
  return 4;
}

function matched(ids) {
  return (ids || []).filter(id => state.evidence === "" || data.events[id][4] === Number(state.evidence));
}

function button(parent, label, work) {
  const item = node("button", label);
  item.type = "button";
  item.addEventListener("click", work);
  parent.append(item);
  return item;
}

function canonical(path, line) {
  return REPO + data.revision + "/" + path.split("/").map(encodeURIComponent).join("/") + "#L" + line;
}

function monthRecord(page) {
  return "../chronology/" + encodeURIComponent(page) + "/";
}

function periodLabel(period) {
  if (period === "prologue") return "프롤로그 · 1936년 이전";
  if (period === "epilogue") return "에필로그 · 1945년 이후";
  return period.slice(0, 4) + "년 " + Number(period.slice(5)) + "월";
}

function updateView(period, day, eventId) {
  state.period = period;
  state.day = day;
  state.activeDay = "";
  state.limit = PAGE_SIZE;
  state.selected = eventId;
  const hash = eventId || day || period;
  if (location.hash.slice(1) !== hash) history.replaceState(null, "", "#" + hash);
  render();
}

function selectPeriod(period, eventId) {
  updateView(period, "", eventId);
}

function selectDay(day) {
  if (day < firstDay) {
    selectPeriod("prologue");
    return;
  }
  if (day > lastDay) {
    selectPeriod("epilogue");
    return;
  }
  updateView(day.slice(0, 7), day);
}

function setFromHash() {
  const anchor = location.hash.slice(1);
  if (Object.hasOwn(data.events, anchor)) {
    revealEvent(anchor);
  } else if (Object.hasOwn(data.periods, anchor)) {
    selectPeriod(anchor);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(anchor) && Number.isFinite(dateAt(anchor).getTime())) {
    selectDay(formatDate(dateAt(anchor)));
  } else {
    selectPeriod(periods[0]);
  }
}

function weekEvents(first) {
  return (data.weeks[first] || []).filter(id => {
    const day = data.events[id][0];
    return day >= firstDay && day <= lastDay;
  });
}

function showYear(year, week) {
  const start = monday(year + "-01-01");
  const end = year + "-12-31";
  ui["year-heading"].textContent = year + "년 주별 기록";
  const summary = data.years[year] || {};
  const count = Object.values(summary).reduce((a, b) => a + b, 0);
  ui["year-stats"].textContent = "등록 " + COUNT.format(count) + "건 · 문헌대조 " + COUNT.format(summary[0] || 0) + "건";
  const fragment = document.createDocumentFragment();
  for (let first = start; first <= end; first = shift(first, 7)) {
    const key = first;
    const size = matched(weekEvents(key)).length;
    const yearStart = year + "-01-01";
    const day = key < yearStart ? yearStart : key;
    const text = day.endsWith("-01") || day === yearStart || Number(day.slice(8)) <= 7 ? Number(day.slice(5, 7)) + "월" : "";
    const tile = button(fragment, text, () => {
      selectDay(day);
      ui["year-grid"].querySelector('[aria-current="date"]')?.focus({preventScroll:true});
    });
    tile.dataset.density = density(size);
    tile.setAttribute("aria-label", weekLabel(key) + ", " + COUNT.format(size) + "건");
    tile.title = weekLabel(key) + " · " + COUNT.format(size) + "건";
    if (key === week) tile.setAttribute("aria-current", "date");
  }
  ui["year-grid"].replaceChildren(fragment);
}

function eventRow(id, fullDate) {
  const [when, title, category, stateText, evidence, sources, file, line] = data.events[id];
  const details = node("details", undefined, "event s" + evidence);
  details.id = id;
  const summary = node("summary");
  const stamp = node("time", fullDate ? when : formatShort(when));
  stamp.dateTime = when;
  summary.append(stamp, node("strong", title), node("span", LABELS[evidence], "flag"));
  const body = node("div", undefined, "event-data");
  const meta = node("p", id + " · " + when + " · " + category + " · " + stateText, "id");
  body.append(meta);
  if (sources.length) {
    const list = node("ul");
    for (const source of sources) {
      const [name, kind, location, urls, sourceLine] = data.sources[source];
      const row = node("li");
      row.append(link(source + " · " + name, urls[0] || canonical(data.sourceFile, sourceLine), true));
      if (kind || location) row.append(node("p", [kind, location].filter(Boolean).join(" · ")));
      list.append(row);
    }
    body.append(list);
  } else {
    body.append(node("p", "현재 원고에 연결된 출처가 없습니다."));
  }
  const links = node("p");
  const page = file.split("/").at(-1).replace(/\.md$/, "");
  const within = /^\d{4}-\d{2}$/.test(page);
  links.append(
    link(within ? "위키 월별 연표" : "위키 " + periodLabel(page), monthRecord(page)),
    document.createTextNode(" · "),
    link("GitHub 연표 원고에서 보기 ↗", canonical(file, line), true)
  );
  body.append(links);
  details.append(summary, body);
  if (state.selected === id) details.open = true;
  return details;
}

function drawEvidence(ids) {
  const counts = stats(ids);
  const bar = document.createDocumentFragment();
  const legend = document.createDocumentFragment();
  counts.forEach((count, i) => {
    const stripe = node("span", undefined, "s" + i);
    stripe.style.width = ids.length ? (100 * count / ids.length) + "%" : "0";
    bar.append(stripe);
    legend.append(node("li", LABELS[i] + " " + COUNT.format(count), "s" + i));
  });
  ui["evidence-bar"].replaceChildren(bar);
  ui["evidence-list"].replaceChildren(legend);
}

function drawVisual(first, ids, daily) {
  const figure = ui.visual;
  figure.replaceChildren();
  const representative = ids.find(id => Object.hasOwn(data.media, id));
  figure.hidden = !first && !representative;
  function drawChart() {
    if (!first) {
      figure.hidden = true;
      return;
    }
    figure.className = "graphic";
    const title = node("h3", "요일별 수록량");
    const bars = node("div", undefined, "bars");
    const peak = Math.max(1, ...daily);
    daily.forEach((count, i) => {
      const cell = node("div");
      const vertical = node("span");
      cell.setAttribute("aria-label", formatShort(shift(first, i)) + " " + COUNT.format(count) + "건");
      if (count) {
        const height = (83 * count / peak) + "%";
        vertical.style.setProperty("--bar", height);
        vertical.append(node("i"), node("strong", COUNT.format(count)));
      }
      cell.append(vertical, node("b", DAYS[i]));
      bars.append(cell);
    });
    figure.replaceChildren(title, bars, node("figcaption", "연결된 기록 사진이 없는 주에는 요일별 수록량을 표시합니다."));
  }
  if (!representative) {
    drawChart();
    return;
  }
  const photo = data.media[representative];
  figure.className = "media";
  const image = node("img");
  image.alt = photo.caption;
  image.decoding = "async";
  image.addEventListener("error", () => {
    if (figure.contains(image)) drawChart();
  }, {once: true});
  const caption = node("figcaption");
  caption.append(
    node("div", photo.kind, "figure-label"),
    node("strong", photo.caption),
    node("span", photo.credit + " · "),
    link(photo.license, photo.licenseUrl, true),
    document.createTextNode(" · "),
    link("소장 정보 ↗", photo.source, true),
  );
  figure.append(image, caption);
  image.src = photo.file;
}

function drawEvents(first, ids, daily) {
  const days = document.createDocumentFragment();
  const drawDay = (label, count, key) => {
    const selector = button(days, label, () => {
      state.activeDay = key;
      state.selected = undefined;
      state.limit = PAGE_SIZE;
      drawEvents(first, ids, daily);
      ui.days.querySelector('[aria-pressed="true"]')?.focus({preventScroll:true});
    });
    selector.append(node("strong", COUNT.format(count)));
    selector.setAttribute("aria-pressed", String(state.activeDay === key));
    selector.setAttribute("aria-label", (key ? key + " " : "주 전체 ") + COUNT.format(count) + "건");
  };
  drawDay("전체", ids.length, "");
  DAYS.forEach((day, i) => drawDay(day, daily[i], shift(first, i)));
  ui.days.replaceChildren(days);
  const filtered = state.activeDay ? ids.filter(id => data.events[id][0] === state.activeDay) : ids;
  drawRecordList(filtered, false);
}

function drawRecordList(ids, fullDate) {
  ui.events.classList.toggle("full-dates", fullDate);
  const count = ids.length;
  ui["event-summary"].textContent = count
    ? (state.activeDay ? state.activeDay + " · " : "") + "사건 " + COUNT.format(count) + "건"
    : "선택한 기간과 조건에 등록된 사건이 없습니다.";
  const shown = ids.slice(0, state.limit);
  if (state.selected && ids.includes(state.selected) && !shown.includes(state.selected)) {
    shown.push(state.selected);
  }
  ui.events.replaceChildren(...shown.map(id => eventRow(id, fullDate)));
  ui.more.hidden = state.limit >= count;
  ui.more.textContent = "사건 " + Math.min(PAGE_SIZE, count - state.limit) + "개 더 보기";
}

function render() {
  const period = state.period;
  const index = periods.indexOf(period);
  const monthly = index > 0 && index < periods.length - 1;
  const first = state.day ? monday(state.day) : null;
  const raw = first ? weekEvents(first) : data.periods[period];
  const ids = matched(raw);
  const suffix = ids.length !== raw.length ? " · 필터 적용 전 " + COUNT.format(raw.length) + "건" : "";

  ui.period.value = period;
  ui.date.value = state.day;
  ui["month-record"].href = monthRecord(period);
  ui["month-record"].textContent = periodLabel(period) + " 원고 보기";
  ui["period-prev"].disabled = index === 0;
  ui["period-next"].disabled = index === periods.length - 1;
  ui["year-panel"].hidden = !monthly;
  if (monthly) showYear(period.slice(0, 4), first);
  ui["view-caption"].textContent = first ? periodLabel(period) + " · 주간 기록" : "기간별 기록";
  ui["week-heading"].textContent = first ? weekLabel(first) : periodLabel(period);
  ui["week-stats"].textContent = "등록 사건 " + COUNT.format(ids.length) + "건" + suffix;
  ui["week-nav"].hidden = !first;
  ui.days.hidden = !first;

  const daily = Array(7).fill(0);
  if (first) {
    for (const id of ids) daily[(dateAt(data.events[id][0]).getUTCDay() + 6) % 7]++;
  }
  drawVisual(first, ids, daily);
  drawEvidence(ids);
  if (first) drawEvents(first, ids, daily);
  else drawRecordList(ids, true);
}

function revealEvent(id) {
  const event = data.events[id];
  if (state.evidence !== "" && state.evidence !== String(event[4])) {
    state.evidence = "";
    ui.status.value = "";
  }
  const page = event[6].split("/").at(-1).replace(/\.md$/, "");
  selectPeriod(page, id);
  const row = document.getElementById(id);
  if (!row) return;
  row.querySelector("summary").focus({preventScroll:true});
  row.scrollIntoView({block:"nearest"});
}

function runSearch() {
  const terms = ui.query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    ui.results.hidden = true;
    return;
  }
  const matches = lookup.filter(row => terms.every(term => row.text.includes(term)));
  const list = node("ul");
  for (const {id} of matches.slice(0, 22)) {
    const item = node("li");
    const result = button(item, undefined, () => {
      ui.results.hidden = true;
      revealEvent(id);
    });
    const [when, title] = data.events[id];
    const time = node("time", when);
    time.dateTime = when;
    result.append(time, document.createTextNode(title));
    list.append(item);
  }
  ui.results.replaceChildren(node("p", "전체 연표 검색 · " + COUNT.format(matches.length) + "건" + (matches.length > 22 ? " · 앞 22건 표시" : "")), list);
  ui.results.hidden = false;
}

function setup(index) {
  data = index;
  const entries = Object.keys(data.events);
  lookup = entries.map(id => ({id, text:[id, ...data.events[id].slice(0, 4)].join(" ").toLowerCase()}));
  periods = Object.keys(data.periods);
  firstDay = periods[1] + "-01";
  lastDay = periods.at(-2) + "-31";
  ui.date.min = firstDay;
  ui.date.max = lastDay;
  let group;
  for (const period of periods) {
    const option = new Option(periodLabel(period) + " · " + COUNT.format(data.periods[period].length) + "건", period);
    if (period === "prologue" || period === "epilogue") {
      ui.period.append(option);
      continue;
    }
    const label = period.slice(0, 4) + "년";
    if (!group || group.label !== label) {
      group = node("optgroup");
      group.label = label;
      ui.period.append(group);
    }
    group.append(option);
  }
  ui["total-events"].textContent = COUNT.format(entries.length);
  ui["total-weeks"].textContent = COUNT.format(Object.keys(data.weeks).length);
  ui["total-checked"].textContent = COUNT.format(stats(entries)[0]);
  ui.period.addEventListener("change", () => selectPeriod(ui.period.value));
  ui["period-prev"].addEventListener("click", () => selectPeriod(periods[periods.indexOf(state.period) - 1]));
  ui["period-next"].addEventListener("click", () => selectPeriod(periods[periods.indexOf(state.period) + 1]));
  ui["month-view"].addEventListener("click", () => selectPeriod(state.period));
  ui.date.addEventListener("change", () => {
    if (ui.date.value && ui.date.validity.valid) selectDay(ui.date.value);
  });
  ui.status.addEventListener("change", () => {
    state.evidence = ui.status.value;
    state.limit = PAGE_SIZE;
    render();
  });
  ui.query.addEventListener("input", runSearch);
  ui.query.addEventListener("focus", runSearch);
  ui.query.addEventListener("keydown", event => {
    if (event.key === "Enter") ui.results.querySelector("button")?.click();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !ui.results.hidden) {
      ui.query.focus();
      ui.results.hidden = true;
    }
  });
  document.addEventListener("pointerdown", event => {
    if (!ui.results.contains(event.target) && event.target !== ui.query) ui.results.hidden = true;
  });
  ui.prev.addEventListener("click", () => {
    const previous = shift(monday(state.day), -7);
    const startingWeek = monday(firstDay);
    selectDay(previous === startingWeek ? firstDay : previous);
  });
  ui.next.addEventListener("click", () => selectDay(shift(monday(state.day), 7)));
  ui.more.addEventListener("click", () => {
    state.limit += PAGE_SIZE;
    render();
  });
  window.addEventListener("hashchange", setFromHash);
  ui.loading.hidden = true;
  ui.interactive.hidden = false;
  setFromHash();
}

fetch("data.json")
  .then(response => {
    if (!response.ok) throw new Error("Timeline data: " + response.status);
    return response.json();
  })
  .then(setup)
  .catch(() => {
    ui.interactive.hidden = true;
    ui.loading.hidden = false;
    ui.loading.replaceChildren(document.createTextNode("연표 데이터를 불러올 수 없습니다. "), link("월별 연표 열기", "../chronology/"));
  });
