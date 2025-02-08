const categories = [
    { name: "Fresh Vegetables", type: "Product", image: "img/vegetables.jpg" },
    { name: "Fruits", type: "Product", image: "img/fruits.jpg" },
    { name: "Tractors", type: "Tool", image: "img/tractors.jpg" },
    { name: "Organic Waste", type: "Waste", image: "img/waste.jpg" },
    { name: "Dairy Products", type: "Product", image: "img/dairy.jpg" },
    { name: "Irrigation Tools", type: "Tool", image: "img/irrigation.jpg" }
];

// Function to render categories
function renderCategories(filter = "") {
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = ""; // Clear previous content

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

// Search Functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
    renderCategories(e.target.value);
});

// Load categories on page load
document.addEventListener("DOMContentLoaded", () => renderCategories());
