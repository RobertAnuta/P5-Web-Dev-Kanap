
// //import the product data from index page
let storedProduct = localStorage.getItem('selectedProduct');

// Parse the stored product details as an object
let selectedProduct = JSON.parse(storedProduct);

console.log(selectedProduct);

//Add dynamically images
document.getElementById('item_img').innerHTML = `<img src="../images/${selectedProduct.imageUrl}" alt="${selectedProduct.altTxt}">`;

//Add dynamically title
document.getElementById('title').textContent = selectedProduct.name;

//Add dynamically description
document.getElementById('description').textContent = selectedProduct.description;

//Add dynamically colors
document.getElementById('colors').innerHTML = selectedProduct.colors.map((item) => `<option value="${item}">${item}</option>`);

//Add dynamically price
document.getElementById('price').textContent = selectedProduct.price;

//Get reference to my elements
const addToCartButton = document.getElementById('addToCart');

// Add event listener to "add to cart" button
addToCartButton.addEventListener('click', () => {
    //Get reference to my elements
    const color = document.getElementById('colors').value;
    const quantity = document.getElementById('quantity').value;
    const image = document.getElementById('item_img').value;
    // Get the product title and price 
    const productName = document.getElementById('title').innerText;
    const productPrice = document.getElementById('price').innerText;

    // Check if the cart already contains the same product with the same color
    const existingCartItem = getCartItem(productName, color);

});


// // Store the to add to cart product details in local storage and convert to js
// localStorage.setItem('addToCartselectedProduct', JSON.stringify());
// if (existingCartItem) {

//     // If the product exists, update the quantity
//     existingCartItem.quantity += quantity;
// } else {
//     // If the item doesn't exist, create a new cart item
//     const cartItem = {
//         productName,
//         color,
//         price: productPrice,
//         quantity
//     };

//     // Add the new product to the cart
//     const cartItems = getCartItems();
//     cartItems.push(cartItem);
//     saveCartItems(cartItems);

//     //Redirect to the cart page
//     document.location.href = 'http://127.0.0.1:5500/front/html/cart.html';

//     // Function to save the cart items to local storage
//     function saveCartItems(cartItems) {
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }

//     // Function to get a specific cart item by product name and color
//     function getCartItem(productName, color) {
//         const cartItems = getCartItems();
//         return cartItems.find(item => item.productName === productName && item.color === color);
//     }

//     console.log(saveCartItems);
//     console.log(getCartItem);
// }