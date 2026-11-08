import { createElement, setStatus, fetchJson } from "./utils.js";


function createMetaItem(iconSrc, text) {
  const item = createElement("span", "entry__meta-item");
  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = "";
  icon.width = 16;
  icon.height = 12;
  item.append(icon, text);
  return item;
}

function createEntry({ title, organization, period, description }) {
  const entry = createElement("li", "entry");

  const main = createElement("div", "entry__main");
  const meta = createElement("p", "entry__meta");
  meta.append(createMetaItem("images/office-building.svg", organization));
  main.append(
    createElement("h3", "entry__title", title),
    meta,
    createElement("p", "entry__description", description)
  );

  const side = createElement("div", "entry__side");
  const dates = createElement("p", "entry__meta entry__meta--end");
  dates.append(createMetaItem("images/calendar-dates.svg", period));
  side.append(dates);

  entry.append(main, side);
  return entry;
}

function renderList(listId, items) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.replaceChildren(...items.map(createEntry));
}



const CV_SECTIONS = [
  { key: "work", listId: "work-list", statusId: "work-status" },
  { key: "education", listId: "education-list", statusId: "education-status" },
];

async function loadCv() {
  CV_SECTIONS.forEach(({ statusId }) => setStatus(statusId, "Loading..."));

  try {
    const data = await fetchJson("data/cv.json");

    CV_SECTIONS.forEach(({ key, listId, statusId }) => {
      const items = data[key] ?? [];
      renderList(listId, items);
      setStatus(statusId, items.length === 0 ? "Nothing to show yet." : "");
    });
  } catch (error) {
    console.error(error);
    CV_SECTIONS.forEach(({ listId, statusId }) => {
      renderList(listId, []);
      setStatus(statusId, "Could not load the CV. Please try again later.", true);
    });
  }
}

loadCv();

