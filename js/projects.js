const projectList = document.querySelector("#project-list");
const projectStatus = document.querySelector("#project-status");
const showMoreButton = document.querySelector("#show-more-btn");
const filterButtons = document.querySelectorAll(".project-filters button");

let allProjects = [];
let showAll = false;
let activeFilter = "all";



const projectImages = [
    "images/card-img-1.png",
    "images/projects-img-2.png",
    "images/projects-img-3.png",
    "images/projects-img-4.png",
    "images/projects-img-5.png",
    "images/projects-img-6.png"
];

function createProjectCard(repo, index) {
    const card = document.createElement("li");
    card.className = "card-container";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    const image = document.createElement("img");
    image.src = projectImages[index % projectImages.length];
    image.alt = "";

    cardHeader.append(image);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body-holder";

    const title = document.createElement("h2");
    title.className = "card-body-h3";
    title.textContent = repo.name;

    const description = document.createElement("p");
    description.className = "card-body-p-1";
    description.textContent = repo.description || "No description available.";

    const techStack = document.createElement("p");
    techStack.className = "card-body-p-2";
    techStack.textContent = `Tech Stack: ${repo.language || "Not specified"}`;

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const links = document.createElement("ul");

    if (repo.homepage) {
        const previewItem = document.createElement("li");
        const previewLink = document.createElement("a");

        previewLink.href = repo.homepage;
        previewLink.textContent = "Live Preview";
        previewLink.className = "card-footer-a";
        previewLink.target = "_blank";
        previewLink.rel = "noopener noreferrer";

        previewItem.append(previewLink);
        links.append(previewItem);
    }

    const codeItem = document.createElement("li");
    const codeLink = document.createElement("a");

    codeLink.href = repo.html_url;
    codeLink.textContent = "View Code";
    codeLink.className = "card-footer-a";
    codeLink.target = "_blank";
    codeLink.rel = "noopener noreferrer";

    codeItem.append(codeLink);
    links.append(codeItem);
    footer.append(links);

    cardBody.append(title, description, techStack, footer);
    card.append(cardHeader, cardBody);

    return card;
}
function renderProjects() {
    projectList.replaceChildren();

    const filteredProjects = allProjects.filter((repo) => {
        if (activeFilter === "all") {
            return true;
        }

        const language = (repo.language || "").toLowerCase();

        if (activeFilter === "javascript") {
            return language === "javascript";
        }

        if (activeFilter === "html") {
            return language === "html" || language === "css";
        }

        return false;
    });

    const visibleProjects = showAll
        ? filteredProjects
        : filteredProjects.slice(0, 6);

    visibleProjects.forEach((repo, index) => {
        const card = createProjectCard(repo, index);
        projectList.append(card);
    });

    showMoreButton.hidden = filteredProjects.length <= 6;
    showMoreButton.textContent = showAll ? "Show Less" : "Show More";

    projectStatus.textContent = filteredProjects.length === 0
        ? "No projects match this filter."
        : "";
}


async function loadProjects() {
    const url = "https://api.github.com/users/abdul060/repos?sort=updated&per_page=100";

    projectStatus.textContent = "Loading projects...";
    projectList.replaceChildren();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const repos = await response.json();

        const localResponse = await fetch("./data/projects.json");

        if (!localResponse.ok) {
             throw new Error(`HTTP error: ${localResponse.status}`);
        }

        const localProjects = await localResponse.json();


        allProjects = [...repos, ...localProjects];

        if (allProjects.length === 0) {
            projectStatus.textContent = "No projects available.";
            return;
        }

        renderProjects();


        projectStatus.textContent = "";

    } catch (error) {
        projectStatus.textContent = "Could not load projects.";
        console.error(error);
    }
}

showMoreButton.addEventListener("click", () => {
    showAll = !showAll;
    renderProjects();
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        showAll = false;

        filterButtons.forEach((filterButton) => {
            filterButton.setAttribute(
                "aria-pressed",
                String(filterButton === button)
            );
        });

        renderProjects();
    });
});

loadProjects();