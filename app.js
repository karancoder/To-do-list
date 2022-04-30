// Variables & Constants

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".todo-filter");

// Event bindings
document.addEventListener("DOMContentLoaded", updateFromLocalTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheckTodo);
filterOption.addEventListener("change", filterTodo);

// Event handlers

function addTodo(event) {
    event.preventDefault();
    saveLocalTodo(todoInput.value, "unchecked");
    addTodoDiv(todoInput.value, "unchecked");
    resetInputValue();
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

function resetInputValue() {
    todoInput.value = "";
}

function toggleCheckUncheck(currState) {
    if (currState === "checked") {
        return "unchecked";
    } else {
        return "checked";
    }
}

function addTodoDiv(value, todoState) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = createTodo(value);
    todoDiv.appendChild(newTodo);
    const checkTodoButton = createCheckTodoButton();
    todoDiv.appendChild(checkTodoButton);
    const trashTodoButton = createTrashTodoButton();
    todoDiv.appendChild(trashTodoButton);
    updateTodoDivUsingState(todoDiv, todoState);
    todoList.appendChild(todoDiv);
}

function updateTodoDivUsingState(todoDiv, todoState) {
    if (todoState === "checked") {
        todoDiv.classList.add("checked");
    } else {
        todoDiv.classList.remove("checked");
    }
}

function createTodo(value) {
    const newTodo = document.createElement("li");
    newTodo.innerText = value;
    newTodo.classList.add("todo-item");
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
    removeFromLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
        todo.remove();
    });
}

function checkTodoUsingBtn(item) {
    let todos = getLocalTodos();
    const todo = item.parentElement;
    const todoValue = todo.children[0].innerText;
    todos[todoValue] = toggleCheckUncheck(todos[todoValue]);
    localStorage.setItem("todos", JSON.stringify(todos));
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

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = {};
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function saveLocalTodo(todo, todoState) {
    let todos = getLocalTodos();
    todos[todo] = todoState;
    saveTodosToLocalStorage(todos);
}

function updateFromLocalTodo() {
    let todos = getLocalTodos();
    Object.keys(todos).forEach((todo) => addTodoDiv(todo, todos[todo]));
}

function removeFromLocalTodo(todo) {
    let todos = getLocalTodos();
    let todoText = todo.children[0].innerText;
    delete todos[todoText];
    saveTodosToLocalStorage(todos);
}

function saveTodosToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearLocalStorage() {
    localStorage.clear();
}
