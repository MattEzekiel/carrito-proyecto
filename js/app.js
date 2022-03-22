//Variables
const carrito = document.querySelector('#carrito'),
     listaCursos = document.querySelector('#lista-cursos'),
     contenedorCarrito = document.querySelector('#lista-carrito tbody'),
     vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

/**
 * Ejecuta cuando se cargue el DOM
 */
document.addEventListener('DOMContentLoaded',cargarEventListeners);

/**
 * Carga los listeners
 */
function cargarEventListeners() {
    /**
     * Agregar al carrito
     */
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
        limpiarHTMLCarrito();
    });

    if (articulosCarrito.length !== 0){
        carritoHTML();
    }
}

//funciones

/**
 * Agrega el curso
 * @param e
 */
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCursos(cursoSeleccionado);
    }
}

/**
 * Elimina el curso
 */
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        localStorage.setItem('carrito',JSON.stringify(articulosCarrito));

        carritoHTML(); //Vuelve a iterar sobre el archivo y crear el html
    }
}

/**
 * Lee el curso
 * @param curso
 */
function leerDatosCursos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe){
        //Actualizar carrito
        const cursos = articulosCarrito.map(curso => {
           if (curso.id === infoCurso.id){
               curso.cantidad++
               return curso; //Retorna el objeto actualizado
           } else {
               return curso; //Retorna los objetos que no son los duplicados
           }
        });
        articulosCarrito = [...cursos];
        localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
    } else {
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
    }

    carritoHTML();
}

/**
 * Genera el html del carrito
 */
function carritoHTML() {
    limpiarHTMLCarrito();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const trElement = document.createElement('tr');
        trElement.innerHTML = `
            <td>
                <img src="${imagen}" alt="Imágen del curso" width="100">
            </td>
            <td>${titulo}</td>
            <td class="center">${precio}</td>
            <td class="center">${cantidad}</td>
            <td class="center">
                <button type="button" class="borrar-curso" data-id="${id}">X</button>
            </td>
        `;
        contenedorCarrito.appendChild(trElement);
    });
}

/**
 * Limpia el contenido previo del carrito
 */
function limpiarHTMLCarrito() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    //forma optima
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}