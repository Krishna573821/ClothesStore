let bagItems;

onLoad();

function onLoad() {
  bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
  displayItems();
  updateLabel();
  items.forEach(item => {
    item.isTrending = Math.random() > 0.5; 
  });
  
}

function toggleMenu() {
  let menuContainer = document.querySelector("#menu-container");

  if (menuContainer.style.display === "block") {
    menuContainer.style.display = "none";
  } else {
    menuContainer.style.display = "block";
  }
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  updateLabel();
}

function updateLabel() {
  let label = bagItems.length;
  if (label === 0) {
    document.querySelector(".bag-label").style.display = "none";
  } else {
    document.querySelector(".bag-label").style.display = "flex";
    document.querySelector(".bag-label").innerText = label;
  }
}

function displayItems(category = null) {
  const container = document.querySelector(".item-container");
  if (!container) return;

  container.innerHTML = '';

  let filteredItems = category ? items.filter(item => item.category === category) : items;

  const searchQuery = document.querySelector('.search-bar input').value.toLowerCase();
  if (searchQuery) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery) || 
      item.company.toLowerCase().includes(searchQuery)
    );
  }

  const priceFilter = document.querySelector('input[name="price"]:checked')?.value;
  const topTrendingFilter = document.querySelector('input[name="top-trending"]:checked')?.value;
  const ratingsFilter = document.querySelector('input[name="ratings"]:checked')?.value;

  if (priceFilter) {
    filteredItems.sort((a, b) => priceFilter === 'low-to-high' ? a.price.current - b.price.current : b.price.current - a.price.current);
  }

  if (topTrendingFilter) {
    filteredItems = filteredItems.filter(item => item.isTrending);
  }

  if (ratingsFilter) {
    filteredItems = filteredItems.filter(item => item.ratings.stars >= parseFloat(ratingsFilter));
  }

  filteredItems.forEach((element) => {
    const newHTML = `
      <div class="item">
        <div class="item-image">
          <img src="${element.image}" alt="item-image" />
        </div>

        <div class="ratings">
          <span class="stars">${element.ratings.stars}⭐ ||</span>
          <span class="reviews">${element.ratings.reviews}</span>
        </div>

        <div class="company-name">
          <p>${element.company}</p>
        </div>

        <div class="item-name">
          <p>${element.name}</p>
        </div>

        <div class="price">
          <span class="current-price">Rs ${element.price.current}</span>
          <span class="real-price">Rs ${element.price.real}</span>
          <span class="offer">(${element.price.offer}% OFF)</span>
        </div>
        <button class="add-to-bag" onclick="addToBag(${element.id});">Add To Bag</button>
      </div>
    `;

    let containerDiv = document.createElement("div");
    containerDiv.innerHTML = newHTML;
    container.appendChild(containerDiv);
  });
}


document.querySelector("#main-menu button:nth-child(1)").addEventListener('click', () => displayItems('Men'));
document.querySelector("#main-menu button:nth-child(2)").addEventListener('click', () => displayItems('Women'));
document.querySelector("#main-menu button:nth-child(3)").addEventListener('click', () => displayItems('Kids'));
document.querySelector('.search-bar input').addEventListener('input', () => displayItems());


document.querySelectorAll('input[name="price"]').forEach(input => {
  input.addEventListener('change', () => displayItems());
});

document.querySelector('input[name="top-trending"]').addEventListener('change', () => displayItems());

document.querySelectorAll('input[name="ratings"]').forEach(input => {
  input.addEventListener('change', () => displayItems());
});


document.querySelector('.remove-filters button').addEventListener('click', () => {
  document.querySelectorAll('input[name="price"]').forEach(input => input.checked = false);
  document.querySelector('input[name="top-trending"]').checked = false;
  document.querySelectorAll('input[name="ratings"]').forEach(input => input.checked = false);

  document.querySelector('.search-bar input').value = '';

  displayItems();
});