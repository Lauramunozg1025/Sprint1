export const showData = async (list, element) => {
    const productos = await list;

    productos.forEach(producto => {
        const {id, descuento, img, Precio_descuento, Precio_original, nombre, descripcion,categoria } = producto;
        
        element.innerHTML += `

            <div class="productosJava"  style="display:inline-table">
                <span id="descuento"><b>${descuento}dto</b></span>
                <img src="${img}" data-img="${img}" alt="${nombre}"  class="img-producto">

                <div class="info">
                    <b id="Precio-descuento">$${Precio_descuento}/Kg</b>
                    <b id="Precio-original">${Precio_original}</b>
                    <p id="nombre">${nombre}</p>
                </div>

                <button data-id=${id} class="agregar"><a class="" href="#openModal" id="vinculo-modal" >Agregar</a></button>
            </div>
            
        `

        const cards = document.querySelector('.producto-info');
        let carrito = {}

        cards.addEventListener('click', e => {
            addCarrito(e);
        })


        const addCarrito = e => {
               // console.log(e.target);
               // console.log(e.target.classList.contains('agg'));
                if (e.target.classList.contains('agregar')) {
                    setProducto(e.target.parentElement);
                }
                e.stopPropagation()
        }

        const setProducto = objeto => {
           //console.log(objeto)
            const product = {
                id: objeto.querySelector('.agregar').dataset.id,
                title: objeto.querySelector('#nombre').textContent,
                precio: objeto.querySelector('#Precio-descuento').textContent,
                img: objeto.querySelector('.img-producto').dataset.img,
                cantidad: 1

            }
           // console.log(product)
            
            if (carrito.hasOwnProperty(product.id)) {
                product.cantidad = carrito[product.id].cantidad + 1;
            }

            carrito[product.id] = { ...product}
            pintarProducto();
        }

        const pintarProducto = () => {
           // console.log(carrito)
           objeto.values(carrito).forEach(item => {
               const {title, precio, img} = item
               const precioIva = precio * 0.19
               
           })
        }

    });

}



export const showData2 = async (list, element) => {
    const productos = await list;

    productos.forEach(producto => {
        const {id, precio, img,  nombre, peso, descripcion, categoria } = producto;
        element.innerHTML += `
        <div class="productosJava"  style="display:inline-table">
            <img src="${img}" alt="${nombre}" id="" class="img-producto">
            <div class="info">
                <b id="Precio-descuento">$${precio}</b>
                <p id="nombre">${nombre}</p>
            </div>
            <span id="peso">${peso}</span><br><br>

            <button data-id=${id} class="agregar"><a href="#openModal" id="vinculo-modal">Agregar</a></button>
        </div>
            
        `

    });
}