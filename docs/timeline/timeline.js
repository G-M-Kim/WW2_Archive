"use strict";

const ui = Object.fromEntries(Array.from(document.querySelectorAll("[id]"), node => [node.id, node]));
const COUNT = new Intl.NumberFormat("ko-KR");
const LABELS = ["문헌대조", "링크등록", "미등록"];
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const REPO = "https://github.com/G-M-Kim/WW2_Archive/blob/";
const PAGE_SIZE = 16;
const DAY = 86400000;
const state = { day: "", activeDay: "", evidence: "", limit: PAGE_SIZE };
let data;
let years;
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
  return REPO + data.revision + "/" + encodeURIComponent(path) + "#L" + line;
}

function selectDay(day, eventId) {
  state.day = day;
  state.activeDay = eventId && day.length === 10 ? day : "";
  state.limit = PAGE_SIZE;
  state.selected = eventId;
  const hash = eventId || day;
  if (location.hash.slice(1) !== hash) history.replaceState(null, "", "#" + hash);
  render();
}

function setFromHash() {
  const anchor = location.hash.slice(1);
  if (Object.hasOwn(data.events, anchor)) {
    const date = data.events[anchor][0];
    if (date.length === 10) selectDay(date, anchor);
    else revealEvent(anchor);
    return;
  }
  const allowed = /^\d{4}-\d{2}-\d{2}$/.test(anchor) && anchor >= ui.date.min && anchor <= ui.date.max;
  selectDay(allowed && Number.isFinite(dateAt(anchor).getTime()) ? formatDate(dateAt(anchor)) : (years.includes(1939) ? "1939-09-01" : ui.date.min));
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
    const size = matched(data.weeks[key]).length;
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

function eventRow(id, approximate = false) {
  const [when, title, category, stateText, evidence, sources, file, line] = data.events[id];
  const details = node("details", undefined, "event s" + evidence);
  details.id = id;
  const summary = node("summary");
  const stamp = node("time", approximate ? when : formatShort(when));
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
  body.append(link("GitHub 연표 원고에서 보기 ↗", canonical(file, line), true));
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
  function drawChart() {
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
  const count = filtered.length;
  ui["event-summary"].textContent = count
    ? (state.activeDay ? state.activeDay + " · " : "") + "사건 " + COUNT.format(count) + "건"
    : "선택한 기간과 조건에 등록된 사건이 없습니다.";
  const pieces = filtered.slice(0, state.limit).map(id => eventRow(id));
  if (state.selected && filtered.includes(state.selected) && !pieces.some(item => item.id === state.selected)) {
    pieces.push(eventRow(state.selected));
  }
  ui.events.replaceChildren(...pieces);
  ui.more.hidden = state.limit >= count;
  ui.more.textContent = "사건 " + Math.min(PAGE_SIZE, count - state.limit) + "개 더 보기";
}

function render() {
  const first = monday(state.day);
  const year = state.day.slice(0, 4);
  ui.year.value = year;
  ui.date.value = state.day;
  showYear(year, first);
  ui["week-heading"].textContent = weekLabel(first);
  const raw = data.weeks[first] || [];
  const ids = matched(raw);
  const daily = Array(7).fill(0);
  for (const id of ids) daily[(dateAt(data.events[id][0]).getUTCDay() + 6) % 7]++;
  const count = ids.length;
  const suffix = ids.length !== raw.length ? " · 필터 적용 전 " + COUNT.format(raw.length) + "건" : "";
  ui["week-stats"].textContent = count ? COUNT.format(count) + "건 · 기록이 있는 날짜 " + daily.filter(Boolean).length + "/7일" + suffix : "등록된 사건 0건" + suffix;
  ui.prev.disabled = shift(first, -1) < ui.date.min;
  ui.next.disabled = shift(first, 7) > ui.date.max;
  drawVisual(first, ids, daily);
  drawEvidence(ids);
  drawEvents(first, ids, daily);
  const approximate = matched(data.approximate[year]);
  ui.approximate.hidden = !approximate.length;
  ui.approximate.open = false;
  ui["approximate-title"].textContent = "월·연도까지만 확인된 기록 " + COUNT.format(approximate.length) + "건";
  ui["approximate-events"].replaceChildren(...approximate.map(id => eventRow(id, true)));
}

function revealEvent(id) {
  const event = data.events[id];
  if (state.evidence !== "" && state.evidence !== String(event[4])) {
    state.evidence = "";
    ui.status.value = "";
  }
  selectDay((event[0] + "-01-01").slice(0, 10), id);
  const row = document.getElementById(id);
  if (!row) return;
  if (event[0].length < 10) ui.approximate.open = true;
  row.open = true;
  const heading = row.querySelector("summary");
  heading.focus({preventScroll:true});
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
  const firstYear = Number(data.events[entries[0]][0].slice(0, 4));
  const lastYear = Number(data.events[entries.at(-1)][0].slice(0, 4));
  years = Array.from({length:lastYear-firstYear+1}, (_, i) => firstYear+i);
  ui.date.min = firstYear + "-01-01";
  ui.date.max = lastYear + "-12-31";
  for (const year of years) ui.year.append(new Option(year + "년", year));
  ui["total-events"].textContent = COUNT.format(entries.length);
  ui["total-weeks"].textContent = COUNT.format(Object.keys(data.weeks).length);
  ui["total-checked"].textContent = COUNT.format(stats(entries)[0]);
  ui.year.addEventListener("change", () => {
    const year = ui.year.value;
    const populated = Object.keys(data.weeks).find(key => key.startsWith(year));
    selectDay(populated || year + "-01-01");
  });
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
  ui.prev.addEventListener("click", () => selectDay([shift(monday(state.day), -7), ui.date.min].sort().at(-1)));
  ui.next.addEventListener("click", () => selectDay(shift(monday(state.day), 7)));
  ui.more.addEventListener("click", () => {
    state.limit += PAGE_SIZE;
    const first = monday(state.day);
    const ids = matched(data.weeks[first]);
    drawEvents(first, ids, DAYS.map((_, i) => ids.filter(id => data.events[id][0] === shift(first, i)).length));
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
    ui.loading.replaceChildren(document.createTextNode("연표 데이터를 불러올 수 없습니다. "), link("시기별 연표 원고 열기", "../articles/"));
  });
