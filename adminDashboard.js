document.addEventListener('DOMContentLoaded', function () {
    const addProductForm = document.getElementById('addProductForm');
    const removeProductButton = document.getElementById('removeProduct');

    // Example using Socket.io
    const socket = io(); // Make sure to include Socket.io library

    // Function to add a product
    window.addProduct = function () {
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').value;
        const productDescription = document.getElementById('productDescription').value; // Added product description

        // Send a request to the server to add the product
        fetch('http://localhost:3000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: productName,
                price: productPrice,
                imageUrl: productImage,
                description: productDescription, // Include product description in the request
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Emit socket event with the added product details
            socket.emit('newProduct', {
                name: productName,
                price: productPrice,
                imageUrl: productImage,
                description: productDescription,
            });
        })
        .catch(error => {
            console.error('Error adding product:', error);
            // Handle error or show a message to the admin
        });
    };

    // Function to remove a product
    window.removeProduct = function () {
        // Get the selected product from the dropdown
        const selectedProduct = document.getElementById('products').value;

        // Send a request to the server to remove the product
        fetch('http://localhost:3000/removeProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: selectedProduct,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle success or show a message to the admin
        })
        .catch(error => {
            console.error('Error removing product:', error);
            // Handle error or show a message to the admin
        });
    };
});
