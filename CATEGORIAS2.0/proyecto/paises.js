$(document).ready(function() {
    // llama a la función
    $('#cargar-api-btn').click(function() {
        cargarJson();
    });
});

// Función para cargar la api
function cargarJson() {
    let busqueda = $('#search').val().toLowerCase();

    // llama con ajax
    $.ajax({
        url: 'paises1.json', 
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
                            <div class="animal-info">
                                ${paisesAgrupados[pais].animales.map(animal => `
                                    <div class="animal-item">
                                        <h4>${animal.nombre} (${animal.especie})</h4>
                                        <p><strong>Hábitat:</strong> ${animal.habitat}</p>
                                        <p><strong>Dieta:</strong> ${animal.dieta}</p>
                                        <p><strong>Tiempo de Vida:</strong> ${animal.tiempo_de_vida}</p>
                                        <p><strong>Origen:</strong> ${animal.origen}</p>
                                        <img src="${animal.img}" alt="${animal.nombre}">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="mostrar-mas">Mostrar Más</button>
                        </div>
                    `);
                }

                // Maneja el clic en el botón "Mostrar Más"
                $('.mostrar-mas').click(function() {
                    $(this).siblings('.animal-info').slideToggle();
                    $(this).parent().toggleClass('active'); // Agrega clase activa al contenedor
                });
            } else {
                // Mensaje si no se encontraron resultados
                $('#ImprimirR').append('<p>No hay resultados.</p>');
            }
        },
        error: function() {
            // si no se puede cargar la información
            $('#ImprimirR').append('<p>Error al cargar los datos.</p>');
        }
    });
}
