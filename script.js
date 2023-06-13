// Retrieve codesnippets from local storage or initialize an empty array
let codesnippets = JSON.parse(localStorage.getItem('codesnippets')) || []; codesnippets

// Function to save todos to local storage
function saveSnippets() {
  localStorage.setItem('codesnippets', JSON.stringify(codesnippets));
}

// Function to render codesnippets in the UI
function renderSnippets() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  codesnippets.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const title = document.createElement('h5');
    title.textContent = todo.title;

    const code_ = document.createElement('pre');
    code_.textContent = todo.code_;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger float-right ml-2';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-info float-right';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editTodo(index);
    });

    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-dark';
    copyButton.textContent = 'Copy';
    copyButton.addEventListener('click', () => {
      copyDesription(index);
    });

    listItem.appendChild(title);
    listItem.appendChild(code_);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(copyButton);
    

    todoList.appendChild(listItem);
  });
}

// Function to add a new todo
function addTodo() {
  const titleInput = document.getElementById('todo-title');
  const code_Input = document.getElementById('todo-description');

  const todo = {
    title: titleInput.value,
    code_: code_Input.value,
  };

  codesnippets.push(todo);
  saveSnippets();
  renderSnippets();

  titleInput.value = '';
  code_Input.value = '';
}

function copyDesription(index) {
  const todo = codesnippets[index];
  const snippet = todo['code_'];

  navigator.clipboard.writeText(snippet);

  // Alert the copied text
  alert("Copied:\n" + snippet);

}

// Function to delete a todo
function deleteTodo(index) {
  codesnippets.splice(index, 1);
  saveSnippets();
  renderSnippets();
}

// Function to edit a todo
function editTodo(index) {
  const todo = codesnippets[index];
  const titleInput = document.getElementById('todo-title');
  const code_Input = document.getElementById('todo-description');

  titleInput.value = todo.title;
  code_Input.value = todo.code_;

  codesnippets.splice(index, 1);
  saveSnippets();
  renderSnippets();
}

// Event listener for form submission
document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});


// Initial render of codesnippets
renderSnippets();
