const section = document.getElementById( "sectionPast" );
const $checkbox = document.getElementById( "check" );
const $search= document.getElementById("search");
const objetoDatos = fetch("https://mindhub-xj03.onrender.com/api/amazing");


objetoDatos.then(response => response.json()).then(data => {
    const past= filtrarListaPast(data)
    const listaCategory = Array.from(new Set(past.map(category => category.category)))
    const categorias= listaCategory.reduce( (acc, category) => acc += `
    <label class="form-check-label px-3" for="flexCheckChecked"> ${category}</label> <input class="form-check-input " type="checkbox" value="${category}" id="flexCheckChecked" >`, '')
    $checkbox.innerHTML+= categorias
    function filtrarListaPast (lista){
        let pastEvents = [];
        for (let event of data.events){
            if( event.date < lista.currentDate){
            pastEvents.push(event);
            }   
        }   return pastEvents;
    }
    pintarTarjetas(past, sectionPast)
    $checkbox.addEventListener("change", e => {
        const filtrado = filtroCruzado()
        pintarTarjetas(filtrado, sectionPast)
    })
    $search.addEventListener('input', e=>{
        const filtrado = filtroCruzado()
        pintarTarjetas(filtrado, sectionPast)
    })
    function filtroCruzado(){
        return filtroPalabras(filtroCheck(past))
}
})
.catch(error=> console.log(error));

//Aca creo la card :
function crearTarjetaConInner(event){
    const template= 
    `
    <div class="card p-3  m-3" style="width: 20rem;">
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
        <h5 class="card-title"> ${ event.name } </h5>
        <p class="card-text">${ event.date }</p>
        <a href="./details.html?id=${event._id}" class="btn btn-danger">More details</a>
        </div>
    </div> ` 
    return template;
}

//BUCLE:
let templateAcumuladas="";
for(let event of past){
    templateAcumuladas += crearTarjetaConInner(event)
}

function pintarTarjetas( lista, elemento ){
    let template = ''
    lista.forEach( personaje => template += crearTarjetaConInner( personaje ) )
    elemento.innerHTML = template
} 

//Reasignar el valor a section
sectionPast.innerHTML=templateAcumuladas;

// Aca armo la funcion  para filtrar con los checks
function filtroCheck(listaEventos){
    const check= document.querySelectorAll( 'input[type="checkbox"]:checked')
    const arraycheckbox = Array.from(check).map(checkbox=> checkbox.value )
    if(arraycheckbox.length === 0){
        return listaEventos;
    } else {
        return  listaEventos.filter(event => arraycheckbox.includes(event.category))
    }
}

//Esta funcion me va capturando letra por letra
function filtroPalabras(lista) {
    const ingresaUsuario = $search.value.toLowerCase();
    const filtro= lista.filter(event=> event.name.toLowerCase().includes(ingresaUsuario))
    return filtro;
}