// api url
const apiUrl = "http://localhost:3000/api/products";

// ref to local store
const orderForm = JSON.parse(localStorage.getItem('orderForm'));
const products = JSON.parse(localStorage.getItem('addToCart'));


// Create a payload object containing the data to be sent in the request body
const payload = {
    "contact": {
        "firstName": String(orderForm["firstName"]),
        "lastName": String(orderForm["lastName"]),
        "address": String(orderForm["address"]),
        "city": String(orderForm["city"]),
        "email": String(orderForm["email"])
    },
    "products": products.map(el => el.id)

};

// Make the POST request
fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error(error);
    });


// const express = require("express");
// const app = express();

// const orderForm = JSON.parse(localStorage.getItem('orderForm'));
// const products = JSON.parse(localStorage.getItem('addToCart'));

// const api = "http://localhost:3000/api/products";


// api.post("/order", (req, res) => {
//     const contact = {
//         firstName: String(orderForm["firstName"]),
//         lastName: String(orderForm["lastName"]),
//         address: String(orderForm["address"]),
//         city: String(orderForm["city"]),
//         email: String(orderForm["email"])
//     };
//     req.json(contact);

// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`API server listening on port ${port}`);
// });