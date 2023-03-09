
const $conteinerDetails = document.getElementById("CardDetails")

const params = new URLSearchParams(location.search)

const id = params.get("id")

//Comparar los id
let eventDetail = data.events.find(element => element._id === id);


function cardconDetail (events){
    return `<div class="row g-0 ">
    <div class="col-md-8">
    <img src="${events.image}" class="img-fluid" alt="cinema" width="800">
    </div>
    <div class="col-md-4">
        <div class="card-body  d-flex flex-column justify-content-center">
        <h2 class="card-title">${events.name}</h2>
        <h5 class="card-text">${events.description}</h5>
        <p class="card-text"><small class="text-muted">Date: ${events.date}</small></p>
        <p class="card-text"><small class="text-muted">Place: ${events.place}</small></p>
        <p class="card-text"><small class="text-muted">Price: $${events.price}</small></p>
        <p class="card-text"><small class="text-muted">Capacity: ${events.capacity}</small></p>
        </div>
    </div>
</div>`
}

function pintarTarjetasDetais(lista, elemento){
    let template = ""
    template += cardconDetail(lista)
    elemento.innerHTML = template
}
pintarTarjetasDetais(eventDetail, $conteinerDetails)