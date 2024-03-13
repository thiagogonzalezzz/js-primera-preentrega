const productos = [
    {
        id: "anillo-1",
        titulo: "Anillo 1",
        imagen: "./multimedia/anillo.jpg",
        categoria: {
            nombre: "Anillos",
            id: "anillos"
        },
        precio: 1000
    },
    {
        id: "aros-1",
        titulo: "Aros 1",
        imagen: "./multimedia/aros.jpg",
        categoria: {
            nombre: "Aros",
            id: "aros"
        },
        precio: 1000
    },
    {
        id: "collar-1",
        titulo: "Collar 1",
        imagen: "./multimedia/collar foto 2.jpg",
        categoria: {
            nombre: "Collares",
            id: "collares"
        },
        precio: 1000
    },
    {
        id: "dije-1",
        titulo: "Dije 1",
        imagen: "./multimedia/dije 2.jpg",
        categoria: {
            nombre: "Dijes",
            id: "dijes"
        },
        precio: 1000
    },
    {
        id: "pulsera-1",
        titulo: "Pulsera 1",
        imagen: "./multimedia/pulsera.jpg",
        categoria: {
            nombre: "Pulseras",
            id: "pulseras"
        },
        precio: 1000
    },
    {
        id: "maquillaje",
        titulo: "Servicio de maquillaje",
        imagen: "./multimedia/servicio de maquillaje.jpg",
        categoria: {
            nombre: "Servicios",
            id: "servicios"
        },
        precio: 1000
    },
    {
        id: "spa",
        titulo: "Servicio de spa",
        imagen: "./multimedia/servicio de spa.jpg",
        categoria: {
            nombre: "Servicios",
            id: "servicios"
        },
        precio: 1000
    },
    {
        id: "unias",
        titulo: "Servicio de uñas",
        imagen: "./multimedia/servicio de uñas.jpg",
        categoria: {
            nombre: "Servicios",
            id: "servicios"
        },
        precio: 1000
    },
]

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

cargarProductos(productos);

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