document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const addBtn = document.getElementById("add");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage on page load
    loadTasks();

    addBtn.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <input type="checkbox" class="complete">
            `;

            li.querySelector(".edit").addEventListener("click", editTask);
            li.querySelector(".delete").addEventListener("click", deleteTask);
            li.querySelector(".complete").addEventListener("change", markComplete);

            taskList.appendChild(li);
            taskInput.value = "";

            // Save tasks to local storage
            saveTasks();
        }
    }

    function markComplete() {
        const li = this.parentNode;
        li.classList.toggle("completed");

        // Save tasks to local storage
        saveTasks();
    }


    function editTask() {
        const li = this.parentNode;
        const taskText = li.querySelector("span").textContent;
        const newTaskText = prompt("Edit task:", taskText);

        if (newTaskText !== null) {
            li.querySelector("span").textContent = newTaskText;

            // Save tasks to local storage
            saveTasks();
        }
    }

    function deleteTask() {
        const li = this.parentNode;
        taskList.removeChild(li);

        // Save tasks to local storage
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map((li) => ({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed"),
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <input type="checkbox" class="complete">
            `;

            if (task.completed) {
                li.classList.add("completed");
                li.querySelector(".complete").checked = true;
            }

            li.querySelector(".edit").addEventListener("click", editTask);
            li.querySelector(".delete").addEventListener("click", deleteTask);
            li.querySelector(".complete").addEventListener("change", markComplete);

            taskList.appendChild(li);
        });
    }
});
