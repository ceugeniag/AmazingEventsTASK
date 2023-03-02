//Busco la section donde esta lo que quiero agregar
const section = document.getElementById( "section" )

//Aca creo la card :
function crearTarjetaConInner(event){
    const template= `
    <div class="card p-3 m-3" style="width: 20rem;">
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
for(let event of data.events){
    crearTarjetaConInner(event)
    templateAcumuladas = (templateAcumuladas + crearTarjetaConInner(event))
}

//Reasignar el valor a section
section.innerHTML=templateAcumuladas
                