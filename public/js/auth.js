$(document).ready(function() {
    function buildLoginForm() {
        $('#auth-container').html(`
            <div class="logo">
                <img src="/media/icons/logo_word.svg" alt="bla" />
                <div class="text-big">Welcome Back</div>
            </div>
            <form>
                <div class="input-fields">
                    <div class="input-field-container">
                        <label>Email</label>
                        <input type="text" name="email" class="enter-email" placeholder="Email"/>
                    </div>
                    <div class="input-field-container password-container">
                        <label>Password</label>
                        <input type="password" name="password" class="enter-password" placeholder="Password"/>
                        <img class="eye-icon" id="togglePassword" alt="Show Password" src="media/images/eye@2x.png"/>
                    </div>
                </div>
                <div class="extra-options">
                    <a href="#" id="sign-up-btn">Don't have an account yet?</a>
                    <a href="#" id="change-pword-btn">Forgot Password?</a>
                </div>
                <button type="button" class="auth-button loginbtn">Login</button>
                <div class="error"></div>
            </form>
        `);
        addTogglePasswordVisibility();
        addLoginFunctionality();

        $('#sign-up-btn').on('click', function(event) {
            event.preventDefault();
            buildSignupForm();
            changeBackgroundImage('sign_up_bg.png');
        });
    }

    function buildSignupForm() {
        $('#auth-container').html(`
            <div class="logo">
                <img height="50px" src="/media/icons/logo_word.svg" alt="bla" />
                <div class="text-big">Create A New Account</div>
            </div>
            <form>
                <div class="input-fields">
                    <div class="input-field-container">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username"/>
                    </div>
                    <div class="input-field-container">
                        <label>Email</label>
                        <input type="text" name="email" class="enter-email" placeholder="Email"/>
                    </div>
                    <div class="input-field-container password-container">
                        <label>Password</label>
                        <input type="password" name="password" class="enter-password" placeholder="Password"/>
                        <img class="eye-icon" id="toggleSignupPassword" alt="Show Password" src="media/images/eye@2x.png"/>
                    </div>
                    <div class="input-field-container password-container">
                        <label>Confirm Password</label>
                        <input type="password" name="confirm-password" class="enter-password" placeholder="Confirm Password"/>
                        <img class="eye-icon" id="toggleSignupPassword" alt="Show Password" src="media/images/eye@2x.png"/>
                    </div>
                </div>
                <div class="extra-options">
                    <a href="#" id="login-btn">Already have an account?</a>
                </div>
                <button type="button" class="auth-button loginbtn">Sign Up</button>
                <div class="error"></div>
            </form>
        `);
        addTogglePasswordVisibility();
        addSignupFunctionality();

        $('#login-btn').on('click', function(event) {
            event.preventDefault();
            buildLoginForm();
            changeBackgroundImage('frame-1@3x.png');
        });
    }

    function addTogglePasswordVisibility() {
        $('#togglePassword').on('click', function() {
            const passwordInput = $(this).siblings('input');
            const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
            passwordInput.attr('type', type);
            $(this).attr('src', type === 'password' ? 'media/images/eye@2x.png' : 'media/images/eye_hide@2x.png');
        });

        $('#toggleSignupPassword').on('click', function() {
            const passwordInput = $(this).siblings('input');
            const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
            passwordInput.attr('type', type);
            $(this).attr('src', type === 'password' ? 'media/images/eye@2x.png' : 'media/images/eye_hide@2x.png');
        });
    }

    function changeBackgroundImage(imageName) {
        $('#side-image img').attr('src', `../media/images/${imageName}`);
    }

    function addLoginFunctionality() {
        $('.loginbtn').on('click', async function() {
            const email = $('.enter-email').val();
            const password = $('.enter-password').val();
            const errorElement = $('.error');

            try {
                // Proper code for actual login
                // const response = await fetch("http://localhost:8080/login", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({ email, password }),
                // });

                // For testing purposes
                const response = {
                    ok: true,
                    json: async () => ({ message: "Login successful" }),
                };

                const data = await response.json();

                if (response.ok) {
                    // Login successful, redirect to home.html
                    window.location.href = "index.html";
                } else {
                    // Display error message
                    errorElement.text(data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                // Handle network or other errors
                errorElement.text("An error occurred. Please try again later.");
                console.error("Login error:", error);
            }
        });
    }

    function addSignupFunctionality() {
        $('.loginbtn').on('click', async function() {
            const email = $('.enter-email').val();
            const password = $('.enter-password').val();
            const errorElement = $('.error');

            try {
                // Proper code for actual signup
                // const response = await fetch("http://localhost:8080/signup", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({ email, password }),
                // });

                // For testing purposes
                const response = {
                    ok: true,
                    json: async () => ({ message: "Signup successful" }),
                };

                const data = await response.json();

                if (response.ok) {
                    // Signup successful, redirect to home.html
                    window.location.href = "index.html";
                } else {
                    // Display error message
                    errorElement.text(data.message || "Signup failed. Please try again.");
                }
            } catch (error) {
                // Handle network or other errors
                errorElement.text("An error occurred. Please try again later.");
                console.error("Signup error:", error);
            }
        });
    }

    // Determine whether to show login or signup form
    const isLogin = true; // Change this based on your logic
    if (isLogin) {
        buildLoginForm();
    } else {
        buildSignupForm();
    }
});