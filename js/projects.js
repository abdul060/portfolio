async function loadProjects() {
    const url = "https://api.github.com/users/abdul060/repos?sort=updated&per_page=100";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const repos = await response.json();
        console.log(repos);

    } catch (error) {
        console.error(error);
    }
}

loadProjects();