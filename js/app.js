
const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded',() => {

    document.addEventListener('submit',verificarBusqueda);

});

function verificarBusqueda(e) {
    e.preventDefault();

    const txtInput = document.querySelector('#termino');
    if (txtInput.value === "") return console.log('Escribe algo...');

    buscarImg();
}

function buscarImg() {

    const foto = document.querySelector('#termino').value;

    const url = `https://pixabay.com/api/?key=29998498-8a4342bdb6695b39f6ac3b3a9&per_page=${registrosPorPagina}&image_type=photo&q=${foto}&page=${paginaActual}`;
    
    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            
            insertarBusqueda(resultado.hits)

        })

}

function calcularPaginas(total) {
    return Math.ceil(total / registrosPorPagina);
}

//Creamos el iterador 
function *crearPaginador(total) {
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

function insertarBusqueda(obj) {
    const zona = document.querySelector('#resultado');
    const numerador = document.querySelector('#paginacion');


    //Limpiamos la búsqueda anterior
    while (zona.firstChild) {
        zona.firstChild.remove();
    }


    obj.forEach(img => {

        const {largeImageURL, likes, views, previewURL} = img;

        //console.log(img);

        zona.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white ">
                    <img class="w-full" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="card-text">${likes} Me Gusta</p>
                        <p class="card-text">${views} Vistas </p>
        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                    </div>
                </div>
            </div>
        `;  
    });
    //Limpiamos la búsqueda anterior
    while (paginacion.firstChild) {
        paginacion.firstChild.remove();
    }

    mostrarPaginador();
}

function mostrarPaginador() {
    iterador = crearPaginador(totalPaginas);

    while (true) {
        const {value, done} = iterador.next(); 
        if (done) return;

        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        
        boton.classList.add('siguiente', "bg-yellow-400","px-4", "py-1", 'mr-2', 'font-bold', 'mb-10', 'rounded');
        
        boton.onclick = () => {
            paginaActual = value;

            buscarImg();
        };
        
        
        document.querySelector('#paginacion').appendChild(boton);
    
    }
}