/* Traer la informacion siempre */
let TaskLocal = JSON.parse(localStorage.getItem('TaskLocal') || '[]');

const BtnAdd = document.getElementById('btn-add');
const Input = document.getElementById('input');
const Container = document.getElementById('container');

/* Primer render del Local Storage */
TaskLocal.forEach (task => {
  addTask(task.ID, task.tarea, task.estado);
  console.log(task.ID, task.tarea, task.estado)
});

function saveLocal(task) {

  /* Creamos ID aletorio */
  let generateId = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  localStorage.setItem('TaskLocal',JSON.stringify([...TaskLocal, {ID: generateId(), tarea: task, estado: false}]));

  /* Cambiamos el Tasklocal por el nuevo enviado */
  TaskLocal = JSON.parse(localStorage.getItem('TaskLocal') || '[]');

}

/* Funcion agregar tarea */
function addTask(ID, task, estado) {

  /* cambiamos el true a checked  */
  let Checket = (estado ? 'checked' : 'nolisto');
  
  const Card = document.createElement('li');
  Card.innerHTML =(`
          <div>
            <input type="checkbox" class="check" ${Checket} >
            <span class="fs-4">${task}</span>
          </div>
          <div>
            <button class="btn btn-info">Editar</button>
            <button class="btn btn-danger">Eliminar</button>
        </div>`);  
   
  const check = Card.querySelector('.check');
  const BtnEdit = Card.querySelector('.btn-info');
  const BtnDelete = Card.querySelector('.btn-danger');
  const span = Card.querySelector('span');
  const inputE = document.createElement('input');

  function editTask() {
    /* Cambio de Span a Input */
    inputE.value = span.textContent;
    span.replaceWith(inputE);

    /* Modificar Editar a Guardar */
    BtnEdit.textContent = 'Guardar';
    BtnEdit.classList.remove('btn-info');
    BtnEdit.classList.add('btn-success');   
  }

  function saveTask() {
    /* Guardamos el cambio */
    span.textContent = inputE.value;
    inputE.replaceWith(span);

    /* Modificar Guardar a Editar */
    BtnEdit.textContent = 'Editar';
    BtnEdit.classList.remove('btn-success');
    BtnEdit.classList.add('btn-info');
    
    /* Editamos el LocalStorage */
    let editTask = TaskLocal.find(task => task.ID === ID);
    /* Cambiamos el parametro editado */
    editTask.tarea = span.textContent;
    /* Cambiamos el Tasklocal por el nuevo enviado */
    localStorage.setItem('TaskLocal',JSON.stringify(TaskLocal));

  }
   
  function deleteTask() {
    Card.remove();
    
    TaskLocal = TaskLocal.filter(task => task.ID !== ID);
    localStorage.setItem('TaskLocal',JSON.stringify(TaskLocal));

  }
   
  function taskDone() {
    Card.style.backgroundColor = '#99ff91';
    span.style.textDecoration = 'line-through';

    let editTask = TaskLocal.find(task => task.ID === ID);
    editTask.estado = true;
    localStorage.setItem('TaskLocal',JSON.stringify(TaskLocal));

  }

  function taskUndone() {
    Card.style.backgroundColor = 'rgb(228, 228, 228)';
    span.style.textDecoration = 'none';

    let editTask = TaskLocal.find(task => task.ID === ID);
    editTask.estado = false;
    localStorage.setItem('TaskLocal',JSON.stringify(TaskLocal));

  }

  /* Editar Card*/
  BtnEdit.addEventListener('click', () => {
    (BtnEdit.textContent === 'Editar') ? (editTask()) : (saveTask());
  })
   
  /* Eliminar Card */
  BtnDelete.addEventListener('click', () => {
    deleteTask();      
  });

  /* Poner verde o Rojo al hacer click*/
  check.addEventListener('click', () => {
    (check.checked) ?( taskDone()):(taskUndone());
  });

  /* Pone en verde si estaba chekiado */
  (estado) ? (taskDone()):('');


  /* agregamos al contenedor */
  Container.appendChild(Card);

  /* Reset de input */
  Input.value = '';
} 

/* Click en agregar tarea */
BtnAdd.addEventListener('click', () => {

  if (Input.value === '') {
    alert('Ingresa una tarea');
  } else {
    saveLocal(Input.value);
  }
});
