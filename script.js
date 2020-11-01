const formElem = document.getElementById('form');
const todoInputElem = document.getElementById('todoInput');
const todoListContainer = document.querySelector('.todo--list');


function displayTodoDOM(todo) {
    const liElem = document.createElement('li');
    liElem.classList.add('bounceIn');
    liElem.innerHTML = `
        <span class="text">${todo}</span>
            <div class="options">
                <span id="check"><i class="fa fa-check"></i></span>
                <span id="edit"><i class="fa fa-edit"></i></span>
                <span id="trash"><i class="fa fa-trash"></i></span>
            </div>
    `;
    todoListContainer.appendChild(liElem);
}

formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputTodo = todoInputElem.value;
    if (!inputTodo) {
        alert('Пожалуйста, заполните поле ввода');
    } else {
        displayTodoDOM(inputTodo);
        storeLocalStorage(inputTodo);
    }
});