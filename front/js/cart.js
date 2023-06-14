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
  // console.log(totalQuantity);
};


const quantityInput = document.getElementById("cart__items");

// console.log(quantityInput);

//  Add an event listener that will look for input elements
quantityInput.addEventListener("input", (event) => {
  event.preventDefault;

  // import data from local store
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
  let item = readCartLs.find((el) => el.key === event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
  console.log(item.quantity);

  // replace the item quantity with the inputed value
  item.quantity = event.target.value;
  // console.log(event.target.value);
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
  // console.log(itemQuantity.value);

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


const setError = (input, message) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector("p");
  errorDisplay.innerText = message;
  errorDisplay.style.display = "inline";
  input.style.border = "2px solid red"
  return false;
};

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
  const addressValue = address.value.trim();
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

  // if the cart is empty disable the order button
  if (selectedCartProduct === undefined) {
    const orderButton = document.getElementById("order").setAttribute("disable", "true");

  } else {
    const orderButton = document.getElementById("order").removeAttribute("disable");

    const submitedForm = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };
  };
  console.log(submitedForm);
});


// function submitedFormHandler() {

//   const firstNameValue = firstName.value.trim();
//   const lastNameValue = lastName.value.trim();
//   const addressValue = address.value.trim();
//   const cityValue = city.value.trim();
//   const emailValue = email.value.trim();

//   // if the cart is empty disable the order button
//   if (selectedCartProduct === undefined) {
//     const orderButton = document.getElementById("order").setAttribute("disable", "true");

//   } else {
//     const orderButton = document.getElementById("order").removeAttribute("disable");

//     submitedForm.push({
//       firstName: firstName.value,
//       lastName: lastName,
//       address: address,
//       city: city,
//       email: email,
//     });
//   };

// };



// // console.log("The value contains numbers.");
// const validateInputs = () => {

//   if (firstNameValue === undefined || firstNameValue === null || firstNameValue === "") {

//     firstNameErrorMsg.setAttribute("display", "inline");
//     // firstNameErrorMsg.innerText("Please enter your First name!");
//   }




// };



  // firstName.addEventListener("input", (event) => {
  //   const firstNameInput = event.target.value;
  //   if (firstNameInput === null || firstNameInput === "") {
  //     const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  //     firstNameErrorMsg.setAttribute("display", "inline");
  //     firstNameErrorMsg.innerText("Please enter your First name!")

  //     console.log(firstNameErrorMsg);

  //   }
  // });



  //   try{
  // } catch (error) {
  //   console.error(`Importing form error: ${emptyInput.status} `);
  // };

// Email did not match format - test@example.com