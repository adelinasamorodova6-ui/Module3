
let tasks = [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;
    
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = createTaskElement(task, index);
        taskList.appendChild(taskItem);
    });
}

function createTaskElement(task, index) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', index);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation(); 
        toggleTaskStatus(index);
    });

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    taskText.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '✏';
    editBtn.title = 'Переименовать';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        renameTask(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '❌';
    deleteBtn.title = 'Удалить';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        deleteTask(index);
    });
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}

function addTask() {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Введите текст задачи!');
        return;
    }
    
    tasks.push({
        text: text,
        completed: false
    });
    
    input.value = '';
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    if (confirm('Удалить задачу?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function renameTask(index) {
    const newText = prompt('Введите новое название задачи:', tasks[index].text);
    
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        addTask();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    
    const addBtn = document.getElementById('add-btn');
    const taskInput = document.getElementById('task-input');
    
    if (addBtn) {
        addBtn.addEventListener('click', addTask);
    }
    
    if (taskInput) {
        taskInput.addEventListener('keypress', handleKeyPress);
    }
});