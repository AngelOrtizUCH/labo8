new Vue({
    el: '#app',
    data: {
        chocolateria: {},
        categorias: [],
        productos: []
    },
    mounted() {
        this.cargarDatos();
    },
    methods: {
        cargarDatos() {
            // Puedes cargar los datos desde un servidor o archivo JSON aquí
            fetch('json/datos.json')
                .then(response => response.json())
                .then(data => {
                    console.log('Datos cargados exitosamente:', data);
                    this.chocolateria = data.chocolateria;
                    this.productos = data.productos;
                    this.categorias = data.categorias.map(categoria => {
                        return {
                            ...categoria,
                            imagenOriginal: categoria.imagen, // Guarda la imagen original
                            imagenHover: categoria.imagen.replace('.jpg', '_hover.jpg') // Suponiendo que las imágenes hover tienen el sufijo "_hover"
                        };
                    });
                })
                .catch(error => console.error('Error al cargar los datos:', error));
        },
        cambiarImagenCategoria(idCategoria) {
            // Encuentra la categoría por su ID
            const categoria = this.categorias.find(c => c.id === idCategoria);

            // Cambia la imagen a la versión "hover"
            if (categoria) {
                categoria.imagen = categoria.imagenHover;
            }
        },
        restaurarImagenCategoria(idCategoria) {
             // Encuentra la categoría por su ID
            const categoria = this.categorias.find(c => c.id === idCategoria);

             // Restaura la imagen a la versión original
            if (categoria) {
                categoria.imagen = categoria.imagenOriginal;
            }
        }
    }
});
