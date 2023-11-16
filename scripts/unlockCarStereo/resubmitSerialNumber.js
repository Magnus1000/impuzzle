// Description: Fetches the order status from the Make API and updates the page accordingly.
document.addEventListener('DOMContentLoaded', function() {
  // Get all fields with a "data-prefill" attribute
  var fields = document.querySelectorAll('[data-prefill]');
  // Get the current URL
  var url = new URL(window.location.href);
  // Iterate over each field
  fields.forEach(function(field) {
    // Get the query parameter for the field
    var param = field.getAttribute('data-prefill');
    // Get the value of the query parameter
    var value = url.searchParams.get(param);
    // If the query parameter has a value, set it as the field value
    if (value) {
      field.value = value;
    }
  });
    // Get the input field
  var field = document.querySelector('#Order_ID-2');
  // Make the input field read-only
  field.readOnly = true;
});


document.addEventListener('DOMContentLoaded', function() {
const form = document.querySelector('form');
const successRedirectURL = 'https://www.unlockcarstereo.com/success';

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
    data[key] = value;
    }

    // Send data to Make webhook
    try {
    const response = await fetch('https://hook.us1.make.com/a3rwykfhisakdl9m2p91neo1wq8od673', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        // Redirect to the success page
        window.location.href = successRedirectURL;
    } else {
        // Handle error
        console.error('Error submitting form:', response.statusText);
    }
    } catch (error) {
    console.error('Error submitting form:', error.message);
    }
});
});