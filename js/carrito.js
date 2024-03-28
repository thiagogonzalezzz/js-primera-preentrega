let productosCarrito = localStorage.getItem("productos-carrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#c-vacio");
const carritoProductos = document.querySelector("#c-productos-carrito");
const carritoAcciones = document.querySelector("#c-acciones");
const carritoComprar = document.querySelector("#c-comprado");
let bEliminar = document.querySelectorAll(".c-prod-eliminar");
const bVaciar = document.querySelector("#c-acciones-vaciar");
const cTotal = document.querySelector("#total");
const bComprar = document.querySelector("#c-acciones-comprar");


function cargarCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
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
        actBotonesEliminar ();
        actualizarTotal ();
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprar.classList.add("disabled");
    }

}

cargarCarrito();

function actBotonesEliminar () {
    bEliminar = document.querySelectorAll(".c-prod-eliminar");
    bEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
}

function eliminarCarrito (e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #8e5347, #d3a096)",
          borderRadius: "20px",
        },
        offset: {
            x: "3rem", 
            y: "2rem"
          },
        onClick: function(){}
      }).showToast();
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    productosCarrito.splice(index, 1);
    cargarCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

bVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Los productos serán eliminados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Sí"
      }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito.length = 0;
            localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
            cargarCarrito();
          Swal.fire({
            title: "Listo!",
            text: "Los productos fueron eliminados del carrito",
            icon: "success"
          });
        }
      });
    
}

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

bComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprar.classList.remove("disabled");
}