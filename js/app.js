const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos= document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //Agregar curso al carrito
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el carrito
        limpiarHTML(); //Eliminamos todo el html
    })
}

function agregarCurso(e){
    e.preventDefault();


    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}
//Elimina datos del curso
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute("data-id");
        //Elima el arreglo de articCarr por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();//Llamamos la funcion de nuevo por html
    }
}


function leerDatosCurso(curso){
     //console.log(curso);

     //crear obj con el contenido del curso actuak
     const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
     }

     //Revisa si un elemento existe en el carrito

     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
     if(existe){
         //Actualizamos la cantidad
         const cursos = articulosCarrito.map( curso=> {
             if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el obj actualizado
             }else {
                 return curso; //retorna los obejtos que no son los duplicados
             }
         } ); 
     }else {
         //Agregamos el curso al carrito
         articulosCarrito= [...articulosCarrito, infoCurso];
     }

     //Agregar elemtno al array de carrito

     

     console.log(articulosCarrito);

     carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el html
    limpiarHTML();

//Recorre el carrito y genera el html
    articulosCarrito.forEach( curso=>{
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href=# class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        //Agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row); 
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}