// Variables & Constants

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");

// Event bindings
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheckTodo);
filterOption.addEventListener("change", filterTodo);

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
        checkTodoUsingBtn(item);
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    filterTodoUsingTargetClass(todos, event.target.value);
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

function checkTodoUsingBtn(item) {
    const todo = item.parentElement;
    todo.classList.toggle("checked");
}

function filterTodoUsingTargetClass(todos, targetClass) {
    todos.forEach((todo) => {
        setTodoDisplayBasedOnTargetFilterClass(targetClass, todo);
    });
}

function setTodoDisplayBasedOnTargetFilterClass(targetClass, todo) {
    switch (targetClass) {
        case "all":
            setDisplayIfFilterAll(todo);
            break;
        case "checked":
            setDisplayIfFilterChecked(todo);
            break;
        case "unchecked":
            setDisplayIfFilterUnchecked(todo);
            break;
    }
}

function setDisplayIfFilterAll(todo) {
    todo.style.display = "flex";
}

function setDisplayIfFilterChecked(todo) {
    if (todo.classList.contains("checked")) {
        todo.style.display = "flex";
    } else {
        todo.style.display = "none";
    }
}

function setDisplayIfFilterUnchecked(todo) {
    if (!todo.classList.contains("checked")) {
        todo.style.display = "flex";
    } else {
        todo.style.display = "none";
    }
}
