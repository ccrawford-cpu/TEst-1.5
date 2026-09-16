(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  function setError(fieldName, hasError) {
    const field = form.querySelector('[data-field="' + fieldName + '"]');
    field.classList.toggle("invalid", hasError);
  }

  function validate() {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameValid = name.length > 0;
    const emailValid = emailPattern.test(email);
    const messageValid = message.length > 0;

    setError("name", !nameValid);
    setError("email", !emailValid);
    setError("message", !messageValid);

    return nameValid && emailValid && messageValid;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    if (!validate()) {
      status.classList.add("failure");
      status.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim(),
        }),
      });

      if (response.ok) {
        status.classList.add("success");
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        const errorMessage = (data && data.error) || "Something went wrong. Please try again later.";
        status.classList.add("failure");
        status.textContent = errorMessage;
      }
    } catch (err) {
      status.classList.add("failure");
      status.textContent = "Network error. Please try again later.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    }
  });

  ["name", "email", "message"].forEach((fieldName) => {
    form[fieldName].addEventListener("input", () => {
      const field = form.querySelector('[data-field="' + fieldName + '"]');
      if (field.classList.contains("invalid")) validate();
    });
  });
})();
