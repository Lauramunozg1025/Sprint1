import getData from "./getData.js"
import { showData, showData2 } from "./showData.js";

const mainOfertas = document.querySelector('.ofertas-info');
const mainPopulates = document.querySelector('.populares-info')
const ofertas = 'http://localhost:3001/descuentos/'
const populares = 'http://localhost:3001/Populares'

document.addEventListener('DOMContentLoaded', () =>{
    const data = getData(ofertas);
    showData(data, mainOfertas)

   
})

document.addEventListener('DOMContentLoaded', () =>{
    const data = getData(populares);
    showData2(data, mainPopulates)

    
})





