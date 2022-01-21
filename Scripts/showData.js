export const showData = async (list, element) => {
    const productos = await list;

    productos.forEach(producto => {
        const {
            id,
            descuento,
            img,
            Precio_descuento,
            Precio_original,
            nombre,
            descripcion,
            categoria
        } = producto;
        const precioIva = Number(Precio_descuento) + 0.19;
        element.innerHTML += `

            <div class="productosJava"  style="display:inline-table">
                <span id="descuento"><b>${descuento}dto</b></span>
                <img src="${img}" data-src="${img}" alt="${nombre}"  class="img-producto">

                <div class="info">
                    <b id="Precio-descuento" data-precio=${precioIva}>$${Precio_descuento}/Kg</b>
                    <b id="Precio-original">${Precio_original}</b>
                    <p id="nombre">${nombre}</p>
                </div>

                <button data-id=${id} class="agregar"><a href="#openModal" id="vinculo-modal">Agregar</a></button>
            </div>

            <div id="template">
            
            </div>
            
        `

    })

    const cards = document.querySelector('.producto-info');

    cards.addEventListener('click', e => {
        infoProduct(e);
    })

    const infoProduct = e => {
        if (e.target.classList.contains('agregar')) {
            setProducto(e.target.parentElement);
        }
        e.stopPropagation()
    }

    const setProducto = objeto => {
        const template = document.getElementById('template')
        const product = {
            id: objeto.querySelector('.agregar').dataset.id,
            title: objeto.querySelector('#nombre').textContent,
            precio: objeto.querySelector('#Precio-descuento').dataset.precio,
            img: objeto.querySelector('.img-producto').dataset.src,
        }
        console.log(product)

        template.innerHTML = `
    
    <div id="openModal" class="modalDialog">

    <div>
        <fieldset id="modal-producto">
            <a href="#close" title="Close" class="close">X</a>
            <div class="modal-info-productos">
            <div id="cantidad-productos">
                <div class="modal-info-producto">

                    <img src="${product.img}" alt="${product.title}" class="img-info-producto">
                </div>

                <div class="modal-info-producto" id="informacion">
                    <br><br><br>
                    <h4 id="nombre-producto">${product.title}</h4>
                    <b id="precio" data-precios="${product.precio}">$${product.precio}/K</b><br>
                    <span id="info-precio">Precio con IVA incluido</span>

                    <p id="caracteristicas-producto">Peso aproximadamente por pieza, puede variar de acuerdo al peso
                        real</p>
                    
                        <input type="text" id="cantidad" value="0" readonly>
                        <button id="agregar1" data-id="${product.id}" class="agregar-producto">Agregar</button>
                    </div>
                </div>
            </div>

            <fieldset id="ofertas" class="products fielset-productos">
                <div class="productos">
                <h4 class="text-ofertas">Productos relacionados</h4> <br>

                <div id="cards">
                    <div class="producto-info ofertas-info">
                        <div class="productosJava">
                            <span id="descuento"><b>32% dto.</b></span>
                            <img src="./imagenes/fabuloso.jpeg" alt="limones" id="img-producto">
                            <div class="info">
                                <b id="Precio-descuento">$26.82/kg </b>
                                <b id="Precio-original">$39.9/kg</b>
                                <p id="nombre">Limon con semilla</p>
                            </div>
                            <button class="agregar">Agregar</button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </fieldset>
    </div>
</div>
    `

    }

    const items = document.getElementById('items')
    const footer = document.getElementById('footer')
    const templateCard = document.getElementById('template-card').content
    const templateFooter = document.getElementById('template-footer').content
    const templateCarrito = document.getElementById('template-carrito').content
    const fragment = document.createDocumentFragment()
    const template = document.getElementById('template')
    let carrito = {}

    document.addEventListener('DOMContentLoaded', e => {
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'))
            pintarCarrito()
        }
    })

    template.addEventListener('click', e =>{
        addCarrito(e);
        
    })

    items.addEventListener('click', e => {
        btnAccion(e)
    })

     const addCarrito = e => {
    //console.log(e.target)
    //     console.log(e.target.classList.contains('agregar-producto'));
        if (e.target.classList.contains('agregar-producto')) {
            setCarrito(e.target.parentElement);
        }
        e.stopPropagation()
    }

    const setCarrito = objeto => {
      // console.log(objeto)
        const productoCarrito = {
            id: objeto.querySelector('.agregar-producto').dataset.id,
            title: objeto.querySelector('#nombre-producto').textContent,
            precio: objeto.querySelector('#precio').dataset.precios,
            cantidad: 1
            // img: objeto.querySelector('.img-producto').dataset.src,
        }
       // console.log(productoCarrito)

        if (carrito.hasOwnProperty(productoCarrito.id)) {
            productoCarrito.cantidad = carrito[productoCarrito.id].cantidad + 1
        }

        carrito[productoCarrito.id] = {...productoCarrito}
        console.log(carrito)

        let contadorInfo = document.querySelector('#cantidad'). value = productoCarrito.cantidad

        console.log(contadorInfo);

        pintarCarrito()


    }
    
    const pintarCarrito = () => {
        items.innerHTML = ''
    
        Object.values(carrito).forEach(producto => {
            templateCarrito.querySelector('th').textContent = producto.id
            templateCarrito.querySelectorAll('td')[0].textContent = producto.title
            templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
            templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
            
            //botones
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
    
            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment)
    
        pintarFooter()
    }
    
    const pintarFooter = () => {
        footer.innerHTML = ''
        
        if (Object.keys(carrito).length === 0) {
            footer.innerHTML = `
            <th><img src="./Imagenes/carritoVacio.png" width="100%" height="100%"></th> 
            <th scope="row" colspan="5">Carrito vacío - comience a comprar</th>
            `
            return
        }
        // sumar cantidad y sumar totales
        const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
        const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
        // console.log(nPrecio)

        templateFooter.querySelectorAll('td')[0].textContent = nCantidad
        templateFooter.querySelector('span').textContent = nPrecio

        const clone = templateFooter.cloneNode(true)
        fragment.appendChild(clone)
        footer.appendChild(fragment)

        const botonVaciar = document.querySelector('#vaciar-carrito')
        botonVaciar.addEventListener('click', () => {
            carrito = {}
            pintarCarrito()
        })
}

const btnAccion = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()

}




}

export const showData2 = async (list, element) => {
    const productos = await list;

    productos.forEach(producto => {

        const {
            id,
            precio,
            img,
            nombre,
            peso,
            tipoPeso,
            descripcion,
            categoria
        } = producto;
        const precioIva = Number(precio) + 0.19;
        element.innerHTML += `
        <div class="productosJava"  style="display:inline-table">
            <img src="${img}" data-src="${img}" alt="${nombre}" id="" class="img-producto">
            <div class="info">
                <b id="Precio-descuento" data-precio="${precioIva}">$${precio + tipoPeso}</b>
                <p id="nombre">${nombre}</p>
            </div>
            <span id="peso">${peso}</span><br><br>

            <button data-id=${id} class="agregar"><a href="#openModal" id="vinculo-modal">Agregar</a></button>
        </div>
            
        `

    })

    const cards2 = document.querySelector('.populares-info');

    cards2.addEventListener('click', e => {
        infoProduct(e);
    })

    const infoProduct = e => {
        if (e.target.classList.contains('agregar')) {
            setProducto(e.target.parentElement);
        }
        e.stopPropagation()
    }

    const setProducto = objeto => {
        const template = document.getElementById('template')
        const product = {
            id: objeto.querySelector('.agregar').dataset.id,
            title: objeto.querySelector('#nombre').textContent,
            precio: objeto.querySelector('#Precio-descuento').dataset.precio,
            img: objeto.querySelector('.img-producto').dataset.src,
        }
        console.log(product)

        template.innerHTML = `
    
    <div id="openModal" class="modalDialog">

    <div>
        <fieldset id="modal-producto">
            <a href="#close" title="Close" class="close">X</a>
            <div class="modal-info-productos">
            <div id="cantidad-productos">
                <div class="modal-info-producto">

                    <img src="${product.img}" alt="${product.title}" class="img-info-producto">
                </div>

                <div class="modal-info-producto" id="informacion">
                    <br><br><br>
                    <h4 id="nombre-producto">${product.title}</h4>
                    <b id="precio" data-precios="${product.precio}">$${product.precio}</b><br>
                    <span id="info-precio">Precio con IVA incluido</span>

                    <p id="caracteristicas-producto">Peso aproximadamente por pieza, puede variar de acuerdo al peso
                        real</p>
                        <input type="text" id="cantidad" value="0" readonly>
                        <button id="agregar1" data-id="${product.id}" class="agregar-producto">Agregar</button>
                    </div>
                </div>
            </div>

            <fieldset id="ofertas" class="products">
                <div class="productos">
                    <h4 class="text-ofertas">Productos relacionados</h4> <br>

                    <div id="cards">
                        <div class="producto-info ofertas-info">
                            <div class="productosJava">
                                <span id="descuento"><b>32% dto.</b></span>
                                <img src="./imagenes/fabuloso.jpeg" alt="limones" id="img-producto">
                                <div class="info">
                                    <b id="Precio-descuento">$26.82/kg </b>
                                    <b id="Precio-original">$39.9/kg</b>
                                    <p id="nombre">Limon con semilla</p>
                                </div>
                                <button class="agregar">Agregar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </fieldset>
        </fieldset>
    </div>
</div>
    `

    }



}