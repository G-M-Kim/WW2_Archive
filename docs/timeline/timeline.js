"use strict";

const ui = Object.fromEntries(Array.from(document.querySelectorAll("[id]"), node => [node.id, node]));
const COUNT = new Intl.NumberFormat("ko-KR");
const LABELS = ["문헌대조", "링크등록", "미등록"];
const REPO = "https://github.com/G-M-Kim/WW2_Archive/blob/";
const periods = new Map();
const cards = new Map();
const tabs = new Map();
let data;
let lookup;
let firstMonth;
let sourceCounts;
let activePeriod;
let focusableMonth;
let visiblePeriods;
let navigationFrame;

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

function canonical(path, line) {
  const url = REPO + data.revision + "/" + path.split("/").map(encodeURIComponent).join("/");
  return line ? url + "#L" + line : url;
}

function periodLabel(period) {
  if (period === "prologue") return "프롤로그";
  if (period === "epilogue") return "에필로그";
  const [year, month] = period.split("-");
  return year + "년 " + Number(month) + "월";
}

function formatDate(value) {
  const [year, month, day] = value.split("-");
  return [year + "년", month && Number(month) + "월", day && Number(day) + "일"].filter(Boolean).join(" ");
}

function eventPhoto(id) {
  const direct = data.media[id];
  const photo = direct || data.context?.[data.eventContext?.[id]];
  if (!photo) return null;
  const figure = node("figure", undefined, "event-photo");
  const frame = node("div", undefined, "photo-frame");
  const image = node("img");
  image.alt = photo.caption;
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => {
    frame.replaceChildren(link("소장처에서 이미지 보기 ↗", photo.source, true));
  }, {once: true});

  const caption = node("figcaption");
  caption.append(
    node("span", direct ? photo.kind : photo.kind === "기록 사진" ? "배경 사진" : "배경 자료", "photo-kind"),
    node("span", photo.caption, "photo-caption"),
    node("span", photo.credit + " · "),
    link(photo.license, photo.licenseUrl, true),
    document.createTextNode(" · "),
    link("소장 정보 ↗", photo.source, true),
  );
  frame.append(image);
  figure.append(frame, caption);
  image.src = photo.file;
  return figure;
}

function eventSources(sources, headingTag) {
  const section = node("div", undefined, "sources");
  section.append(node(headingTag, "사건 출처"));
  if (!sources.length) {
    section.append(node("p", "현재 원고에 연결된 출처가 없습니다."));
    return section;
  }
  const list = node("ul");
  for (const key of sources) {
    const [name, kind, locator, urls, line] = data.sources[key];
    const item = node("li");
    item.append(link(name || key, urls[0] || canonical(data.sourceFile, line), true));
    const note = [key, kind, locator].filter(Boolean).join(" · ");
    item.append(node("span", note, "source-note"));
    list.append(item);
  }
  section.append(list);
  return section;
}

function eventCard(id, isMonth) {
  const [when, title, category, recordState, evidence, sources, file, line, detail] = data.events[id];
  const article = node("article", undefined, "event s" + evidence);
  article.id = id;
  article.tabIndex = -1;

  const header = node("header", undefined, "event-header");
  const date = node("time", formatDate(when));
  date.dateTime = when;
  const heading = node(isMonth ? "h4" : "h3", title, "event-title");
  const meta = node("p", undefined, "event-meta");
  meta.append(link(id, "#" + id), node("span", category), node("span", recordState));
  meta.append(node("span", LABELS[evidence], "badge"));
  header.append(date, heading, meta);

  const photo = eventPhoto(id);
  const body = node("div", undefined, photo ? "event-body has-photo" : "event-body");
  const records = node("div", undefined, "event-records");
  if (!photo) records.append(node("p", "공개 이용 조건을 확인한 관련 사진이 아직 없습니다.", "missing-photo"));
  records.append(eventSources(sources, isMonth ? "h5" : "h4"));
  const links = node("p", undefined, "record-links");
  const period = file.split("/").at(-1).replace(/\.md$/, "");
  links.append(
    link(isMonth ? "위키 월별 연표" : "위키 " + periodLabel(period), "../chronology/" + encodeURIComponent(period) + "/"),
    link("연표 원고 ↗", canonical(file, line), true),
  );
  if (detail) {
    links.append(link("사건 상세·사료 해설 ↗", canonical(detail[0]) + detail[1], true));
  }
  records.append(links);
  if (photo) body.append(photo);
  body.append(records);
  article.append(header, body);
  cards.set(id, article);
  return article;
}

function makeSection(key, label, subtitle, headingTag = "h2") {
  const section = node("section");
  section.id = key;
  const heading = node("header", undefined, "section-heading");
  const text = node(headingTag, label);
  text.id = key + "-title";
  section.setAttribute("aria-labelledby", text.id);
  section.tabIndex = -1;
  heading.append(text);
  if (subtitle) heading.append(node("p", subtitle));
  section.append(heading);
  return section;
}

function drawTimeline() {
  const fragment = document.createDocumentFragment();
  const mainPeriods = makeSection("main-period", "본편", "1936–1945");
  mainPeriods.className = "chapter";
  let yearSection;
  let year;
  for (const [key, ids] of Object.entries(data.periods)) {
    const isMonth = /^\d{4}-\d{2}$/.test(key);
    if (isMonth && year !== key.slice(0, 4)) {
      year = key.slice(0, 4);
      yearSection = node("div", undefined, "year");
      mainPeriods.append(yearSection);
    }
    const subtitle = key === "prologue" ? "1936년 이전" : key === "epilogue" ? "1945년 이후" : "";
    const section = makeSection(key, periodLabel(key), subtitle, isMonth ? "h3" : "h2");
    section.className = isMonth ? "month" : "chapter";
    const list = node("div", undefined, "events");
    for (const id of ids) list.append(eventCard(id, isMonth));
    const empty = node("p", "이 기간에 조건에 맞는 사건이 없습니다.", "empty-period");
    empty.hidden = ids.length > 0;
    section.append(list, empty);
    periods.set(key, {section, ids, empty});
    if (isMonth) {
      yearSection.append(section);
    } else {
      fragment.append(section);
      if (key === "prologue") fragment.append(mainPeriods);
    }
  }
  ui.timeline.append(fragment);
}

function drawEvidence() {
  ui["evidence-list"].replaceChildren(...sourceCounts.map((count, i) => {
    const item = node("li", undefined, "s" + i);
    item.append(node("span", LABELS[i]), node("strong", COUNT.format(count)));
    return item;
  }));

}

function applyFilter() {
  const selected = ui.status.value;
  for (const {section, ids, empty} of periods.values()) {
    let shown = 0;
    for (const id of ids) {
      const visible = selected === "" || Number(selected) === data.events[id][4];
      cards.get(id).hidden = !visible;
      if (visible) shown++;
    }
    section.hidden = selected !== "" && shown === 0;
    empty.hidden = shown > 0;
  }
  const visible = selected === "" ? lookup.length : sourceCounts[Number(selected)];
  ui.feedback.hidden = visible > 0;
  ui.feedback.textContent = visible ? "" : "선택한 출처 상태의 사건이 없습니다.";
  document.getElementById("main-period").hidden = !visible;
  visiblePeriods = [...periods.values()].filter(({section}) => !section.hidden).map(({section}) => section);
  scheduleTabUpdate();
}

function keepMonthVisible(tab) {
  if (!ui["month-tabs"].contains(tab)) return;
  const strip = ui["month-tabs"];
  const band = strip.getBoundingClientRect();
  const item = tab.getBoundingClientRect();
  if (item.left < band.left) strip.scrollLeft -= band.left - item.left;
  else if (item.right > band.right) strip.scrollLeft += item.right - band.right;

  if (focusableMonth) focusableMonth.tabIndex = -1;
  focusableMonth = tab;
  tab.tabIndex = 0;
}

function showActiveTab(period) {
  if (period === activePeriod) return;
  tabs.get(activePeriod)?.removeAttribute("aria-current");
  const tab = tabs.get(period);
  tab?.setAttribute("aria-current", "location");
  if (tab) keepMonthVisible(tab);
  ui.period.value = period || "";
  activePeriod = period;
}

function scheduleTabUpdate() {
  if (navigationFrame) return;
  navigationFrame = requestAnimationFrame(() => {
    navigationFrame = undefined;
    const boundary = ui.navigation.getBoundingClientRect().height + 55;
    let left = 0;
    let right = visiblePeriods.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (visiblePeriods[mid].getBoundingClientRect().top <= boundary) left = mid + 1;
      else right = mid;
    }
    showActiveTab(visiblePeriods[Math.max(left - 1, 0)]?.id);
  });
}

function setupTabs() {
  const strip = ui["month-tabs"];
  for (const key of periods.keys()) {
    let tab = ui["period-tabs"].querySelector('a[href="#' + key + '"]');
    if (!tab) {
      tab = link(periodLabel(key), "#" + key);
      tab.className = "period-tab";
      tab.tabIndex = -1;
      strip.append(tab);
    }
    tabs.set(key, tab);
    tab.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      goTo(key, key);
    });
  }
  keepMonthVisible(strip.firstElementChild);
  const updateArrows = () => {
    ui["earlier-tabs"].disabled = strip.scrollLeft < 2;
    ui["later-tabs"].disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
  };
  ui["earlier-tabs"].addEventListener("click", () => strip.scrollLeft -= strip.clientWidth);
  ui["later-tabs"].addEventListener("click", () => strip.scrollLeft += strip.clientWidth);
  strip.addEventListener("scroll", updateArrows, {passive: true});
  strip.addEventListener("keydown", event => {
    const tab = event.target;
    const targets = {
      ArrowLeft: tab.previousElementSibling, ArrowRight: tab.nextElementSibling,
      Home: strip.firstElementChild, End: strip.lastElementChild,
    };
    const next = targets[event.key];
    if (!next) return;
    event.preventDefault();
    keepMonthVisible(next);
    next.focus();
  });
  new ResizeObserver(() => {
    document.documentElement.style.setProperty("--nav-height", ui.navigation.offsetHeight + "px");
    updateArrows();
    scheduleTabUpdate();
  }).observe(ui.navigation);
  window.addEventListener("scroll", scheduleTabUpdate, {passive: true});
}

function goTo(target, hash, replace = false) {
  const element = document.getElementById(target);
  if (!element) return;
  const filteredOut = element.hidden || (target === "main-period" && !element.querySelector(".month:not([hidden])"));
  if (filteredOut) {
    ui.status.value = "";
    applyFilter();
  }
  if (hash && location.hash !== "#" + hash) {
    if (replace) history.replaceState(null, "", "#" + hash);
    else history.pushState(null, "", "#" + hash);
  }
  element.focus({preventScroll: true});
  element.scrollIntoView({block: "start"});
  scheduleTabUpdate();
}

function goToDate(when, replace = false) {
  const period = periods.has(when.slice(0, 7)) ? when.slice(0, 7) :
    when < firstMonth ? "prologue" : "epilogue";
  const events = periods.get(period).ids;
  const target = events.find(id => data.events[id][0] >= when) || events.at(-1) || period;
  goTo(target, when, replace);
}

function openHash() {
  const anchor = location.hash.slice(1);
  if (cards.has(anchor) || periods.has(anchor) || anchor === "main-period") {
    goTo(anchor);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(anchor) && Number.isFinite(Date.parse(anchor))) {
    ui.date.value = anchor;
    goToDate(anchor, true);
  }
}

function runSearch() {
  const terms = ui.query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    ui.results.hidden = true;
    return;
  }
  const matches = lookup.filter(({text}) => terms.every(term => text.includes(term)));
  const list = node("ul");
  for (const {id} of matches.slice(0, 20)) {
    const [when, title] = data.events[id];
    const item = node("li");
    const anchor = link(title, "#" + id);
    const stamp = node("time", when);
    stamp.dateTime = when;
    anchor.prepend(stamp);
    anchor.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      ui.results.hidden = true;
      goTo(id, id);
    });
    item.append(anchor);
    list.append(item);
  }
  const summary = COUNT.format(matches.length) + "건" + (matches.length > 20 ? " · 처음 20건 표시" : "");
  const status = node("p", summary);
  status.setAttribute("role", "status");
  ui.results.replaceChildren(status, list);
  ui.results.hidden = false;
}

function setup(index) {
  data = index;
  const ids = Object.values(data.periods).flat();
  firstMonth = Object.keys(data.periods)[1];
  lookup = ids.map(id => ({id, text: [id, ...data.events[id].slice(0, 4)].join(" ").toLowerCase()}));
  ui["date-range"].textContent = data.events[ids[0]][0].slice(0, 4) + "–" + data.events[ids.at(-1)][0].slice(0, 4);
  sourceCounts = [0, 0, 0];
  for (const id of ids) sourceCounts[data.events[id][4]]++;
  drawTimeline();
  drawEvidence();
  setupTabs();
  for (const key of periods.keys()) {
    ui.period.add(new Option(periodLabel(key), key));
  }
  applyFilter();

  ui.period.addEventListener("change", () => {
    if (ui.period.value) goTo(ui.period.value, ui.period.value);
  });
  ui.date.addEventListener("change", () => {
    if (ui.date.value && ui.date.validity.valid) goToDate(ui.date.value);
  });
  ui.status.addEventListener("change", applyFilter);
  ui.query.addEventListener("input", runSearch);
  document.addEventListener("click", event => {
    if (!event.target.closest(".controls")) ui.results.hidden = true;
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !ui.results.hidden) {
      ui.results.hidden = true;
      ui.query.focus();
    }
  });
  window.addEventListener("hashchange", openHash);
  ui.interactive.hidden = false;
  ui.loading.hidden = true;
  document.documentElement.style.setProperty("--nav-height", ui.navigation.offsetHeight + "px");
  openHash();
}

ui.loading.textContent = "연표를 불러오는 중입니다.";
fetch("data.json")
  .then(response => {
    if (!response.ok) throw new Error("Timeline data: " + response.status);
    return response.json();
  })
  .then(setup)
  .catch(error => {
    console.error(error);
    ui.loading.replaceChildren(
      document.createTextNode("연표를 불러오지 못했습니다. "),
      link("월별 연표 열기", "../chronology/"),
    );
  });
