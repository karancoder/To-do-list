// Variables & Constants

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event bindings
todoButton.addEventListener("click", addTodo);

// Event handlers

function addTodo(event) {
    event.preventDefault();
    console.log("hello");
    createTodo();
}

// Helper functions

function createTodo() {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = "Hello";
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    todoList.appendChild(todoDiv);
}
