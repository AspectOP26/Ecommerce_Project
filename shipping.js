document.addEventListener('DOMContentLoaded', function () {
    const shippingForm = document.getElementById('shipping-form');

    shippingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form input values
        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zipCode = document.getElementById('zip-code').value;
        const country = document.getElementById('country').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Validate form inputs (add your own validation logic)
        if (!fullName || !address || !city || !state || !zipCode || !country || !email || !phone) {
            alert('Please fill in all the fields.');
            return;
        }

        // Prepare data to send to the server
        const shippingData = {
            fullName,
            address,
            city,
            state,
            zipCode,
            country,
            email,
            phone,
        };

        // Send data to the server using fetch
        fetch('http://localhost:3000/saveShippingInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shippingData),
        })
        .then(response => response.json())
        .then(result => {
            // Handle the result from the server (e.g., show a confirmation message)
            alert(result.message);
            // Redirect to the next page (billing page) if needed
            window.location.href = 'payment.html';
        })
        .catch(error => {
            console.error('Error saving shipping info:', error);
            alert('An error occurred. Please try again.');
        });
    });
});

function validateAndProceed() {
    // You can add validation logic here if needed
    // This function is called from the HTML button onclick attribute
    document.getElementById('shipping-form').submit();
}
