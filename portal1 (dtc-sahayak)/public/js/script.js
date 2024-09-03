document.addEventListener('DOMContentLoaded', function() {
    // Ensure login form submission is captured
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (loginForm && emailInput && passwordInput) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form submission

            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                console.log("Attempting to log in with:", email, password);  // Log credentials for debugging

                const response = await fetch("/api/v1/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"  // Corrected Content-Type
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: "include"  // Include cookies in the request
                });

                console.log("Response status:", response.status);
                console.log("Response headers:", [...response.headers.entries()]);

                if (response.ok) {
                    const data = await response.json();
                   
                  
                    // Redirect to dashboard or another page
                    window.location.href = "/api/v1/users/man/dashboard";
                    
                } else {
                    const errorData = await response.json();
                    console.error("Error data:", errorData);
                    alert(errorData.message || 'Login failed');
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("The given password or email id is incorrect.");
            }
        });
    } 
});
