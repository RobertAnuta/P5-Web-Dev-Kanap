
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
