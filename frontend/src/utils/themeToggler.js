document.addEventListener('DOMContentLoaded', function () {
    const rootElement = document.documentElement;
    const anonThemeToggle = document.getElementById('theme-toggler-anonymous');
    const authThemeToggle = document.getElementById('theme-toggler-authenticated');
    if (authThemeToggle) {
        localStorage.removeItem('data-bs-theme');
    }
    const anonSavedTheme = localStorage.getItem('data-bs-theme');
    if (anonSavedTheme) {
        rootElement.setAttribute('data-bs-theme', anonSavedTheme);
    }
    if (anonThemeToggle) {
        anonThemeToggle.addEventListener('click', function () {
            const currentTheme = rootElement.getAttribute('data-bs-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            rootElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('data-bs-theme', newTheme);
        });
    }
    if (authThemeToggle) {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        authThemeToggle.addEventListener('click', function () {
            const currentTheme = rootElement.getAttribute('data-bs-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            fetch('/user/update_theme_preference/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                },
                body: JSON.stringify({ theme: newTheme }),
            })
            .then(response => response.json())
            .then(data => {
                rootElement.setAttribute('data-bs-theme', newTheme);
            })
            .catch(error => {
                console.error('Error updating theme preference:', error);
            });
        });
    }
});
