const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const carritoVacio = document.querySelector("#c-vacio")
const carritoProductos = document.querySelector("#c-productos-carrito")
const carritoAcciones = document.querySelector("#c-acciones")
const carritoComprar = document.querySelector("#c-comprado")
let bEliminar = document.querySelectorAll(".c-prod-eliminar")


function cargarCarrito() {
    if (productosCarrito) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprar.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("c-producto-carrito");
            div.innerHTML = `
                <img class="c-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="c-prod-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="c-prod-cantidad">
                    <small>Cantidad</small>
                    <h3>${producto.cantidad}</h3>
                </div>
                <div class="c-prod-precio">
                    <small>Precio</small>
                    <h3>${producto.precio}</h3>
                </div>
                <div class="c-prod-subtotal">
                    <small>Subtotal</small>
                    <h3>${producto.precio * producto.cantidad}</h3>
                </div>
                <button id="${producto.id}" class="c-prod-eliminar"><i class="fa-solid fa-trash"></i></button>
            `;
            carritoProductos.append(div);
        })
    
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprar.classList.add("disabled");
    }
    actBotonesEliminar ();
}

cargarCarrito();

function actBotonesEliminar () {
    bEliminar = document.querySelectorAll(".c-prod-eliminar");
    bEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
}

function eliminarCarrito () {
    
}