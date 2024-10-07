$(document).ready(function() {
    // Al hacer clic en el botón, se llama a la función para cargar el JSON
    $('#cargar-api-btn').click(function(e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del botón
        cargarJson();
    });
});

// Función para cargar el archivo JSON
function cargarJson() {
    // Obtiene el valor de búsqueda, convirtiéndolo a minúsculas para la comparación
    let busqueda = $('#search').val().toLowerCase();

    // Realiza la llamada AJAX para obtener los datos del JSON
    $.ajax({
        url: 'paises1.json', // Ruta al archivo JSON
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Limpia el contenedor de resultados
            $('#ImprimirR').empty();

            // Filtra los datos tanto por país como por animal
            let resultadosFiltrados = data['categoria-letra'].flatMap(categoria =>
                categoria['Todo' + categoria.letra].filter(pais =>
                    pais.pais.toLowerCase().includes(busqueda) || // Filtra por país
                    pais.animal_representativo.nombre.toLowerCase().includes(busqueda) // Filtra por animal
                )
            );

            // Verifica si hay resultados
            if (resultadosFiltrados.length > 0) {
                // Agrupa los resultados por país
                let paisesAgrupados = {};
                resultadosFiltrados.forEach(pais => {
                    // Si el país no está en el objeto, lo inicializa
                    if (!paisesAgrupados[pais.pais]) {
                        paisesAgrupados[pais.pais] = {
                            bandera: pais.imagen, // Almacena la imagen de la bandera
                            animales: [] // Inicializa el array de animales
                        };
                    }
                    // Añade el animal representativo al país
                    paisesAgrupados[pais.pais].animales.push(pais.animal_representativo);
                });

                // Imprime los resultados en el contenedor
                for (let pais in paisesAgrupados) {
                    $('#ImprimirR').append(`
                        <div class="pais-container">
                            <h3 class="pais-nombre">${pais}</h3>
                            <img src="${paisesAgrupados[pais].bandera}" alt="Bandera de ${pais}" class="bandera">
                            <h4>Animales Representativos:</h4>
                            <ul>
                                ${paisesAgrupados[pais].animales.map(animal => `<li>${animal.nombre}</li>`).join('')}
                            </ul>
                        </div>
                    `);
                }
            } else {
                // Si no hay resultados, muestra un mensaje
                $('#ImprimirR').append('<p>No se encontraron resultados.</p>');
            }
        },
        error: function() {
            $('#ImprimirR').empty();
            $('#ImprimirR').append('<p>Error al cargar los datos.</p>');
        }
    });
}
