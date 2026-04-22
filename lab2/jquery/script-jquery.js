$(document).ready(function() {

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
        const $taskList = $('#task-list');
        $taskList.empty();
        
        $.each(tasks, function(index, task) {
            const $taskItem = createTaskElement(task, index);
            $taskList.append($taskItem);
        });
    }

    function createTaskElement(task, index) {
        const $li = $(`
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${index}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="edit-btn" title="Переименовать">✏</button>
                <button class="delete-btn" title="Удалить">❌</button>
            </li>
        `);

        $li.find('.task-checkbox').on('click', function(e) {
            e.stopPropagation();
        });

        $li.find('.edit-btn').on('click', function(e) {
            e.stopPropagation(); 
            renameTask(index);
        });

        $li.find('.delete-btn').on('click', function(e) {
            e.stopPropagation();
            deleteTask(index);
        });
        
        return $li;
    }

    function escapeHtml(text) {
        return $('<div>').text(text).html();
    }

    window.addTask = function() {
        const $input = $('#task-input');
        const text = $input.val().trim();
        
        if (text === '') {
            alert('Введите текст задачи!');
            return;
        }
        
        tasks.push({
            text: text,
            completed: false
        });
        
        $input.val('');
        saveTasks();
        renderTasks();
    };

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
    
    $('#task-input').on('keypress', function(e) {
        if (e.which === 13) {
            addTask();
        }
    });
    

    $('#add-btn').on('click', addTask);
    

    loadTasks();
});