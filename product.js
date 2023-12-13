document.addEventListener('DOMContentLoaded', function () {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch product details from the server
    fetch(`http://localhost:3000/getProductInfo?id=${productId}`)
        .then(response => response.json())
        .then(productInfo => {
            // Update the product details section with the fetched details
            updateProductDetails(productInfo);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
            // Handle error or show a message to the user
        });

    // Function to update the product details section
    function updateProductDetails(productInfo) {
        const productDetailsContainer = document.getElementById('product-details');
        productDetailsContainer.innerHTML = `
            <h1>${productInfo.name}</h1>
            <img src="${productInfo.imageUrl}" alt="Product Image" class="product-image">
            <p class="product-description">${productInfo.description}</p>
            <p class="product-price">Price: $${productInfo.price}</p>
            
            <dl class="product-details-list">
                <dt>Available Sizes:</dt>
                <dd>${productInfo.sizes.join(', ')}</dd>
                <dt>Colors:</dt>
                <dd>${productInfo.colors.join(', ')}</dd>
                <!-- Add more product details as needed -->
            </dl>

            <button id="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
        `;
    }

    function addToCart() {
        // Make an asynchronous request to add the product to the cart
        fetch(`http://localhost:3000/addToCart?id=${productId}`, {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                alert('Product added to cart!');
            } else {
                alert('Failed to add product to cart. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            alert('An error occurred. Please try again later.');
        });
    }
});