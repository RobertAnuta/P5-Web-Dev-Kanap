// Import local storage products
let storedCartProduct = localStorage.getItem('addToCart');

// Parse the stored product details as an object
// let selectedCartProduct = JSON.parse(storedCartProduct);

let tmp = JSON.parse(localStorage.getItem('addToCart'));

let selectedCartProduct = tmp || [];
// console.log(selectedCartProduct);

// let cart = JSON.parse(localStorage.getItem('addToCart')) || [];

//For every object create a HTML <a> with dynamically data
selectedCartProduct.map(el => {
  // const products = document.createElement('a');
  const product = document.createElement('article')

  // console.log(search.key);
  // Add class name to the product HTML element article
  product.classList.add("cart__item");

  // Set product data-id 
  product.setAttribute("data-id", `${el.key}`);
  // Set product data-color
  product.setAttribute("data-color", `${el.color}`);

  // For every product insert HTML element with variable data based on local store data
  product.innerHTML = `<div class="cart__item__img">
                <img src="../../back/images/${el.imageUrl}" alt="Photo of ${el.name}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${el.name}</h2>
                  <p>${el.color}</p>
                  <p>€ ${el.price}</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Quantity : </p>
                    <input type="number" id="itemQuantity" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${el.quantity}">
                  </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Delete</p>
            </div>
      </div>
    </div>`
  document.getElementById('cart__items').appendChild(product);

});
// console.log(selectedCartProduct);



// A calculator for the total quantity of the items from my cart
let quantityCalculator = () => {
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = selectedCartProduct.map((el) => el.quantity).reduce((x, y) => x + y, 0);
  console.log(totalQuantity);
};


const quantityInput = document.getElementById("cart__items");

// console.log(quantityInput);

//  Add an event listener that will
document.addEventListener("input", (event) => {
  event.preventDefault;
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
  let item = readCartLs.find((el) => el.key === event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
  console.log(item);
  item.quantity = event.target.value;
  console.log(item.quantity);

  localStorage.setItem("addToCart", JSON.stringify(readCartLs));



  const individualQuantity = readCartLs.reduce((x, y) => {
    const cartQuantity = (Number(x.quantity) + Number(y.quantity));
    return cartQuantity;
  });

  // console.log(individualQuantity);

  const totalQuantity = document.getElementById("totalQuantity");

  totalQuantity.innerHTML = individualQuantity;

  // console.log(event.target.value);

  const indivitualPrice = readCartLs.reduce((totalPrice, el) => {
    const subTotal = el.quantity * el.price;
    const totalCartPrice = subTotal + totalPrice;
    return totalCartPrice;
  }, 0);

  console.log(indivitualPrice);

  // get ref for price
  const priceInput = document.getElementById("totalPrice");

  // Convert the number and add a thousands separator
  const formatTotalPrice = indivitualPrice.toLocaleString('en-GB');

  priceInput.innerHTML = formatTotalPrice;

});



// let updateCart = () => {
//   for (const el of selectedCartProduct) {
//     // for each el calculate the individual price
//     const totalPriceCalculator = selectedCartProduct.reduce((totalPrice, el) => {
//       const subTotal = el.quantity * el.price;
//       return totalPrice + subTotal;

//     }, 0);

//     console.log(totalPriceCalculator);
//
//     // get ref for quantity
//     const quantityInput = document.getElementById("itemQuantity");

//     // Convert the number and add a thousands separator
//     const formatTotalPrice = totalPriceCalculator.toLocaleString('en-GB');

//     totalPrice.innerHTML = formatTotalPrice;

//   };

// };
// updateCart();