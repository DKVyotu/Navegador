let busquedas = JSON.parse(localStorage.getItem('historialLocal')) || [];

const contenedor = document.getElementById('contenedor');
const boton = document.getElementById('boton');
const input = document.getElementById('input');
const buscador = document.getElementById('buscador');
const ultimabusqueda = document.getElementById('ultimabusqueda');
const historial = document.getElementById('historial');
const eliminarHistorial = document.getElementById('eliminarHistorial');

/* FETCH */
/* 
let pokemones = [];
fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
  .then(rsp => rsp.json())
  .then(dt => {
    pokemones = dt;
    console.log('Se optenia la informacion de la API');
  }); */


/* ASYNC AWAIT */

let tragos = [];

async function obtenerTragos(text) {
  try {
    const rsp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ text);
    const dt = await rsp.json();
    tragos = dt;
    mostrarTragos(tragos.drinks);
  }
  catch (error) {
    console.log('Error al obtener los tragos' + error);
  }
}
function mostrarTragos (buscados) {

  contenedor.innerHTML = '';

  if (buscados != null){
    buscados.forEach(e => {
    const div = document.createElement('div');
    div.classList.add('carta');
    div.innerHTML = `
      <img src="${e.strDrinkThumb}"  alt="...">
      <h2 class="card-title">${e.strDrink}</h2>
      <p class="card-text">${e.strInstructions}</p>
    `;
    contenedor.appendChild(div);
    });  
  } else {
    contenedor.innerHTML = `<h2>No se encontraron coincidencias con tu busqueda</h2>`;
  }
}

function guardarHistorial (input) {

  let ID = () => {
    return Math.random().toString(36).substring(2, 12);
  };
  
  let all = {ID: ID(), busqueda: input};

  busquedas.push(all);

  localStorage.setItem('historialLocal', JSON.stringify(busquedas));

  mostrarHistorial();
}
function mostrarHistorial () { 
  if (busquedas.length > 0) {
    // Genera una cadena de texto con los elementos separados por comas
    let historialTexto = busquedas.map(e => `<strong id= "${e.ID}" class="hs">${e.busqueda}</strong>`).join(' - ');

    // Inserta la cadena generada en el contenedor `historial`
    historial.innerHTML = historialTexto;
    ultimabusqueda.innerHTML = `Utimas busquedas: `;
    
    botonHistorial(busquedas);
  } else {
    historial.innerHTML = '';
    ultimabusqueda.innerHTML = 'No hay busquedas recientes';
  }
  checkButton();
}
function botonHistorial (data) {
  data.forEach(e => { 
    const elemento = document.getElementById(e.ID);
    elemento.addEventListener('click', () => {
      console.log('busqueda: ' + e.busqueda + ' ID: ' + e.ID);
      obtenerTragos(e.busqueda); 
      buscador.style.display = 'block';
      buscador.innerText = `Mostrando resultados del historial ➡️ ${e.busqueda}`;
    });
  });
}

function limpiarHistorial () {
  busquedas = [];
  localStorage.setItem('historialLocal', JSON.stringify(busquedas));
  mostrarHistorial();
}
function checkButton () {
  if (busquedas.length > 0) {
    eliminarHistorial.style.display = 'inline';
  } else {
    eliminarHistorial.style.display = 'none';
  }
}

function mostarInfoDeBusqueda (info) {
  buscador.style.display = 'block';
  buscador.innerHTML = `Resultados de: ${info}`;
}

boton.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value != '') {
    mostarInfoDeBusqueda(input.value);
    guardarHistorial(input.value);
    obtenerTragos(input.value);
    input.value = '';
  } else {
    alert('Ingresa un trago a buscar');
  }
});

eliminarHistorial.addEventListener('click', limpiarHistorial);

mostrarHistorial();
checkButton();