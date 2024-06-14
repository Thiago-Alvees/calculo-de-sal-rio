document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable');
    const totalTimeElement = document.getElementById('totalTime');
    const totalAmountElement = document.getElementById('totalAmount');
    const clearTasksButton = document.getElementById('clearTasks');

    const paymentRatePerHour = 6.20;
    let tasks = []; // Array para armazenar as tarefas

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskTimeInput = document.getElementById('taskTime');
        const taskTime = parseFloat(taskTimeInput.value);

        if (!isNaN(taskTime) && taskTime > 0) {
            addTask(taskTime);
            taskTimeInput.value = '';
        } else {
            alert('Por favor, insira um tempo válido em minutos.');
        }
    });

    clearTasksButton.addEventListener('click', function () {
        if (confirm('Tem certeza que deseja limpar todas as tarefas?')) {
            clearTasks();
        }
    });

    function addTask(taskTime) {
        const task = {
            id: tasks.length + 1,
            time: taskTime
        };
        tasks.push(task);

        const rowIndex = taskTable.rows.length + 1;
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-task-id', task.id); // Atributo para identificar a linha da tabela
        newRow.innerHTML = `
            <td>Tarefa ${rowIndex}</td>
            <td>${task.time}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        taskTable.appendChild(newRow);

        updateTotals();
    }

    function updateTotals() {
        let totalTime = 0;
        tasks.forEach(task => {
            totalTime += task.time;
        });

        const totalHours = totalTime / 60;
        const totalAmount = totalHours * paymentRatePerHour;

        totalTimeElement.textContent = totalTime;
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }

    function clearTasks() {
        taskTable.innerHTML = '';
        tasks = [];
        totalTimeElement.textContent = '0';
        totalAmountElement.textContent = '0.00';
    }

    window.deleteTask = function (taskId) {
        tasks = tasks.filter(task => task.id !== taskId); // Remove a tarefa da lista
        const row = taskTable.querySelector(`tr[data-task-id="${taskId}"]`);
        row.remove();
        updateTotals();
    }
});
