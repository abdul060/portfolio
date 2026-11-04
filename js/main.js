function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

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

function createEntry({title, organization, period, description}){
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
  list.replaceChildren(...items.map(createEntry));
}

async function loadCv() {
  const response = await fetch("data/cv.json");
  const data = await response.json();
  renderList("work-list", data.work);
  renderList("education-list", data.education);
}

loadCv();