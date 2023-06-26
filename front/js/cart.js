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
                <img src="${el.imageUrl}" alt="Photo of ${el.name}">
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
quantityInput.addEventListener("input", (event) => {
  event.preventDefault;

  // import data from local store
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
  let item = readCartLs.find((el) => el.key === event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
  // let test = readCartLs.find((el) => el.key);
  // console.log(test.id);

  // replace the item quantity with the inputed value
  item.quantity = event.target.value;
  // console.log(item.quantity);
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
  let individualQuantity = 0;

  // if the cart is empty then show the value 0
  if (itemQuantity === null || itemQuantity === "" || itemQuantity === undefined) {
    individualQuantity = 0;
  } else {
    individualQuantity = itemQuantity.value;
  };


  // console.log(readCartLs.length);

  const totalQuantity = document.getElementById("totalQuantity");

  // if we have only one product add the input value
  if (readCartLs === null || readCartLs === undefined || readCartLs.length === undefined) {
    let individualQuantity = 0; // Set a default value if readCartLs is null or undefined
    if (readCartLs && Array.isArray(readCartLs)) {
      individualQuantity = readCartLs.length;
    }
    totalQuantity.innerHTML = individualQuantity;
    console.log("Cart Empty");
    // handle quantity if you have only one product in the cart
  } else if (readCartLs.length <= 1) {
    // let individualQuantity = itemQuantity.value;
    totalQuantity.innerHTML = individualQuantity;

    console.log("Cart with 1 product");

    // for more products calculate the total quantity
  } else {
    let cartProductsQuantity = readCartLs.map(item => item.quantity);
    individualQuantity = cartProductsQuantity.reduce((x, y) => {
      const cartQuantity = (Number(x) + Number(y));
      return cartQuantity;
    });
    // import the total quantity
    totalQuantity.innerHTML = individualQuantity;

    // console.log(individualQuantity);
    // console.log(readCartLs);
  };


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

// run the function to update the correct quantity and price
autoUpdatePage();

// delete button that remove the product from local store
function deleteButton() {
  const deleteItem = document.querySelectorAll("#deleteItem");

  // find the correct item to delete from local storage
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


// // FORM // // 

// get referance for form
const form = document.getElementById("form");
// get referance for First name input
const firstName = document.getElementById("firstName");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// get referance for last name input
const lastName = document.getElementById("lastName");
const lastNameErrorMsg = document.getElementById("firstNameErrorMsg");
// get referance for address
const address = document.getElementById("address");
const addressErrorMsg = document.getElementById("firstNameErrorMsg");
// get referance for City
const city = document.getElementById("city");
const cityErrorMsg = document.getElementById("firstNameErrorMsg");
// get referance for Email
const email = document.getElementById("email");
const emailErrorMsg = document.getElementById("firstNameErrorMsg");

// handle errors from form 
const setError = (input, message) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector("p");
  errorDisplay.innerText = message;
  errorDisplay.style.display = "inline";
  input.style.border = "2px solid red"
  return false;
};

// handle errors from form 
const unsetError = (input) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector("p");
  errorDisplay.style.display = "none";
  input.style.border = "none";
  return true;
};

// event listener to watch changes in the form
form.addEventListener("change", (event) => {
  event.preventDefault();
  // console.log(event.target);

  // remove white spaces from input
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();


  // condition format for First name if input value have numbers show error message
  if (/\d/.test(firstNameValue)) {
    setError(firstName, "Please enter a valid First name without a number!");
  } else {
    unsetError(firstName);
  };
  // condition format for Last Name if input value have numbers show error message
  if (/\d/.test(lastNameValue)) {
    setError(lastName, "Please enter a valid Last name without a number!");
  } else {
    unsetError(lastName);
  };
  // condition format for City input if input value have numbers show error message
  if (/\d/.test(cityValue)) {
    setError(city, "Please enter a valid City name without a number!");
  } else {
    unsetError(city);
  };

  // condition format for email input if input value does't have an email format
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(emailValue)) {
    setError(email, "Email did not match format - test@example.com");
  } else {
    unsetError(email);
  };


});

// Array with Form inputs
const submitedForm = [];


// event listener to form submit and prevent default
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const addressValue = address.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();
  const orderButton = document.getElementById("order");

  // if the cart is empty disable the order button
  if (itemQuantity === null) {
    orderButton.setAttribute("disable", "true");

    // else send the form inputs and create a new object
  } else {
    orderButton.removeAttribute("disable");

    const submitedForm = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      address: addressValue,
      city: cityValue,
      email: emailValue,
    };
    // console.log(submitedForm);

    // Create a new Array called OrderForm with the Form input values
    localStorage.setItem("orderForm", JSON.stringify(submitedForm));

  };
});


// console.log(testcart["firstName"]);
const orderButton = document.getElementById("order");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const apiUrl = "http://localhost:3000/api/products/order";

  const orderForm = JSON.parse(localStorage.getItem('orderForm'));
  const products = JSON.parse(localStorage.getItem('addToCart'));

  // console.log(products.map(el => el.id));

  fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "contact": {
        "firstName": String(orderForm["firstName"]),
        "lastName": String(orderForm["lastName"]),
        "address": String(orderForm["address"]),
        "city": String(orderForm["city"]),
        "email": String(orderForm["email"])
      },
      "products": products.map(el => el.id)
    })
  }).then(res => {
    return res.json()
  })

    .then(data => {
      const showOrder = document.getElementById("limitedWidthBlock");
      showOrder.innerHTML = `<div>
        <h1>Thank you for shopping at KANAP</h1>
        <h3>Your Order number is: <span>${data.orderId}</span>
        </h3>
        </div>`;
    })
    // .then(data => console.log(data.orderId))


    .then(data =>
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const hideCart = document.getElementById("cartAndFormContainer");
        hideCart.style.display = "none";
        const showOrder = document.getElementById("limitedWidthBlock");
        showOrder.innerHTML = `<div>
        <h1>Thank you for shopping at KANAP</h1>
        <h2>Your Order number is: ${data} </h3>
        </div>`;

      })
    )


    .catch(error => console.log("Error"))

  localStorage.clear();
});


