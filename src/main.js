// Import Supabase
import { supabase } from "./supabase.js";

// ✅ CATEGORY FILTER FUNCTIONALITY
const categories = [
    { name: "Fresh Vegetables", type: "Product", image: "img/vegetables.jpg" },
    { name: "Fruits", type: "Product", image: "img/fruits.jpg" },
    { name: "Tractors", type: "Tool", image: "img/tractors.jpg" },
    { name: "Organic Waste", type: "Waste", image: "img/waste.jpg" },
    { name: "Dairy Products", type: "Product", image: "img/dairy.jpg" },
    { name: "Irrigation Tools", type: "Tool", image: "img/irrigation.jpg" }
];

// Render categories based on search filter
function renderCategories(filter = "") {
    const grid = document.getElementById("categoryGrid");
    if (!grid) return; // Prevent error if element is not on this page
    grid.innerHTML = "";

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredCategories.length === 0) {
        grid.innerHTML = `<p class="text-gray-600 text-center col-span-3">No categories found.</p>`;
        return;
    }

    filteredCategories.forEach(cat => {
        const categoryCard = document.createElement("div");
        categoryCard.className = "bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition";
        categoryCard.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" class="w-full h-40 object-cover rounded">
            <h3 class="text-xl font-semibold mt-2">${cat.name}</h3>
            <p class="text-gray-500">${cat.type}</p>
        `;
        grid.appendChild(categoryCard);
    });
}

// Search functionality
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        renderCategories(e.target.value);
    });
}

// Load categories on page load
document.addEventListener("DOMContentLoaded", () => renderCategories());


// ✅ SIGNUP FUNCTIONALITY (Fixed)
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form refresh

        const fullName = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const userType = document.getElementById("userType").value;
        const errorMessage = document.getElementById("errorMessage");

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            return;
        }

        // ✅ Sign up user with Supabase Authentication
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            errorMessage.textContent = "Signup failed: " + error.message;
        } else {
            // ✅ Ensure user object exists before inserting
            if (data.user) {
                await supabase.from("users").insert([
                    {
                        id: data.user.id, // Use the Supabase auth user ID
                        full_name: fullName,
                        email: email,
                        user_type: userType
                    }
                ]);
            }

            alert("Signup successful! Please check your email for verification.");
            window.location.href = "homepage.html"; // Redirect to login page
        }
    });
}

// ✅ LOGIN FUNCTIONALITY (No changes needed)
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert("Login failed: " + error.message);
        } else {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect after login
        }
    });
}
