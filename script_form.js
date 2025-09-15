document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);

  // Sending form data to Formspree (you can replace with your email service endpoint)
  fetch(form.action, {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert("Thank you! Your message has been sent.");
      form.reset(); // Reset form fields
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  })
  .catch(error => {
    alert("Error occurred while sending the message.");
  });
});



// Integration with Formspree use below HTML Code
// Modify your HTML form’s action to include the Formspree endpoint for your email:
// <form id="contact-form" method="POST" action="https://formspree.io/f/mnqzbbqj">