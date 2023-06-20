
//import the selected product data from index page
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

// Create the cart, and add all stored objects from localStorage in the cart
// let addToCart = JSON.parse(localStorage.getItem('addToCart')) || [];


const addToCartButton = document.getElementById("addToCart");

// Get the items selection and add it to the cart
function handleAddToCart() {

    let tmp = JSON.parse(localStorage.getItem('addToCart'));

    let addToCart = tmp == {} ? [] : tmp || [];

    //Get reference to my elements
    const productId = selectedProduct._id;
    const productColor = document.getElementById('colors').value;
    const productQuantity = parseInt(document.getElementById('quantity').value);
    const productImageUrl = selectedProduct.imageUrl;
    const productName = document.getElementById('title').innerText;
    const productPrice = document.getElementById('price').innerText;
    const productKey = `${productId}-${productColor}`;

    // Find all the objects from the cart that have the same key
    let existingProduct = addToCart.find((el) => el.key === productKey);

    // console.log(existingProduct);

    // If the product is not defined into the cart create a new one
    if (existingProduct === undefined) {
        // Product with the same ID and color exists, update the quantity
        addToCart.push ({
            key: `${productId}-${productColor}`,
            id: productId,
            color: productColor,
            quantity: productQuantity,
            imageUrl: productImageUrl,
            name: productName,
            price: productPrice,
        });
        // if the product have the same color change/add only the quantity
    } else if (existingProduct.color === productColor) {
            existingProduct.quantity += productQuantity;

        } else {
                // Product with the same ID and color doesn't exist, create a new object and push it to addToCart
        addToCart.push({
            key: `${productId}-${productColor}`,
            id: productId,
            color: productColor,
            quantity: productQuantity,
            imageUrl: productImageUrl,
            name: productName,
            price: productPrice,
                });
            };

    // Save the updated addToCart array to local storage
    localStorage.setItem("addToCart", JSON.stringify(addToCart));

    
};

// Add click event listener to the addToCart button
addToCartButton.addEventListener("click", () => {
    handleAddToCart();
    document.location.href = "http://127.0.0.1:5500/front/html/cart.html";
});





// // Add event listener to "add to cart" button and save the product details in local store
// addToCartButton.addEventListener('click', () => {
//     const id = selectedProduct._id;
//     // Search if the product is already into the cart based on product id
//     let search = addToCart.find((el) => el.id === selectedProduct._id);
    

//     if (search === undefined) {
//         // Push into the cart the product with the current data selection if the product is not in the cart
//         addToCart.push({
//             // key: `${selectedProduct._id}-${document.getElementById('colors').value}`,
//             id: selectedProduct._id,
//             color: document.getElementById('colors').value,
//             quantity: parseInt(document.getElementById('quantity').value),
//             imageUrl: selectedProduct.imageUrl,
//             name: document.getElementById('title').innerText,
//             price: document.getElementById('price').innerText,
//         });
//         // if the product is in the cart and have the same color like the new one just increase the quantity
//     } else if (search.color === document.getElementById('colors').value){
//         search.quantity += parseInt(document.getElementById('quantity').value);
//         // if the product is in the cart but have a different color, create a new product
//     } else {
//         // Push into the cart the product with the current data selection
//         addToCart.push({
//             // key: `${selectedProduct._id}-${document.getElementById('colors').value}`,
//             id: selectedProduct._id,
//             color: document.getElementById('colors').value,
//             quantity: parseInt(document.getElementById('quantity').value),
//             imageUrl: selectedProduct.imageUrl,
//             name: document.getElementById('title').innerText,
//             price: document.getElementById('price').innerText,
//         });
//     };
//     console.log(search);

//     // Function to save the cart items to local storage and name the key as (id + color)
//     localStorage.setItem("addToCart", JSON.stringify(addToCart));

//     // Redirect to the cart page
//     // document.location.href = 'http://127.0.0.1:5500/front/html/cart.html';

// });


// const addToCartLs = localStorage.getItem(addToCartKey.key);

    // // Parse the stored product details as an object
    // let addToCartLsParse = JSON.parse(addToCartLs);

    

    // console.log(localStorage.getItem(addToCartLsParse));
    // let searchProductInLocal = localStoredCartProduct.find((el) => el.key === selectedProduct._id);

    // let searchProduct = localStorage.getItem()

    // // // Redirect to the cart page
    // document.location.href = 'cart.html';
 // // Find the product key (id + color)
    // let addToCartKey = addToCart.find((el) => el.key );
    // console.log(addToCartKey);


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
