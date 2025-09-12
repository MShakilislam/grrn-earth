let allPlants = [];
let cart = [];

// Load all plants
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      allPlants = data.plants;
      displayPlants(allPlants);
    });
};

// Display plants
const displayPlants = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.classList.add("p-4", "bg-white", "shadow", "rounded-lg", "gap-5");

    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded mb-2"/>
      <h2 onclick="loadWordData(${plant.id})" class="text-lg font-semibold cursor-pointer">${plant.name}</h2>
      <p class="text-sm text-gray-600">${plant.description}...</p>
      <div class="flex items-center justify-between">
        <p class="text-sm text-yellow-600 font-medium">${plant.category}</p>
        <p class="font-bold text-green-600 mt-2">$${plant.price}</p>
      </div>
      <p><button onclick="loadLevelCard(${plant.id})" class="btn bg-green-600 text-white font-semibold w-full cart-box">Add to cart</button></p>
    `;
    cardContainer.appendChild(card);
  });
};

// Load lessons
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => {
      displayLessons(json.categories);
    });
};


// Display lessons
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.category_name}"
        onclick="filterByCategory('${lesson.category_name}')" 
        class="hover:bg-green-600 hover:text-white w-full py-2 my-1 px-3 cursor-pointer rounded-sm text-left"> 
        ${lesson.category_name}
      </button>
    `;
    levelContainer.append(btnDiv);
  });

  // Page load এ প্রথম button active
  const firstButton = document.querySelector("#level-container button");
  if (firstButton) firstButton.classList.add("bg-green-600", "text-white");
};

// Filter by category
const filterByCategory = (categoryName) => {
  const allButtons = document.querySelectorAll("#level-container button");
  allButtons.forEach((btn) => btn.classList.remove("bg-green-600", "text-white"));

  const activeButton = document.getElementById(`lesson-btn-${categoryName}`);
  if (activeButton) activeButton.classList.add("bg-green-600", "text-white");

  if (!allPlants.length) return;

  const filtered = allPlants.filter((plant) => plant.category === categoryName);
  displayPlants(filtered);
};

// Load plant details
const loadWordData = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.plants);
};

// Display plant details
const displayWordDetails = (plant) => {
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `
    <div class="space-y-3">
      <img src="${plant.image}" alt="" class="w-full h-[200px] ">
      <p class="text-xl font-bold">Name: ${plant.name}</p>
      <p class="text-sm text-yellow-600 font-medium">Description: ${plant.description}</p>
      <p class="font-bold text-green-600 mt-2">Category: ${plant.category}</p>
      <p class="font-bold text-green-600 mt-2">Price: ${plant.price}</p>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

// Add to cart
const loadLevelCard = (id) => {
  const plant = allPlants.find((p) => p.id === id);
  if (!plant) return;

  cart.push(plant);
  displayCart();
};

// Display cart
const displayCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += Number(item.price);
    const div = document.createElement("div");
    div.classList.add("flex", "items-center", "bg-white", "rounded", "shadow", "h-15", "mt-5", "justify-between", "px-2");

    div.innerHTML = `
      <span class="font-semibold">${item.name}</span>
      <span class="text-black">$${item.price}</span>
      <button onclick="removeFromCart(${index})" class="text-red-600 font-bold">X</button>
    `;
    cartContainer.appendChild(div);
  });

  if (cart.length > 0) {
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("flex", "justify-between", "items-center", "font-bold", "mt-3", "text-green-400", "text-lg");
    totalDiv.innerHTML = `
      <span>Total:</span>
      <span>$${total}</span>
    `;
    cartContainer.appendChild(totalDiv);
  }
};

// Remove from cart
const removeFromCart = (index) => {
  cart.splice(index, 1);
  displayCart();
};

// Initialize
loadLessons();
loadAllPlants();
