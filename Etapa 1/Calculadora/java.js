const calculadora = document.querySelector('#calculadora');
const pantalla = document.querySelector('.pantalla');

function switchCalcuadora (valor) {

  switch (valor) {
    case 'Escape':
    case 'C':
      pantalla.textContent = '';
      break;
    
    case 'Delete':
    case 'D':
    case 'Backspace':
      pantalla.textContent = pantalla.textContent.substring(0, pantalla.textContent.length - 1);
      break;

    case '=':
    case 'Enter':
      pantalla.textContent = eval(pantalla.textContent);
      break;
      
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '.':
    case '/':
    case '*':
    case '-':
    case '+':
      pantalla.textContent += valor;
      break;  

    default:
      console.log('No se reconoce el valor');
      break;
  }
 
}

calculadora.addEventListener('click', (e) =>{
  const boton = e.target;
  switchCalcuadora(boton.getAttribute('data-value'));
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  switchCalcuadora(key);
});

