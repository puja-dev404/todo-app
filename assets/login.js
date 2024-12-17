document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const users  = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Invalid email or password!');
        return;
    }

    // Save current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful! Redirecting to your To-Do list...');
    window.location.href = 'todo.html';
});
