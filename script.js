window.addEventListener('DOMContentLoaded', () => {
  // Activar iconos de Lucide si está disponible
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Manejo del formulario de contacto
  const form = document.getElementById("my-form");
  const status = document.getElementById("status");
  const btn = document.getElementById("submit-btn");

  if (!form || !status || !btn) return;

  async function handleSubmit(event) {
    event.preventDefault(); // Evita que la página se recargue
    const data = new FormData(event.target);

    btn.disabled = true;
    btn.innerText = "Enviando...";

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado con éxito.";
        status.classList.remove("error");
        status.classList.add("success");
        form.reset(); // Limpia el formulario
        setTimeout(() => {
          status.innerHTML = "";
          status.classList.remove("success");
        }, 5000);
      } else {
        status.innerHTML = "Ups! Hubo un problema al enviar.";
        status.classList.remove("success");
        status.classList.add("error");
      }
      btn.disabled = false;
      btn.innerText = "Enviar Mensaje";
    }).catch(error => {
      status.innerHTML = "Error de conexión. Inténtalo de nuevo.";
      status.classList.remove("success");
      status.classList.add("error");
      btn.disabled = false;
      btn.innerText = "Enviar Mensaje";
    });
  }

  form.addEventListener("submit", handleSubmit);
});