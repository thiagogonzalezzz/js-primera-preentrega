// productos y sus precios
const products = [
    { name: 'Aro', price: 2800 },
    { name: 'Collar', price: 5800 },
    { name: 'Pulsera', price: 18000 },
    { name: 'Anillo', price: 3800 },
    { name: 'Dije', price: 1800 },
    { name: 'Uñas', price: 10000 },
    { name: 'Spa', price: 30000 },
    { name: 'Maquillaje', price: 18000 }
];

// mostrar el catalogo
function mostrarCatalogo() {
    console.log('Catálogo de productos:');
    products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });
}

// agregar productos al carrito
function agregarAlCarrito(productIndex, quantity, cart) {
    const product = products[productIndex - 1];
    if (product) {
        cart.push({ ...product, quantity });
        console.log(`${quantity} ${product.name}(s) añadido(s) al carrito.`);
    } else {
        console.log('Producto no válido.');
    }
}

// calcular el total del carrito
function calcularTotal(cart) {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}

// mostrar el carrito
function mostrarCarrito(cart) {
    console.log('Carrito de compra:');
    cart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} x${item.quantity} - $${item.price * item.quantity}`);
    });
    console.log(`Total: $${calcularTotal(cart)}`);
}

// funcion principal
function main() {
    const cart = [];

    console.log('Bienvenido a M&G Bijouterie.');

    mostrarCatalogo();

    let continuar = true;
    while (continuar) {
        const opcion = prompt('Ingrese el número del producto que desea agregar al carrito (0 para finalizar):');
        const productIndex = parseInt(opcion);

        if (productIndex === 0) {
            continuar = false;
            mostrarCarrito(cart);
        } else if (productIndex >= 1 && productIndex <= products.length) {
            const quantity = parseInt(prompt('Ingrese la cantidad:'));
            agregarAlCarrito(productIndex, quantity, cart);
        } else {
            console.log('Opción no válida.');
        }
    }

    console.log('Gracias por su compra.');
}

// ejecuto el programa
main();