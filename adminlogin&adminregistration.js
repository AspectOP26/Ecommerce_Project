document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Replace 'your-api-endpoint' with the actual URL where your server is running
            fetch('your-api-endpoint/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                // Successful login
                // Redirect to the user interface page
                window.location.href = 'adminDashboard.html';
            })
            .catch(error => {
                console.error('Login error:', error);
                // Handle login error, show a message to the user, etc.
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Replace 'your-api-endpoint' with the actual URL where your server is running
            fetch('your-api-endpoint/admin-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            })
            .then(response => response.json())
            .then(data => {
                // Successful registration
                // Redirect to the user interface page
                window.location.href = 'adminDashboard.html';
            })
            .catch(error => {
                console.error('Registration error:', error);
                // Handle registration error, show a message to the user, etc.
            });
        });
    }
});
