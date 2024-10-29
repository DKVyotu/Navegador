const BtnAdd = document.getElementById('btn-add');
const Input = document.getElementById('input');
const Container = document.getElementById('container');
const NoTask = document.getElementById('ntareas');
let nTask = false;

/* Ver si no hay tareas */
function checkTask() {
  if (nTask === false) {
    NoTask.innerHTML = `<h2>No hay tareas</h2>`;
  } else {
    NoTask.style.display = 'none';
  }
}

/* Funcion agregar tarea */
function addTask(task) {
  const Card = document.createElement('li');
    Card.innerHTML = `
          <div>
            <input type="checkbox" class="check">
            <span>${task}</span>
          </div>
          <div>
            <button class="btn btn-info">Editar</button>
            <button class="btn btn-danger">Eliminar</button>
          </div>`;  
    
    const BtnDelete = Card.querySelector('.btn-danger');

    const BtnEdit = Card.querySelector('.btn-info');
    const span = Card.querySelector('span');
    const input = document.createElement('input');

    const check = Card.querySelector('.check');

    /* Poner verde o Rojo*/
    check.addEventListener('click', () => {
      if (check.checked) {
        Card.style.backgroundColor = '#99ff91';
      } else {
        Card.style.backgroundColor = '#ff8585';
      }
    });


    /* Eliminar Card */
    BtnDelete.addEventListener('click', () => {
      console.log(Container.appendChild(Card));
      Card.remove();
      
    });

    /* Editar Card*/
    BtnEdit.addEventListener('click', () => {
      if (BtnEdit.textContent === 'Editar') {
        editTask();
        function editTask() {
          /* Cambio de Span a Input */
          input.style.display = 'initial';
          span.style.display = 'none';
          input.value = span.textContent;
          span.replaceWith(input);
    
          /* Modificar Editar a Guardar */
          BtnEdit.textContent = 'Guardar';
          BtnEdit.classList.remove('btn-info');
          BtnEdit.classList.add('btn-success');   
        }

      } else {
        saveTask();
        function saveTask() {
          /* Guardamos el cambio */
          span.textContent = input.value;
          span.style.display = 'initial';
          input.style.display = 'none';
          input.replaceWith(span);
    
          /* Modificar Guardar a Editar */
          BtnEdit.textContent = 'Editar';
          BtnEdit.classList.remove('btn-success');
          BtnEdit.classList.add('btn-info');
        }

      }
    })

    /* Agregamos al contenedor */
    Container.appendChild(Card);

    /* Cambiamos el valor de control */
    nTask = true;
    checkTask();
} 

/* Evento de agregar tarea */
BtnAdd.addEventListener('click', () => {
  /* Validamos el contenido */
  if (Input.value === '') {
    alert('Ingresa una tarea');
    return;
  }
  /* Agregamos al contenedor */
  addTask(Input.value);
  /* Reset de input */
  Input.value = '';
});

/* Ejecutamos el control */
checkTask();