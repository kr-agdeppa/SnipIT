// Retrieve codesnippets from local storage or initialize an empty array
let codesnippets = JSON.parse(localStorage.getItem('codesnippets')) || [];

// Function to render codesnippets in the UI
function renderSnippets() {
  const snippetList = document.getElementById('todo-list');
  snippetList.innerHTML = '';

  codesnippets.forEach((code, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const title = document.createElement('h5');
    title.textContent = code.title;

    const code_ = document.createElement('pre');
    code_.textContent = code.code_;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger float-right ml-2';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteSnippet(index);
    });

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning float-right';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editSnippet(index);
    });

    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-info';
    copyButton.textContent = 'Copy';
    copyButton.addEventListener('click', () => {
      copyDesription(index);
    });

    listItem.appendChild(title);
    listItem.appendChild(code_);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(copyButton);

    snippetList.appendChild(listItem);
  });
}

// Function to save snippet to local storage
function saveSnippets() {
  localStorage.setItem('codesnippets', JSON.stringify(codesnippets));
}

// Function to add a new snippet
function addSnippet() {
  const titleInput = document.getElementById('snippet-title');
  const code_Input = document.getElementById('code_shippet');

  const current_snippet = {
    title: titleInput.value,
    code_: code_Input.value,
  };

  codesnippets.push(current_snippet);
  saveSnippets();
  renderSnippets();

  titleInput.value = '';
  code_Input.value = '';
}

function copyDesription(index) {
  const current_snippet = codesnippets[index];
  const snippet = current_snippet['code_'];

  navigator.clipboard.writeText(snippet);

  // Alert the copied text
  alert("Copied:\n" + snippet);

}

// Function to delete a snippet
function deleteSnippet(index) {
  codesnippets.splice(index, 1);
  saveSnippets();
  renderSnippets();
}

// Function to edit a snippet
function editSnippet(index) {
  const current_snippet = codesnippets[index];
  const titleInput = document.getElementById('snippet-title');
  const code_Input = document.getElementById('code_shippet');

  titleInput.value = current_snippet['title'];
  code_Input.value = current_snippet['code_'];

  codesnippets.splice(index, 1);
  saveSnippets();
  renderSnippets();
}

// Event listener for form submission
document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addSnippet();
});


// Initial render of codesnippets
renderSnippets();
