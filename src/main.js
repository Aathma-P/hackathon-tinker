// Sample data (replace this with data from your backend)
const categories = [
    { id: 1, name: "Fresh Vegetables", type: "product" },
    { id: 2, name: "Fruits", type: "product" },
    { id: 3, name: "Dairy Products", type: "product" },
    { id: 4, name: "Tractors", type: "tool" },
    { id: 5, name: "Plows", type: "tool" },
    { id: 6, name: "Organic Waste", type: "waste" },
    { id: 7, name: "Crop Residue", type: "waste" },
  ];
  
  // Function to render categories
  function renderCategories(filteredCategories) {
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = ""; // Clear existing content
  
    filteredCategories.forEach((category) => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow";
      card.innerHTML = `
        <h3 class="text-xl font-semibold">${category.name}</h3>
        <p class="text-gray-600">${category.type}</p>
      `;
      grid.appendChild(card);
    });
  }
  
  // Initial render
  renderCategories(categories);
  
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm)
    );
    renderCategories(filteredCategories);
  });