document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".loginbtn");
    const emailInput = document.querySelector(".enter-email");
    const passwordInput = document.querySelector(".enter-password");
    const errorElement = document.querySelector(".error");
  
    loginButton.addEventListener("click", async () => {
      const email = emailInput.value;
      const password = passwordInput.value;
  
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Login successful, redirect to home.html
          window.location.href = "home.html";
        } else {
          // Display error message
          errorElement.textContent = data.message || "Login failed. Please try again.";
        }
      } catch (error) {
        // Handle network or other errors
        errorElement.textContent = "An error occurred. Please try again later.";
        console.error("Login error:", error);
      }
    });
  });
  