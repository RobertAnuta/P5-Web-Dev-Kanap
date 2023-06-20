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
              <p id="deleteItem" class="deleteItem" type="submit">Delete</p>
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

//  Add an event listener that will look for input elements
document.addEventListener("input", (event) => {
  event.preventDefault;

  // import data from local store
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
  let item = readCartLs.find((el) => el.key === event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
  console.log(item);

  // replace the item quantity with the inputed value
  item.quantity = event.target.value;
  console.log(item.quantity);
  //  store the new value into local storage
  localStorage.setItem("addToCart", JSON.stringify(readCartLs));

  // After task was finished update the grand total
  autoUpdatePage();
});

// function to update the Total Quantity of the cart and the total price
let autoUpdatePage = () => {
  // import the data from local storage
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));

  const itemQuantity = document.getElementById("itemQuantity");
  console.log(itemQuantity.value);

  // if we have only one product add the input value
  if (readCartLs.length <= 1) {
    const totalQuantity = document.getElementById("totalQuantity");
    let individualQuantity = itemQuantity.value;
    totalQuantity.innerHTML = individualQuantity;

  } else {
    // for more products calculate the total quantity
    const individualQuantity = readCartLs.reduce((x, y) => {
      const cartQuantity = (Number(x.quantity) + Number(y.quantity));
      return cartQuantity;
    });
    totalQuantity.innerHTML = individualQuantity;
  };

  // import the total quantity


  // calculate the total individual price of the products
  const indivitualPrice = readCartLs.reduce((totalPrice, el) => {
    const subTotal = el.quantity * el.price;
    const totalCartPrice = subTotal + totalPrice;
    return totalCartPrice;
  }, 0);


  // get ref for price
  const priceInput = document.getElementById("totalPrice");

  // Convert the number and add a thousands separator
  const formatTotalPrice = indivitualPrice.toLocaleString('en-GB');

  // add the total price 
  priceInput.innerHTML = formatTotalPrice;

};

autoUpdatePage();





function deleteButton() {
  const deleteItem = document.querySelectorAll("#deleteItem");

  deleteItem.forEach((deleteItem) => {

    deleteItem.addEventListener("click", (event) => {
      let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
      let item = readCartLs.find((el) => el.key === deleteItem.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id"));
      console.log(item);

      readCartLs.splice(item, 1);
      localStorage.setItem('addToCart', JSON.stringify(readCartLs));
      document.location.reload();
    });
  });
};
deleteButton();


// get referance for First name input
const firstName = document.getElementById("firstName");

// get referance for last name input
const lastName = document.getElementById("lastName");

// get referance for address
const address = document.getElementById("address");

// get referance for City
const city = documet.getElementById("city");

// get referance for Email
const email = documet.getElementById("email");





// deleteItem.addEventListener("click", (event) => {
//   let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
//   let item = readCartLs.findIndex((el) => el.key === deleteItem.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id"));
//   console.log(item);
// });
// const deleteItem = document.getElementById("deleteItem");

// deleteItem.addEventListener("click", deleteButton());