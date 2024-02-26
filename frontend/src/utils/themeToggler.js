document.addEventListener('DOMContentLoaded', function () {
    const rootElement = document.documentElement;

    // Theme toggle for anonymous users and authenticated users
    const anonThemeToggle = document.getElementById('theme-toggler-anonymous');
    const authThemeToggle = document.getElementById('theme-toggler-authenticated');

    if (authThemeToggle) {
        localStorage.removeItem('data-bs-theme');
    }

    // Get the theme preference from local storage
    const anonSavedTheme = localStorage.getItem('data-bs-theme');

    // Set the initial theme based on the saved preference or default to light for anonymous users
    if (anonSavedTheme) {
        rootElement.setAttribute('data-bs-theme', anonSavedTheme);
    }

    // Toggle the theme and save the preference on label click for anonymous users
    if (anonThemeToggle) {
        anonThemeToggle.addEventListener('click', function () {
            const currentTheme = rootElement.getAttribute('data-bs-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            rootElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('data-bs-theme', newTheme);
        });
    }

    // Check if authThemeToggle exists before adding the event listener
    if (authThemeToggle) {
        // Get the CSRF token from the Django template
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // Toggle the theme and save the preference on label click for authenticated users
        authThemeToggle.addEventListener('click', function () {
            const currentTheme = rootElement.getAttribute('data-bs-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            // Update the theme on the server for authenticated users
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
                // Update the theme on the client side for authenticated users
                rootElement.setAttribute('data-bs-theme', newTheme);
            })
            .catch(error => {
                console.error('Error updating theme preference:', error);
            });
        });
    }
});
