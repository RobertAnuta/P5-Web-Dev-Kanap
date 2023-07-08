// Fetch the orderId from the backend
fetch('/api/getOrderId')
    .then(response => response.json())
    .then(data => {
        const orderId = data.orderId;

        // Get the orderId element
        const orderIdElement = document.getElementById('orderId');

        // Set the orderId as the text content of the element
        orderIdElement.textContent = orderId;
    })
    .catch(error => {
        console.error(error);
    });

