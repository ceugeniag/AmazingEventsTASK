const $table = document.getElementById("table")
const $tableUp= document.getElementById("tableUp")
const $tablePast= document.getElementById("tablePast")
const objetoDatos = fetch("https://mindhub-xj03.onrender.com/api/amazing");


objetoDatos.then(response => response.json()).then(data => {
    let eventos = data.events 
    console.log(eventos)

        //Primero filtro por eventos pasados porque son los que tienen assistance
        //Despues le aplico un map al array sacando las propiedades de assistance y capacity de cada uno y calculo el porcentaje entre ambas.
        // Aplico tofixed para que sean numeros enteros y le agrego al array la propiedad porcentaje
       //Le ordeno con sort a past eventos con porcentaje de parametro
       // Por ultimo filtro para sacar las capacidades asi se cual evento es la mayor

    let pastEvents = eventos.filter(e => e.assistance);
    console.log(pastEvents)
    pastEvents.map(e => {
        let assistance = e.assistance;
        let capacity = e.capacity;
        let porcentaje = ((assistance / capacity) * 100).toFixed();
        e.porcentaje = porcentaje;
    });
    const pastEventsOrdenados = pastEvents.sort((a, b) => b.porcentaje - a.porcentaje);
    let capacity = eventos.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity);
    console.log(pastEventsOrdenados);

    // TABLA EVENTOS 
    //A esta funcion le pongo de parametro los eventos pasados ordenados y el array de capacidades

    function tableEvent(pastEventsOrdenados, capacity) {
        let tabla = `
        <table class="table table-bordered">
        <th class= "table-active">Events statistics</th>
        <tbody>
        <tr>
        <td>Event with the highest percentage of attendance</td>
        <td>Event with the lowest percentage of attendance</td>
        <td>Event with larger capacity</td>
        </tr>
        <tr>
        <td>${pastEventsOrdenados[0].name}:  ${pastEventsOrdenados[0].porcentaje}%</td>
        <td>${pastEventsOrdenados[pastEventsOrdenados.length - 1].name}:  ${pastEventsOrdenados[pastEventsOrdenados.length - 1].porcentaje}%</td>
        <td>${capacity[0].name}:  ${capacity[0].capacity} </td>
        </tr>
`
        $table.innerHTML= tabla
        return tabla;
    }
    tableEvent(pastEventsOrdenados, capacity);

// TABLA UPCOMING

    let upcomingEvents = eventos.filter(e => e.estimate);
    console.log(upcomingEvents);
// hago un array con las categorias futuras y con set elimino las repetidas
    const catUpcoming = upcomingEvents.map(eventos => eventos.category);
    const catUpcomingSet = new Set(catUpcoming);
    const categoryUpc = [...catUpcomingSet];
    console.log(categoryUpc);

//array de objetos con categorias y el de eventos

    const arrayCatUpcoming = [];
    categoryUpc.map(category =>
        arrayCatUpcoming.push({
            category: category,
            evento: upcomingEvents.filter(evento => evento.category === category),
        }));
    console.log(arrayCatUpcoming);
    
    //array de objetos que tiene los elementos que necesito: capacity category estimate y revenue
    let categoryUpcomingData = [];
    arrayCatUpcoming.map(datos => {
        categoryUpcomingData.push({
            category: datos.category,
            estimate: datos.evento.map(item => item.estimate),
            capacity: datos.evento.map(item => item.capacity),
            estimateRevenue: datos.evento.map(item => item.estimate * item.price)
        });
    });
    console.log(categoryUpcomingData);

//voy sumando los totales de cada categoria
    categoryUpcomingData.forEach(category => {
        let totalEstimate = 0;
        category.estimate.forEach(estimate => totalEstimate += Number(estimate));
        category.estimate = totalEstimate;

        let totalCapacityUpc = 0;
        category.capacity.forEach(capacity => totalCapacityUpc += Number(capacity));
        category.capacity = totalCapacityUpc;

        let totalEstimateRevenue = 0;
        category.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue))
        category.estimateRevenue = totalEstimateRevenue;

        category.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityUpc).toFixed();
    })
    console.log(categoryUpcomingData);

// TABLA UPCOMING------
    function tableUp() {
        let tableUp = `
        <table class="table table-bordered">
        <th class= "table-active">Upcoming events statistics by category</th>
        <tbody>
        <tr>
        <td>Categories</td>
        <td>Estimated</td>
        <td>Percentage of estimated attendance</td>
        </tr>`

        categoryUpcomingData.forEach(e => {
            e.categoryUpcomingData
            tableUp += `
            <tr>
            <td>${e.category}</td>
            <td>USD ${e.estimateRevenue}</td>
            <td>${e.porcentajeAttendace}%</td>
            </tr>`
        })
        $tableUp.innerHTML= tableUp
        return tableUp;
        }
    
    tableUp();

    //array con las categorias pasadas, con set para que no haya repetidos
    const catPast = pastEvents.map(eventos => eventos.category)
    const catPastSet = new Set(catPast)
    const categoryPast = [...catPastSet]
    console.log(categoryPast)

    //array de objetos con categorias y el de eventos pasados
    const arrayCatPast = []
    categoryPast.map(category =>
        arrayCatPast.push({
            category: category,
            evento: pastEvents.filter(evento => evento.category === category),
        }))
    console.log(arrayCatPast)

    //aca el array de objetos con todo lo que necesito, estimate, capacity, category assistance y revenue
    let categoryPastData = []
    arrayCatPast.map(datos => {
        categoryPastData.push({
            category: datos.category,
            assistance: datos.evento.map(item => item.assistance),
            capacity: datos.evento.map(item => item.capacity),
            revenue: datos.evento.map(item => item.assistance * item.price)
        })
    })
    console.log(categoryPastData)

//sumatoria de cada categoria con los totales
    categoryPastData.forEach(category => {
        let totalAssistance = 0
        category.assistance.forEach(assistance => totalAssistance += Number(assistance))
        category.assistance = totalAssistance

        let totalCapacityPast = 0
        category.capacity.forEach(capacity => totalCapacityPast += Number(capacity))
        category.capacity = totalCapacityPast

        let totalRevenue = 0
        category.revenue.forEach(revenue => totalRevenue += Number(revenue))
        category.revenue = totalRevenue

        category.attendancePerc = ((totalAssistance * 100) / totalCapacityPast).toFixed()
    })
    console.log(categoryPastData)

    //FUNCION TABLA PAST -----

    function tablaPast() {
        let tablePast = `
        <table class="table table-bordered">
        <th class= "table-active">Past Events statistics by category</th>
        <tbody>
        <tr>
        <td>Categories</td>
        <td>Revenues</td>
        <td>Percentage of attendance</td>
        </tr>`

        categoryPastData.forEach(e => {
            e.categoryPastData
            tablePast += `
            <tr>
            <td>${e.category}</td>
            <td>USD ${e.revenue}</td>
            <td>${e.attendancePerc}%</td>
            </tr>`

        })
        $tablePast.innerHTML= tablePast
        return tablePast;
    }
    tablaPast()
})
.catch(error=> console.log(error));