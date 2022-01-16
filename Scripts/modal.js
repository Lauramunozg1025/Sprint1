`
<div id="openModal" class="modalDialog">
<div>
    <fieldset id="modal-producto">
        <a href="#close" title="Close" class="close">X</a>
        <div class="modal-info-productos">
            
            <div class="modal-info-producto">
                
                <img src="${img}" alt="${nombre}" id="${id}" class="img-info-producto">
            </div>
        
            <div class="modal-info-producto" id="informacion">
                <br><br><br>
                <h4 id="nombre-producto">${nombre}</h4>
                <b id="precio">$${precioIva.toFixed(2)}/Kg</b><br>
                <span id="info-precio">Precio con IVA incluido</span>
        
                <p id="caracteristicas-producto">Peso aproximadamente por pieza, puede variar de acuerdo al peso real</p>
                <label id="info-seleccion">Selecciona la madures que desea</label><br>
        
                <select id="madures">
                    <option selected="true" disabled="disabled" hidden>Por elegir </option>
                    <option> Maduro (para hoy)</option>
                    <option> Normal (3-5 días)</option>
                    <option> Verde (7 días)</option>
                
                </select><br>
        
                <div id="cantidad-productos">
                    <input type="number" name="" id="cantidad" min="1" max="9" step="1" value="1">
                    <button id="agregar1" class="agregar-producto">Agregar</button>
                </div>
            </div>
        </div>
        
        <fieldset id="ofertas" class="products">
            <div class="productos">
                <h4 class="text-ofertas">Productos relacionados</h4> <br>
        
                <div id="cards">
                    <div class="producto-info ofertas-info">
                        <div class="productosJava" >
                                <span id="descuento"><b>32% dto.</b></span>
                                <img src="./imagenes/fabuloso.jpeg" alt="limones" id="img-producto">
                                <div class="info">
                                    <b id="Precio-descuento">$26.82/kg </b>
                                    <b id="Precio-original">$39.9/kg</b>
                                    <p id="nombre">Limon con semilla</p>
                                </div>
                                <button id="agregar">Agregar</button>
                            </div>
                    </div>
                </div>
        
            </div>
        </fieldset>
        
    </fieldset>

</div>

</div>

`