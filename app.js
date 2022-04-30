// Variables & Constants

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event bindings
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheckTodo);

// Event handlers

function addTodo(event) {
    event.preventDefault();
    addTodoDiv();
}

function deleteOrCheckTodo(event) {
    const item = event.target;
    if (item.classList[0] === "trash-btn") {
        deleteTodoUsingBtn(item);
    }
    if (item.classList[0] === "check-btn") {
        childTodoUsingBtn(item);
    }
}

// Helper functions

function addTodoDiv() {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = createTodo();
    todoDiv.appendChild(newTodo);
    const checkTodoButton = createCheckTodoButton();
    todoDiv.appendChild(checkTodoButton);
    const trashTodoButton = createTrashTodoButton();
    todoDiv.appendChild(trashTodoButton);
    todoList.appendChild(todoDiv);
}

function createTodo() {
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoInput.value = "";
    return newTodo;
}

function createCheckTodoButton() {
    const checkTodoButton = document.createElement("button");
    checkTodoButton.innerHTML = '<i class="fas fa-check"></i>';
    checkTodoButton.classList.add("check-btn");
    return checkTodoButton;
}

function createTrashTodoButton() {
    const trashTodoButton = document.createElement("button");
    trashTodoButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashTodoButton.classList.add("trash-btn");
    return trashTodoButton;
}

function deleteTodoUsingBtn(item) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
        todo.remove();
    });
}

function childTodoUsingBtn(item) {
    const todo = item.parentElement;
    todo.classList.toggle("checked");
}
