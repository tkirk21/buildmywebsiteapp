document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitButton = form.querySelector("button[type='submit']");
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "thank-you.html";
          } else {
            response.json().then((data) => {
              if (data.errors) {
                alert(
                  data.errors.map((error) => error.message).join(", ")
                );
              } else {
                alert(
                  "Oops! There was a problem submitting your form. Please try again or email me directly."
                );
              }
              submitButton.disabled = false;
              submitButton.textContent = originalButtonText;
            });
          }
        })
        .catch(() => {
          alert(
            "Oops! There was a problem submitting your form. Please check your internet connection and try again."
          );
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        });
    });
  }
});