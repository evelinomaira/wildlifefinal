$(document).ready(function() {
    // LLAMA A LA FUNCION
    $('#cargar-api-btn').click(function() {
        cargarJson();
    });
});

// PREPARA LA API
function cargarJson() {
    // VALOR DEL BUSCADOR //tOlowerCase FUNCION PARA MINUSCULA
    let especieBuscada = $('#search').val().toLowerCase();

    //METODO AJAX
    $.ajax({
        url: 'categoria.json', // Ruta al archivo JSON
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#ImprimirR').empty();

            // FILTRO DE BUSQUEDA DENTRO DEL ARREGLO
            let resultadosFiltrados = data.categorias.flatMap(categoria =>
                categoria.Especies.filter(especie =>
                    especie.nombre.toLowerCase().includes(especieBuscada)
                ).map(especie => ({
                    ...especie,
                    categoria: categoria.nombre // Agregar la categoría al resultado
                }))
            );

            // Condicion 
            if (resultadosFiltrados.length > 0) {
                // Imprime la api
                resultadosFiltrados.forEach(especie => {
                    $('#ImprimirR').append(`
                        <div>
                            <h3>${especie.nombre} (${especie.especie})</h3>
                            <p><strong>Categoría:</strong> ${especie.categoria}</p>
                            <p><strong>Hábitat:</strong> ${especie.hábitat}</p>
                            <p><strong>Dieta:</strong> ${especie.dieta}</p>
                            <p><strong>Tiempo de Vida:</strong> ${especie['tiempo de vida']}</p>
                            <p><strong>Origen:</strong> ${especie.origen}</p>
                            <img src="${especie.img}" alt="${especie.nombre}" style="width: 200px; height: auto;">
                        </div>
                    `);
                });
            } else {
                // No hay resultados
                $('#ImprimirR').append('<p>No se encontraron resultados.</p>');
            }
        },
    });
}