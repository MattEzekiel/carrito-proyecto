//Variables
const carrito = document.querySelector('#carrito'),
     listaCursos = document.querySelector('#lista-cursos'),
     contenedorCarrito = document.querySelector('#lista-carrito tbody'),
     vaciarCarrito = document.querySelector('#vaciar-carrito');

cargarEventListeners();
function cargarEventListeners() {
    /**
     * Agregar al carrito
     */
    listaCursos.addEventListener('click', agregarCurso)
}

//funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        console.log('Agregando al carrito')
    }
}