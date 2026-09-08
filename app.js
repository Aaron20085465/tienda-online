// ==========================================
// PRODUCTOS
// ==========================================

const productos = [

    {
        id: 1,
        nombre: "Perfume Floral",
        marca: "Ésika",
        categoria: "Perfumes",
        precio: 79.90,
        imagen: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700",
        descripcion: "Fragancia femenina con notas florales y elegantes."
    },

    {
        id: 2,
        nombre: "Perfume Intense",
        marca: "Yanbal",
        categoria: "Perfumes",
        precio: 99.90,
        imagen: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=700",
        descripcion: "Una fragancia intensa y sofisticada para ocasiones especiales."
    },

    {
        id: 3,
        nombre: "Labial Velvet",
        marca: "Cyzone",
        categoria: "Maquillaje",
        precio: 29.90,
        imagen: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=700",
        descripcion: "Labial de acabado elegante y textura suave."
    },

    {
        id: 4,
        nombre: "Base Perfecta",
        marca: "Ésika",
        categoria: "Maquillaje",
        precio: 49.90,
        imagen: "https://images.unsplash.com/photo-1631214524020-7e18dbd37278?w=700",
        descripcion: "Base para un acabado uniforme y natural."
    },

    {
        id: 5,
        nombre: "Crema Hidratante",
        marca: "Ésika",
        categoria: "Cuidado",
        precio: 35.90,
        imagen: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700",
        descripcion: "Crema hidratante para el cuidado diario de la piel."
    },

    {
        id: 6,
        nombre: "Set de Maquillaje",
        marca: "Cyzone",
        categoria: "Maquillaje",
        precio: 69.90,
        imagen: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700",
        descripcion: "Set ideal para crear diferentes estilos de maquillaje."
    },

    {
        id: 7,
        nombre: "Perfume Elegance",
        marca: "Ésika",
        categoria: "Perfumes",
        precio: 89.90,
        imagen: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=700",
        descripcion: "Aroma elegante y femenino."
    },

    {
        id: 8,
        nombre: "Brillo Labial",
        marca: "Cyzone",
        categoria: "Maquillaje",
        precio: 24.90,
        imagen: "https://images.unsplash.com/photo-1631214522573-2b9a5b7a8c3a?w=700",
        descripcion: "Brillo labial para unos labios luminosos."
    },

    {
        id: 9,
        nombre: "Crema Corporal",
        marca: "Yanbal",
        categoria: "Cuidado",
        precio: 39.90,
        imagen: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700",
        descripcion: "Hidratación y suavidad para todo el cuerpo."
    },

    {
        id: 10,
        nombre: "Eau de Toilette",
        marca: "Yanbal",
        categoria: "Perfumes",
        precio: 109.90,
        imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700",
        descripcion: "Fragancia fresca y sofisticada."
    },

    {
        id: 11,
        nombre: "Delineador Pro",
        marca: "Cyzone",
        categoria: "Maquillaje",
        precio: 25.90,
        imagen: "https://images.unsplash.com/photo-1631730486784-4d9b1f2f3c8d?w=700",
        descripcion: "Delineador para conseguir una mirada definida."
    },

    {
        id: 12,
        nombre: "Máscara de Pestañas",
        marca: "Ésika",
        categoria: "Maquillaje",
        precio: 39.90,
        imagen: "https://images.unsplash.com/photo-1631214540553-ff044a7d6d4d?w=700",
        descripcion: "Máscara para dar volumen y definición."
    }

];


// ==========================================
// VARIABLES
// ==========================================

let carrito = [];

let favoritos = [];

let productoModal = null;


// ==========================================
// ELEMENTOS
// ==========================================

const productosGrid =
    document.getElementById("productosGrid");

const carritoElement =
    document.getElementById("carrito");

const overlay =
    document.getElementById("overlay");

const carritoItems =
    document.getElementById("carritoItems");

const totalCarrito =
    document.getElementById("totalCarrito");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const contadorFavoritos =
    document.getElementById("contadorFavoritos");


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos(lista = productos) {

    productosGrid.innerHTML = "";

    if (lista.length === 0) {

        productosGrid.innerHTML = `
            <p>No encontramos productos.</p>
        `;

        return;
    }

    lista.forEach(producto => {

        const esFavorito =
            favoritos.includes(producto.id);

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <img
                class="product-image"
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <button
                class="favorite"
                onclick="toggleFavorito(${producto.id})"
            >
                ${esFavorito ? "♥" : "♡"}
            </button>

            <div class="product-info">

                <span class="product-brand">
                    ${producto.marca}
                </span>

                <h3 class="product-name">
                    ${producto.nombre}
                </h3>

                <div class="product-price">
                    S/ ${producto.precio.toFixed(2)}
                </div>

                <div class="product-actions">

                    <button
                        class="add-cart"
                        onclick="agregarCarrito(${producto.id})"
                    >
                        Agregar
                    </button>

                    <button
                        class="details-btn"
                        onclick="abrirModal(${producto.id})"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        productosGrid.appendChild(card);

    });

}


// ==========================================
// CARRITO
// ==========================================

function agregarCarrito(id) {

    const producto = productos.find(
        p => p.id === id
    );

    const existe = carrito.find(
        p => p.id === id
    );

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    actualizarCarrito();

    abrirCarrito();

}


function actualizarCarrito() {

    carritoItems.innerHTML = "";

    if (carrito.length === 0) {

        carritoItems.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

    }

    let total = 0;

    let cantidadTotal = 0;

    carrito.forEach(producto => {

        total +=
            producto.precio * producto.cantidad;

        cantidadTotal +=
            producto.cantidad;

        carritoItems.innerHTML += `

            <div class="carrito-item">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <div class="carrito-item-info">

                    <h4>
                        ${producto.nombre}
                    </h4>

                    <p>
                        S/ ${producto.precio.toFixed(2)}
                        × ${producto.cantidad}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="eliminarCarrito(${producto.id})"
                >
                    ✕
                </button>

            </div>

        `;

    });

    totalCarrito.textContent =
        `S/ ${total.toFixed(2)}`;

    contadorCarrito.textContent =
        cantidadTotal;

}


function eliminarCarrito(id) {

    carrito =
        carrito.filter(
            producto => producto.id !== id
        );

    actualizarCarrito();

}


// ==========================================
// ABRIR / CERRAR CARRITO
// ==========================================

function abrirCarrito() {

    carritoElement.classList.add("active");

    overlay.classList.add("active");

}

function cerrarCarrito() {

    carritoElement.classList.remove("active");

    overlay.classList.remove("active");

}

document
    .getElementById("btnCarrito")
    .addEventListener(
        "click",
        abrirCarrito
    );

document
    .getElementById("cerrarCarrito")
    .addEventListener(
        "click",
        cerrarCarrito
    );

overlay.addEventListener(
    "click",
    cerrarCarrito
);


// ==========================================
// FAVORITOS
// ==========================================

function toggleFavorito(id) {

    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(
                favorito => favorito !== id
            );

    } else {

        favoritos.push(id);

    }

    contadorFavoritos.textContent =
        favoritos.length;

    mostrarProductos();

}


document
    .getElementById("btnFavoritos")
    .addEventListener(
        "click",
        () => {

            const favoritosProductos =
                productos.filter(
                    p => favoritos.includes(p.id)
                );

            mostrarProductos(
                favoritosProductos
            );

            document
                .getElementById("productos")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


// ==========================================
// FILTRO POR MARCA
// ==========================================

document
    .getElementById("filtroMarca")
    .addEventListener(
        "change",
        function () {

            const marca = this.value;

            if (marca === "Todos") {

                mostrarProductos();

            } else {

                mostrarProductos(
                    productos.filter(
                        p => p.marca === marca
                    )
                );

            }

        }
    );


// ==========================================
// BUSCADOR
// ==========================================

const buscador =
    document.getElementById("buscador");

buscador.addEventListener(
    "input",
    function () {

        const texto =
            this.value.toLowerCase();

        const resultados =
            productos.filter(producto =>

                producto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.marca
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.categoria
                    .toLowerCase()
                    .includes(texto)

            );

        mostrarProductos(resultados);

    }
);


document
    .getElementById("btnBuscar")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("searchBox")
                .classList.toggle("active");

            buscador.focus();

        }
    );


// ==========================================
// CATEGORÍAS
// ==========================================

document
    .querySelectorAll(".category-card")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const categoria =
                    boton.dataset.categoria;

                const resultados =
                    productos.filter(
                        producto =>
                            producto.categoria === categoria
                    );

                mostrarProductos(resultados);

                document
                    .getElementById("productos")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


// ==========================================
// MODAL
// ==========================================

function abrirModal(id) {

    productoModal =
        productos.find(
            p => p.id === id
        );

    document
        .getElementById("modalImagen")
        .src =
        productoModal.imagen;

    document
        .getElementById("modalMarca")
        .textContent =
        productoModal.marca;

    document
        .getElementById("modalNombre")
        .textContent =
        productoModal.nombre;

    document
        .getElementById("modalDescripcion")
        .textContent =
        productoModal.descripcion;

    document
        .getElementById("modalPrecio")
        .textContent =
        `S/ ${productoModal.precio.toFixed(2)}`;

    document
        .getElementById("modal")
        .classList.add("active");

}


document
    .getElementById("cerrarModal")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("modal")
                .classList.remove("active");

        }
    );


document
    .getElementById("modalAgregar")
    .addEventListener(
        "click",
        () => {

            agregarCarrito(
                productoModal.id
            );

            document
                .getElementById("modal")
                .classList.remove("active");

        }
    );


// ==========================================
// WHATSAPP
// ==========================================

document
    .getElementById("btnWhatsApp")
    .addEventListener(
        "click",
        () => {

            if (carrito.length === 0) {

                alert(
                    "Agrega productos al carrito primero."
                );

                return;
            }

            let mensaje =
                "Hola 👋, quiero realizar el siguiente pedido:%0A%0A";

            carrito.forEach(producto => {

                mensaje +=
                    `• ${producto.nombre} x${producto.cantidad} - S/ ${(producto.precio * producto.cantidad).toFixed(2)}%0A`;

            });

            const total =
                carrito.reduce(
                    (sum, producto) =>
                        sum +
                        producto.precio *
                        producto.cantidad,
                    0
                );

            mensaje +=
                `%0A💰 Total: S/ ${total.toFixed(2)}`;

            /*
             * CAMBIA ESTE NÚMERO
             * por el WhatsApp de la tienda.
             *
             * Formato:
             * 519XXXXXXXX
             */

            const telefono =
                "51939413353";

            const url =
                `https://wa.me/${telefono}?text=${mensaje}`;

            window.open(
                url,
                "_blank"
            );

        }
    );


// ==========================================
// OFERTAS
// ==========================================

document
    .getElementById("btnOferta")
    .addEventListener(
        "click",
        () => {

            const telefono =
                "51999999999";

            const mensaje =
                "Hola 👋, quisiera consultar por las ofertas y promociones disponibles.";

            window.open(
                `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
                "_blank"
            );

        }
    );


// ==========================================
// INICIO
// ==========================================

mostrarProductos();

actualizarCarrito();