let newArray;
onLoad();

function onLoad() {
  bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  createArray();
  showBagItems();
  bagSummary();
}

function showBagItems() {
  for (let i = 0; i < newArray.length; i++) {
    newElement(newArray[i]);
  }
}

function newElement(element) {
  newHTML = `
    <div class="bag-item">
        <img src="${element.image}" alt="item image" />
        <div class="description">
            <div class="company-name">
                <p>${element.company}</p>
            </div>
            <div class="item-name">
                <p>${element.name}</p>
            </div>
            <div class="price">
                <span class="current-price">Rs ${element.price.current}</span>
                <span class="real-price">Rs ${element.price.real}</span>
                <span class="offer">${element.price.offer} %OFF</span>
            </div>
            <div class="delivery">
                <p>Delivery by 10 Nov 2023</p>
            </div>
            <div class="cross">
                <button onclick="removeItem(${element.id})"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
    </div>
    `;

  itemElement = document.createElement("div");
  itemElement.innerHTML = newHTML;
  document.querySelector(".bag-items").appendChild(itemElement);
}

function createArray() {
  newArray = [];
  bagItems = JSON.parse(localStorage.getItem("bagItems"))
  bagItems.forEach((element) => {
    for (let i = 0; i < items.length; i++) {
      if (element == items[i].id) {
        newArray.push(items[i]);
      }
    }
  });
}

function removeItem(elementId) {
  bagItems = bagItems.filter((itemId) => itemId !== elementId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  location.reload();
  onload();
}

function bagSummary(){

  let subTotal = 0;
  let totalDiscount = 0; 
  let discount;

  newArray.forEach(element => {
    discount=0;
    subTotal += element.price.current;
    discount = element.price.current * (element.price.offer/100);
    totalDiscount += discount;
  });
  let grandTotal = subTotal - totalDiscount + 99;

  
  document.querySelector('.sub-total').innerText = 'Rs' + subTotal;
  document.querySelector('.total-discount').innerText = '-Rs' + totalDiscount;
  document.querySelector('.grand-total').innerText = 'Rs' + grandTotal;
}
