// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("You need to log in first!");
  window.location.href = "login.html";
}

// Display the logged-in user's name
document.getElementById("currentUserName").textContent = currentUser.fullName;

// Define a key for storing user-specific todos
const userTodosKey = `todos_${currentUser.email}`;

// Fetch todos for the current user
let todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];
let editIndex = -1;

// Save todos to localStorage for the current user
function saveTodos() {
  localStorage.setItem(userTodosKey, JSON.stringify(todos));
}

// Render todos in the list
function renderTodos() {
  const todoList = document.getElementById("todoList");
  const notFound = document.getElementById("notFound");

  todoList.innerHTML = ""; // Clear existing list

  if (todos.length === 0) {
    notFound.style.display = "block";
  } else {
    notFound.style.display = "none";
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) li.classList.add("completed");

    const todoText = document.createElement("span");
    todoText.textContent = `${todo.text} (${todo.date})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = () => deleteTodo(index);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa fa-pen"></i>';
    editBtn.onclick = () => editTodo(index);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleTodoCompleted(index);
    checkbox.classList.add("select-checkbox");

    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    todoList.appendChild(li);
  });
}

// Add new todo
function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value.trim();

  if (!todoText) {
    alert("Please enter a valid todo item.");
    return;
  }

  const currentDate = new Date().toLocaleString();

  if (editIndex === -1) {
    // Add new todo
    todos.push({
      text: todoText,
      completed: false,
      date: currentDate,
    });
  } else {
    // Update existing todo
    todos[editIndex].text = todoText;
    todos[editIndex].date = currentDate;
    editIndex = -1;
    document.getElementById("addBtn").style.display = "inline";
    document.getElementById("updateBtn").style.display = "none";
  }

  saveTodos();
  renderTodos();
  todoInput.value = ""; // Clear input field
}

// Toggle todo completion
function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Deletes a todo after confirmation
function deleteTodo(index) {
  if (confirm("Are you sure you want to delete this todo?")) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }
}

// Loads a todo's text into the input field for editing
function editTodo(index) {
  const todoInput = document.getElementById("todoInput");
  todoInput.value = todos[index].text;
  editIndex = index;

  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline";
}

// Delete selected todos
function deleteSelectedTodos() {
  const selectedCheckboxes = document.querySelectorAll(".select-checkbox:checked");

  if (selectedCheckboxes.length < 2) {
    alert("Please select at least 2 items to delete.");
    return;
  }

  if (confirm("Are you sure you want to delete the selected items?")) {
    const selectedIndices = Array.from(selectedCheckboxes).map((checkbox) => {
      const li = checkbox.parentElement;
      return Array.from(todoList.children).indexOf(li);
    });

    todos = todos.filter((_, index) => !selectedIndices.includes(index));
    saveTodos();
    renderTodos();

    alert("Selected items deleted successfully.");
  }
}

// Event listeners
document.getElementById("addBtn").addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});
document.getElementById("updateBtn").addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

// Add the delete selected items button
const deleteSelectedBtn = document.createElement("button");
deleteSelectedBtn.textContent = "Delete Selected Items";
deleteSelectedBtn.classList.add("btn", "btn-danger", "mt-3", "text-align-center");
deleteSelectedBtn.onclick = deleteSelectedTodos;

// Append the button below the todo list
document.querySelector(".todo-app").appendChild(deleteSelectedBtn);

// Initialize the todo list
renderTodos();

// Update Greeting Based on Time
function getGreetingMessage() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) return "Good Morning";
  if (hours >= 12 && hours < 17) return "Good Afternoon";
  if (hours >= 17 && hours < 21) return "Good Evening";
  return "Good Night";
}

function displayGreeting() {
  const greetingElement = document.getElementById("greetingMessage");
  greetingElement.textContent = `${getGreetingMessage()}, ${currentUser.fullName}!`;
}

// Update Clock
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Correct angles for each hand
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;

  // Apply transformations to clock hands
  document.getElementById("second").style.transform = `rotate(${secondAngle}deg)`;
  document.getElementById("minute").style.transform = `rotate(${minuteAngle}deg)`;
  document.getElementById("hour").style.transform = `rotate(${hourAngle}deg)`;

  // Update the greeting message at the start of a new hour
  if (seconds === 0 && minutes === 0) displayGreeting();
}
// Run Clock and Greeting
setInterval(updateClock, 1000);
updateClock();
displayGreeting();
 