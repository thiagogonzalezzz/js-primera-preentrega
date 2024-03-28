let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#c-productos")
const bCategoria = document.querySelectorAll(".b-categoria")
const tPrincipal = document.querySelector("#t-principal")
let bAgregar = document.querySelectorAll(".producto-agregar")
const numero = document.querySelector("#numero")


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-det">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);

        actBotonesAgregar();
    })
}

bCategoria.forEach(boton => (
    boton.addEventListener("click", (e) => {
        bCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
));

function actBotonesAgregar () {
    bAgregar = document.querySelectorAll(".producto-agregar");
    bAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    });
}

let productosCarrito;
let productosCarritoLS = localStorage.getItem("productos-carrito");
if(productosCarritoLS) {
    productosCarrito = JSON.parse(productosCarritoLS);
    actNumero();
} else {
    productosCarrito = [];
}

function agregarCarrito(e) {
    Toastify({
        text: "Producto agregado",
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
            x: "5rem", 
            y: "9rem"
          },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    actNumero();

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
};

function actNumero () {
    let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}