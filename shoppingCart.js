document.addEventListener('DOMContentLoaded', function () {
    // Assume you have a variable named 'cart' that contains the items in the shopping cart
    // Each item in the cart should be an object with properties like 'id', 'name', 'quantity', 'price', etc.

    // For demonstration purposes, let's assume cart has some items
    const cart = [
        { id: '1', name: 'Product 1', quantity: 2, price: 19.99 },
        { id: '2', name: 'Product 2', quantity: 1, price: 29.99 }
        // Add more items as needed
    ];

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to update the shopping cart UI
    function updateCartUI() {
        // Clear existing content
        cartItemsContainer.innerHTML = '';

        // Iterate over cart items and create table rows
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
                <td><button data-product-id="${item.id}" onclick="removeCartItem(this)">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        // Update total price
        const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);
        applyDeliveryCharge(totalPrice);
    }

    // Initial update when the page loads
    updateCartUI();

    // Function to remove a cart item
    window.removeCartItem = function (button) {
        const productId = button.dataset.productId;

        // Implement logic to remove the item from the cart based on productId
        // For demonstration purposes, let's filter out the item with the specified productId
        const updatedCart = cart.filter(item => item.id !== productId);

        // Update the cart and UI
        cart.length = 0;
        cart.push(...updatedCart);
        updateCartUI();
    };

    // Function to simulate the checkout process
    window.checkout = function () {
        // Implement logic to proceed with the checkout process
        // For demonstration purposes, let's redirect to the shipping info page
        window.location.href = 'shippingInfo.html';
    };

    // Function to apply discount
    window.applyDiscount = function (event) {
        event.preventDefault(); // Prevent form submission
        const discountCodeInput = document.getElementById('discount-code');
        const discountCode = discountCodeInput.value.trim().toLowerCase();

        // Calculate the total price based on the items in the cart
        const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

        // Check if the entered discount code matches any of the specified codes
        if (discountCode === '2023' || discountCode === '2024' || discountCode === 'store2023' ||
            discountCode === 'store2024' || discountCode === 'cloths2024' || discountCode === 'sneaker2024' ||
            discountCode === 'happynewyear') {
            // Apply a 20% discount
            const discountedTotal = totalPrice * 0.8;
            applyDeliveryCharge(discountedTotal);
            alert('Discount applied successfully!');
        } else {
            alert('Invalid discount code. Please try again.');
        }
    };

    // Function to apply delivery charge
    function applyDeliveryCharge(total) {
        const deliveryCharge = 50;
        const totalWithDelivery = total + deliveryCharge;
        applyGST(totalWithDelivery);
    }

    // Function to apply GST
    function applyGST(total) {
        const gstRate = 0.5; // 10% GST
        const gstAmount = total * gstRate;
        const totalWithGST = total + gstAmount;
        totalPriceElement.textContent = `Total (Including 10% GST and $50 Delivery Charge): $${totalWithGST.toFixed(2)}`;
    }

    // Function to redirect to the home page
    window.redirectToHome = function (event) {
        // event.preventDefault(); // Prevent default link behavior
        window.location.href = 'index.html';
    };

    // Function to redirect to the about page
    window.redirectToAbout = function (event) {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = 'about.html';
    };

    // Function to redirect to the help page
    window.redirectToHelp = function (event) {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = 'help.html';
    };

    // Function to redirect to the continue shopping page
    window.redirectToContinueShopping = function (event) {
        // event.preventDefault(); // Prevent default link behavior
        window.location.href = 'index.html';
    };
});
