document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const filterInput = document.getElementById('filter');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        const date = dateInput.value;

        if (task && date) {
            todos.push({ task, date, status: "Pending" });
            renderTodos();
            todoForm.reset();
        }
    });

    // Render Table
    function renderTodos(filtered = todos) {
        todoList.innerHTML = '';

        if (filtered.length === 0) {
            todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
            return;
        }

        filtered.forEach((todo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.date}</td>
                <td>${todo.status}</td>
                <td>
                    <button class="action-btn" data-index="${index}">Delete</button>
                </td>
            `;
            todoList.appendChild(row);
        });
    }

    // Delete Task
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const index = e.target.dataset.index;
            todos.splice(index, 1);
            renderTodos();
        }
    });

    // Filter Tasks
    filterInput.addEventListener('input', () => {
        const keyword = filterInput.value.toLowerCase();
        const filtered = todos.filter(todo =>
            todo.task.toLowerCase().includes(keyword)
        );
        renderTodos(filtered);
    });
});
