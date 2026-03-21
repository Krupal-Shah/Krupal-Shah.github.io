(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const serviceId = form.dataset.serviceId || "";
  const templateId = form.dataset.templateId || "";
  const publicKey = form.dataset.publicKey || "";

  const setStatus = (message, isError) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.style.color = isError ? "#fca5a5" : "rgba(129, 230, 217, 0.95)";
  };

  if (!window.emailjs || !serviceId || !templateId || !publicKey) {
    setStatus(
      "Form is not configured yet. Add EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY.",
      true,
    );
    return;
  }

  window.emailjs.init({ publicKey: publicKey });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    setStatus("Sending message...", false);

    const params = {
      title: "New message on website",
      name: form.name.value.trim(),
      time: new Date().toLocaleString(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      await window.emailjs.send(serviceId, templateId, params);
      form.reset();
      setStatus("Message sent successfully.", false);
    } catch (error) {
      setStatus("Failed to send message. Please try again.", true);
    }
  });
})();
