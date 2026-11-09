const themeToggle = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-theme");
}

function updateThemeButton() {
    const isDark = document.documentElement.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-theme");

    const isDark = document.documentElement.classList.contains("dark-theme");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeButton();
});