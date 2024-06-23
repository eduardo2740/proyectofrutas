/*scripts.js*/
document.addEventListener('DOMContentLoaded', () => {
    const productos = document.querySelectorAll('.producto');
    const listaCarrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    productos.forEach(producto => {
        producto.querySelector('.agregar-carrito').addEventListener('click', () => {
            const id = producto.getAttribute('data-id');
            const nombre = producto.getAttribute('data-nombre');
            const precio = parseFloat(producto.getAttribute('data-precio'));
            agregarProducto(id, nombre, precio);
        });
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
        guardarCarrito();
    });

    listaCarrito.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-producto')) {
            const id = e.target.getAttribute('data-id');
            eliminarProducto(id);
        }
    });

    function agregarProducto(id, nombre, precio) {
        const productoExistente = carrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
        guardarCarrito();
    }

    function eliminarProducto(id) {
        carrito = carrito.filter(item => item.id !== id);
        actualizarCarrito();
        guardarCarrito();
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        let totalCarrito = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = '${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toFixed(2)}';
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('eliminar-producto');
            botonEliminar.setAttribute('data-id', item.id);
            li.appendChild(botonEliminar);
            listaCarrito.appendChild(li);
            totalCarrito += item.precio * item.cantidad;
        });

        total.textContent = totalCarrito.toFixed(2);
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    actualizarCarrito();
});