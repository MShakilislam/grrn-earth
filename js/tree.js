// Fetch and display categories
const lessonBtn = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => {
            const categories = json.categories;  // correct key
            if (!Array.isArray(categories)) return; // safeguard
            lessonDisplay(categories);
        });
};

// Display category buttons
const lessonDisplay = (categories) => {
    const container = document.getElementById("left-catagory-btn");
    container.innerHTML = ""; // clear previous buttons

    categories.forEach(category => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick="loadLavaleBtn('${category.category_name}')" 
                class="hover:bg-green-600 hover:text-white w-full py-2 px-3 cursor-pointer rounded-sm text-left">
                ${category.category_name}
            </button>
        `;
        container.appendChild(btnDiv);
    });
};

// Handle category button click
const loadLavaleBtn = (categoryName) => {
    console.log("Clicked category:", categoryName);
};

// Initialize
lessonBtn();
