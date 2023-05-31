// Get reference to the cart items container
const cartItemsContainer = document.getElementById('cart__items');

// Function to display the cart items
function displayCartItems() {
    // Get the cart items from local storage
    const cartItems = getCartItems();

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    // Loop through the cart items and create HTML elements to display them
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('article');
        cartItemElement.className = 'cart__item';
        cartItemElement.setAttribute('data-id', item.productName);
        cartItemElement.setAttribute('data-color', item.color);

        const cartItemImage = document.createElement('div');
        cartItemImage.className = 'cart__item__img';
        const imgElement = document.createElement('img');
        imgElement.src = '../images/logo.png';
        imgElement.alt = 'Photo of a sofa';
        cartItemImage.appendChild(imgElement);
        cartItemElement.appendChild(cartItemImage);

        const cartItemContent = document.createElement('div');
        cartItemContent.className = 'cart__item__content';

        const cartItemDescription = document.createElement('div');
        cartItemDescription.className = 'cart__item__content__description';

        const productNameHeading = document.createElement('h2');
        productNameHeading.textContent = item.productName;
        cartItemDescription.appendChild(productNameHeading);

    });