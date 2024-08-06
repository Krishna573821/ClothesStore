let bagItems;

onLoad();

function onLoad() {
  bagItems = JSON.parse(localStorage.getItem('bagItems')) || []; 
  displayItems();
  updateLabel();
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
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
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

function displayItems() {
  if(!document.querySelector(".item-container"))
    return;
  items.forEach((element) => {
    newHTML = `
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
    <button class="add-to wishlist">Add To Wishlist</button>
    <button class="add-to bag" onclick="addToBag(${element.id}); updateLabel();">Add To Bag</button>
  </div>
  `;

    let container = document.createElement("div");
    container.innerHTML = newHTML;
    document.querySelector(".item-container").appendChild(container);
  });
}
