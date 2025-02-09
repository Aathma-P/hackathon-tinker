// Import Supabase
import { supabase } from "./supabase.js";

// ✅ SIGNUP FUNCTIONALITY (Store full name in Supabase Auth)
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const userType = document.getElementById("userType").value;
        const errorMessage = document.getElementById("errorMessage");

        if (!fullName || !email || !password || !userType) {
            errorMessage.textContent = "All fields are required.";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            return;
        }

        // ✅ Step 1: Sign up user & store full name in metadata
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { full_name: fullName, user_type: userType } // ✅ Store full name
            }
        });

        if (error) {
            errorMessage.textContent = "Signup failed: " + error.message;
            return;
        }

        if (data.user) {
            // ✅ Step 2: Insert user details into `users` table
            const { error: insertError } = await supabase
                .from("users")
                .insert([
                    {
                        id: data.user.id, // Use Supabase Auth user ID
                        full_name: fullName,
                        email: email,
                        user_type: userType,
                    },
                ]);

            if (insertError) {
                console.error("Error inserting user:", insertError.message);
                errorMessage.textContent = "Signup successful, but user data was not saved.";
                return;
            }
        }

        alert("Signup successful! Redirecting...");
        window.location.href = "homepage.html"; // Redirect after signup
    });
}

// ✅ LOGIN FUNCTIONALITY (Fetch Full Name from Auth)
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("errorMessage");

        if (!email || !password) {
            errorMessage.textContent = "Please enter both email and password.";
            return;
        }

        // ✅ Step 1: Sign in user in Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            errorMessage.textContent = "Login failed: " + error.message;
            return;
        }

        // ✅ Step 2: Fetch user metadata from Supabase Auth
        const user = data.user;
        if (!user) {
            errorMessage.textContent = "Authentication failed.";
            return;
        }

        const fullName = user.user_metadata?.full_name || "Unknown User";
        alert(`Welcome back, ${fullName}!`);
        
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "dashboard.html"; // Redirect after login
    });
}
