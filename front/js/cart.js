// Import local storage products
let storedCartProduct = localStorage.getItem('addToCart');

// Parse the stored product details as an object
let selectedCartProduct = JSON.parse(storedCartProduct);

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

// A calculator for the total quantity of the items from my cart
let quantityCalculator = () => {
    let totalQuantity = document.getElementById("totalQuantity");
    // console.log(selectedCartProduct.map((el) => el.quantity).reduce((x, y) => x + y, 0));
    totalQuantity.innerHTML = selectedCartProduct.map((el) => el.quantity).reduce((x, y) => x + y, 0);

};
quantityCalculator();



// For each loop that will make a Total price for every product indicidualy then sum them together
for (const el of selectedCartProduct) {
    // for each el calculate the individual price
    const totalPriceCalculator = selectedCartProduct.reduce((totalPrice, el) => {
        const subTotal = el.quantity * el.price;
        return totalPrice + subTotal;
    }, 0);

    console.log(totalPriceCalculator);
};
