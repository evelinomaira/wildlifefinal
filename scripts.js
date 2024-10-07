function guardarNombre() {
    const nombre = document.getElementById('nombre').value;
    if (nombre) {
        localStorage.setItem('nombre', nombre); // Guardar el nombre en localStorage
        // Redirigir a chicas.html
        window.location.href = './CATEGORIAS2.0/proyecto/chicas.html';
    } else {
        alert('Por favor, introduce un nombre.'); // Mensaje si el nombre está vacío
    }
}

// Agregar el evento al botón
document.getElementById('enviarBtn').addEventListener('click', guardarNombre);

// Recuperar el nombre de localStorage
let nombre = localStorage.getItem('nombre');
window.onload = function () {
    let nombreImp = document.getElementById('nombreImp');
    if (nombre) {
        nombreImp.textContent = `, ${nombre}`; // Imprimir el nombre
    } else {
        nombreImp.textContent = ''; // Sin nombre
    }
};
