const projectList = document.querySelector("#project-list");
const projectStatus = document.querySelector("#project-status");

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

        if (repos.length === 0) {
            projectStatus.textContent = "No projects available.";
            return;
        }

        repos.forEach((repo, index) => {
            const card = createProjectCard(repo, index);
            projectList.append(card);
        });

        projectStatus.textContent = "";

    } catch (error) {
        projectStatus.textContent = "Could not load projects.";
        console.error(error);
    }
}

loadProjects();