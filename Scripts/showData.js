export const showData = async (list, element) => {
    const productos = await list;

    productos.forEach(producto => {
        const {id, descuento, img, Precio_descuento, Precio_original, nombre, descripcion,categoria } = producto;
        const precioIva = Precio_descuento * 0.19
        element.innerHTML += `
        <div>
            <div class="productosJava"  style="display:inline-table">
                <span id="descuento"><b>${descuento}dto</b></span>
                <img src="${img}" alt="${nombre}" id="" class="img-producto">

                <div class="info">
                    <b id="Precio-descuento">$${Precio_descuento}/Kg</b>
                    <b id="Precio-original">${Precio_original}</b>
                    <p id="nombre">${nombre}</p>
                </div>

                <button id="${id}" class="agregar"><a href="#openModal" id="vinculo-modal"  onchange="agregar_producto(id);">Agregar</a></button>
            </div>

        </div>
            
        `

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

            <button id="" class="agregar"><a href="#openModal" id="vinculo-modal">Agregar</a></button>
        </div>
            
        `

    });
}