const date = new Date();

const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
]

const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]

const todaysDay = document.getElementById('todaysDay');
const todaysDate = document.getElementById('todaysDate');
todaysDay.textContent = days[date.getDay()];
todaysDate.textContent = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

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

function itemToDelete(item) {
    if (item.classList.contains('fa-trash') || item.id === 'trash') {
        const todoLiElem = item.closest("li");
        todoLiElem.classList.remove('bounceIn');
        todoLiElem.classList.add('bounceOutDown');

        setTimeout(() => {
            todoLiElem.remove();
        }, 1000);

        deleteDataFromLocalStorage(item);
    }
}

function itemToEdit(item) {
    if (item.classList.contains('fa-edit') || item.id === 'edit') {
        const todoLiElem = item.closest('li');
        todoInputElem.value = todoLiElem.textContent.trim();
        todoLiElem.remove();
        editItemFromLocalStorage(item);
    }
}

function itemComplete(item) {
    if (item.classList.contains('fa-check') || item.id === 'check') {
        const crossItem = item.closest('li');
        crossItem.firstElementChild.classList.add('completed');
        crossItem.classList.add('rotateOutDownLeft');
        crossItem.addEventListener('transitionend', () => {
            crossItem.remove();
        })
        deleteDataFromLocalStorage(item);
    }
}

function displayDataFromLocalStorage() {
    const todoArray = JSON.parse(localStorage.getItem('todos'));
    for (const todo of todoArray) {
        displayTodoDOM(todo);
    }
}

function storeLocalStorage(todo) {
    let todoArray;
    if (localStorage.getItem('todos') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todos'));
    }
    todoArray.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoArray));
}

function deleteDataFromLocalStorage(item) {
    const todoArray = JSON.parse(localStorage.getItem('todos'));
    const todoLiElem = item.closest("li");
    const todoItemLeft = todoArray.filter(
        (todo) => todoLiElem.textContent.trim() !== todo);
    localStorage.setItem('todos', JSON.stringify(todoItemLeft));
}

function editItemFromLocalStorage(item) {
    deleteDataFromLocalStorage(item);
}

document.addEventListener('DOMContentLoaded', displayDataFromLocalStorage);

todoListContainer.addEventListener('click', (e) => {
    itemToDelete(e.target);
    itemToEdit(e.target);
    itemComplete(e.target);
})


formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputTodo = todoInputElem.value;
    if (!inputTodo) {
        alert('Пожалуйста, заполните поле ввода');
    } else {
        displayTodoDOM(inputTodo);
        storeLocalStorage(inputTodo);
    }

    formElem.reset();
});