  // JavaScript for validation and registration logic
  document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Fetch form input values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validation: Ensure Full Name is entered
    if (!fullName) {
        alert('Full name is required!');
        return;
    }

    // Validation: Ensure passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if the user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('User already exists!');
        return;
    }

    // Save new user
    users.push({ fullName, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Success message and redirection
    alert('Registration successful! Redirecting to login...');
    window.location.href = 'login.html';
});