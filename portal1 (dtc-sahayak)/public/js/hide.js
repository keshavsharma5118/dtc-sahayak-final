 // Toggle Password Visibility
 const passwordInput = document.getElementById('password');
 const togglePassword = document.querySelector('.show-password');

 togglePassword.addEventListener('click', function () {
     const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
     passwordInput.setAttribute('type', type);
     this.textContent = type === 'password' ? 'visibility' : 'visibility_off';
 });

 // Handle Form Submission
 document.getElementById('login-form').addEventListener('submit', function (e) {
     e.preventDefault();
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;

     // You can add more validation here if necessary

     // Simulate form submission
     alert(`Username: ${username}\nPassword: ${password}`);

     // Redirect to dashboard or another page
     // window.location.href = '/dashboard';
 });