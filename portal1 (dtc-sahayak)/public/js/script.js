document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.back-button').addEventListener('click', function() {
        window.history.back();
    });
});



// forget password alert for login page 


function forgotPasswordAlert() {
    alert("If you have forgotten your password, please contact your respective Depot Manager for assistance.");
}
