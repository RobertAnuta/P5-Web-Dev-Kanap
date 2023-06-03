
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

// Create the cart
let addToCart = [];

const addToCartButton = document.getElementById('addToCart');

// Add event listener to "add to cart" button and save the product details in local store
addToCartButton.addEventListener('click', () => {

    const id = selectedProduct._id;

    // const id = selectedProduct._id;
    // console.log(document.getElementById('quantity').value);
    
    // Search if the product is already into the cart
    let search = addToCart.find((el) => el.id === selectedProduct._id );

    if (search === undefined) {
        // Push into the cart the product with the current data selection if the product is not in the cart
        addToCart.push({
            id: selectedProduct._id,
            color: document.getElementById('colors').value,
            quantity: parseInt(document.getElementById('quantity').value),
            imageUrl: selectedProduct.imageUrl,
            name: document.getElementById('title').innerText,
            price: document.getElementById('price').innerText
        });
        // if the product is in the cart and have the same color like the new one just increase the quantity
    } else if (search.color === document.getElementById('colors').value){
        search.quantity += parseInt(document.getElementById('quantity').value);
        // if the product is in the cart but have a different color, create a new product
    } else {
        // Push into the cart the product with the current data selection
        addToCart.push({
            id: selectedProduct._id,
            color: document.getElementById('colors').value,
            quantity: parseInt(document.getElementById('quantity').value),
            imageUrl: selectedProduct.imageUrl,
            name: document.getElementById('title').innerText,
            price: document.getElementById('price').innerText
        });
    }

    console.log(addToCart);
    // Function to save the cart items to local storage
    localStorage.setItem(addToCart[0].id, JSON.stringify(addToCart));

    // // // Redirect to the cart page
    // document.location.href = 'cart.html';

});

// console.log(addToCartButton);


// //Get reference to my elements
// const addToCartButton = document.getElementById('addToCart');

// // Add event listener to "add to cart" button and save the product details in local store
// addToCartButton.addEventListener('click', () => {
//     //Get reference to my elements
//     const color = document.getElementById('colors').value;
//     const quantity = document.getElementById('quantity').value;
//     const image = document.getElementById('item_img').value;
//     // Get the product title and price
//     const productName = document.getElementById('title').innerText;
//     const productPrice = document.getElementById('price').innerText;

//     // Function to save the cart items to local storage
//     localStorage.setItem(productName, JSON.stringify(addToCartButton));

//     // Redirect to the cart page
//     document.location.href = 'http://127.0.0.1:5500/front/html/cart.html';

// });


 // //Get reference to my elements
    // const id = selectedProduct._id;
    // const color = document.getElementById('colors').value;
    // const quantity = document.getElementById('quantity').value;
    // const imageUrl = selectedProduct.imageUrl;

    // // Get the product title and price 
    // const productName = document.getElementById('title').innerText;
    // const productPrice = document.getElementById('price').innerText;
