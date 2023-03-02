//Aca deberia filtrar:
function filtrarListaFuture (lista){
    let futureEvents = [];
    for (let event of data.events){
        if( event.date > lista.currentDate){
        futureEvents.push(event);
        }   
    }   return futureEvents;
}
const future= filtrarListaFuture(data)

//Aca creo la card :
function crearTarjetaConInner(event){
    const template= 
    `
    <div class="card p-3  m-3" style="width: 20rem;">
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
        <h5 class="card-title"> ${ event.name } </h5>
        <p class="card-text">${ event.date }</p>
        <a href="./details.html" class="btn btn-danger">More details</a>
        </div>
    </div> ` 
    return template;
}

//BUCLE:
let templateAcumuladas="";
for(let event of future){
    templateAcumuladas += crearTarjetaConInner(event)
}
////Busco la section donde esta lo que quiero agregar
const section = document.getElementById( "sectionFuture" )


//Reasignar el valor a section
sectionFuture.innerHTML=templateAcumuladas;