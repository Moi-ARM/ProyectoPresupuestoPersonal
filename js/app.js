//Arreglos de ingresos y egresos
//const ingresos y egresos

const ingresos = [
    // new Ingreso('Salario', 2500.00),
    // new Ingreso('Venta Coche', 3500.00),
    // new Ingreso('Nuevo Ingreso', 700),
];
const egresos = [
    // new Egreso('Renta departamento', 900),
    // new Egreso('Ropa', 400)
];

//FUNCIONES

//funcion al cargar la pagina
let cargarApp = () => {
    /*función cargar cabecero para 'refrescar' el valor
    en caso de agg algún ingreso o egreso*/
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//función de cargar cabecero (explicación arriba)

let cargarCabecero = () => {
    //variable que tendrá presupuesto total
    let presupuesto = totalIngresos() - totalEgresos();
    //variable que tendrá el porcentaje de presupuesto entre ingreso y egreso
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    //recuperamos los elementos
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//funcion para obtener el total de ingresos que se tienen

let totalIngresos = () => {
    //se iteran cada elemento del arreglo de ingresos
    let totalIngreso = 0;
    //iteración por cada elemento de la clase ingresos...
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

//función para obtener el total de egresos que se tienen

let totalEgresos = () => {
    //se iteran cada elemento del arreglo de egresos
    let totalEgreso = 0;
    //iteración por cada elemento de la clase egresos...
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

//APLICAR FORMATO MONEDA EN LOS VALORES

const formatoMoneda = (valor) => {
    /*.toLocaleString normalmente regresa un valor en forma de cadena
    con el idioma actual, ('idioma', {objeto como parámetro})*/
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2});
    /*Explicación parámetros
    style:currency -> formato de moneda
    currency -> tipo de moneda
    minimumFractionDigits -> mínimo de digitos en centavos*/
}

//APLICAR FORMATO DE PORCENTAJE EN LOS VALORES

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('eu-US', {style:'percent', minimumFractionDigits:2});
    /*Explicación parámetros
    style:percent -> formato de porcentaje
    minimumFractionDigits -> mínimo de digitos en porcentaje*/
}

//función para poder cargar ingresos en la lista de ingresos

const cargarIngresos = () => {
    //se recorre cada valor del arreglo de ingresos
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    //se recupera el elemento de HTML
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

//función de crear ingreso con formato HTML

const crearIngresoHTML = (ingreso) => {
    //usamos templateString
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.description}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline" onclick='eliminarIngreso(${ingreso.id})'>
                </ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

//función para poder cargar egresos en la lista de egresos

const cargarEgresos = () => {
    //se recorre cada valor del arreglo de egresos
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    //se recupera el elemento de HTML
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

//funcion de crear egreso en forma HTML

const crearEgresoHTML = (egreso) => {
    //usamos templateString
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.description}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline" onclick='eliminarEgreso(${egreso.id})'>
                </ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

//funciones para eliminar un elemento de los listados de ingresos y egresos

const eliminarIngreso = (id) => {
    /*.findIndex itera valor por valor dentro del objeto
    (por cada objeto que tenga el arreglo se hace la comparación,
    si el id que se busca concuerda con el id que se tiene, la función
    regresará ese índice*/
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    //.Splice en el arreglo para eliminar un valor del arreglo.
    ingresos.splice(indiceEliminar, 1);
    //Se vuelven a cargar los valores de cabecero e ingreso para modificar valores
    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    /*.findIndex itera valor por valor dentro del objeto
    (por cada objeto que tenga el arreglo se hace la comparación,
    si el id que se busca concuerda con el id que se tiene, la función
    regresará ese índice*/
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    //.Splice en el arreglo para eliminar un valor del arreglo.
    egresos.splice(indiceEliminar, 1);
    //Se vuelven a cargar los valores de cabecero e ingreso para modificar valores
    cargarCabecero();
    cargarEgresos();
}

//funcion de agregar dato por medio del formulario

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    } else {
        alert(`Por favor escriba su ingreso o egreso acompañado de: \nDescripción\nValor`);
    }
}