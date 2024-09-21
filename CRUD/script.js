
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskList = document.getElementById('taskList');
const taskButton = document.getElementById('taskButton');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editMode = false;
let taskToEditId = null;

function displayTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask(title, description) {
    tasks.push({ title, description });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    editMode = true;
    taskToEditId = index;
    taskTitleInput.value = tasks[index].title;
    taskDescriptionInput.value = tasks[index].description;
    taskButton.textContent = 'Update Task';
}

function updateTask(title, description) {
    tasks[taskToEditId] = { title, description };
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    resetForm();
}

function resetForm() {
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    taskButton.textContent = 'Add Task';
    editMode = false;
    taskToEditId = null;
}
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;

    if (editMode) {
        updateTask(title, description);
    } else {
        addTask(title, description);
    }

    resetForm();
});

displayTasks();