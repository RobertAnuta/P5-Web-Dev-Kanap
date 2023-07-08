
// Create an array to store the orders
const orders = [];

// Route to save the orderId
app.post('/api/orders', (req, res) => {
    const { orderId } = req.body;

    // Push the orderId into the orders array
    orders.push(orderId);

    // Send a success response
    res.json({ message: 'OrderId saved successfully' });
});

// Route to retrieve the orderId
app.get('/api/orders', (req, res) => {
    // Get the latest orderId from the orders array
    const latestOrderId = orders[orders.length - 1];

    // Send the latest orderId as the response
    res.json({ orderId: latestOrderId });
});

// ... other routes and server configuration ...

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
