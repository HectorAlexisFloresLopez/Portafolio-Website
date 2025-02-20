const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

//CODE OF CONTECT FORM

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
    
    // Obtenemos los valores del formulario
    const email = e.target.email.value;
    const message = e.target.message.value;

    // Enviamos la solicitud al servidor
    const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
    });

    const data = await response.json(); // Respuesta del servidor
    
    if (response.ok) {
        alert(data.message); // Mostrar mensaje de éxito
    } else {
        alert(data.error);  // Mostrar mensaje de error
    }
});