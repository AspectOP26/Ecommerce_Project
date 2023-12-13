document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display products
    function fetchAndDisplayProducts() {
        // Get selected categories and brands
        const selectedCategories = getSelectedCheckboxes('category');
        const selectedBrands = getSelectedCheckboxes('brand');

        // Send a request to the server to get filtered products
        fetch('http://localhost:3000/getFilteredProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categories: selectedCategories,
                brands: selectedBrands,
            }),
        })
        .then(response => response.json())
        .then(products => {
            // Update the UI with the fetched products
            updateUI(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            // Handle error or show a message to the user
        });
    }

    // Function to update the UI with products
    function updateUI(products) {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = ''; // Clear existing content

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.alt = product.name;
            card.appendChild(img);

            const title = document.createElement('div');
            title.className = 'title';
            title.textContent = product.name;
            card.appendChild(title);

            const price = document.createElement('div');
            price.className = 'price';
            price.textContent = `$${product.price}`;
            card.appendChild(price);

            const viewDetails = document.createElement('a');
            viewDetails.href = `product.html?id=${product._id}`; // Include the product ID in the URL
            viewDetails.className = 'button';
            viewDetails.textContent = 'View Details';
            card.appendChild(viewDetails);

            gridContainer.appendChild(card);
        });
    }

    // Function to get selected checkboxes by type (category or brand)
    function getSelectedCheckboxes(type) {
        const checkboxes = document.querySelectorAll(`input[type=checkbox][id^=${type}-]`);
        const selectedCheckboxes = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id.replace(`${type}-`, ''));
        return selectedCheckboxes;
    }

    // Function to apply filters when the "Apply" button is clicked
    window.applyFilters = function () {
        fetchAndDisplayProducts();
    };

    // Call the function when the page loads
    fetchAndDisplayProducts();
});
