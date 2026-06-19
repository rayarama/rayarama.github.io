document.addEventListener('DOMContentLoaded', () => {
    // Dark/Light Theme Switcher
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('light-theme')) {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggleBtn.style.backgroundColor = '#f59e0b'; // Amber theme color
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggleBtn.style.backgroundColor = 'var(--accent)';
        }
    });
});
