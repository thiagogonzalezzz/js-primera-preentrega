// productos y servicios con sus precios
const products = {
    'aro': 2800,
    'collar': 5800,
    'pulsera': 18000,
    'anillo' : 3800,
    'dije' : 1800,
};

const services = {
    'maquillaje': 15000,
    'uñas': 25000,
    'spa': 35000,
};

// funcion para calcular el costo total
function calcularCostoTotal(items) {
    let total = 0;
    for (let item of items) {
        if (products[item]) {
            total += products[item];
        } else if (services[item]) {
            total += services[item];
        } else {
            alert(`El artículo '${item}' no existe en la lista.`);
        }
    }
    return total;
}

// funcion principal
function simulador() {
    let items = [];
    let continuar = true;

    // ciclo para seleccionar productos y servicios
    while (continuar) {
        let item = prompt("Ingrese el nombre del producto o servicio (o 'fin' para terminar):");
        if (item.toLowerCase() === 'fin') {
            continuar = false;
        } else {
            items.push(item);
        }
    }

    // costo total
    let costoTotal = calcularCostoTotal(items);

    // descuento si el costo total es mayor a $50000
    if (costoTotal > 50000) {
        costoTotal *= 0.7; // Aplicar descuento del 30%
        alert("Se aplica un descuento del 30%.");
    }

    // mostrar el costo total
    alert(`El costo total de los productos y servicios seleccionados es: $${costoTotal.toFixed(2)}`);
}

// llamo a la función principal
simulador();
