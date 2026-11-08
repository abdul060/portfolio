async function loadProjects() { 
    const url = "https://api.github.com/users/abdul060/repos?sort=updated&per_page=100"; 
    const response = await fetch(url); 
    const repos = await response.json(); 
    console.log(repos); 
} 
loadProjects();

