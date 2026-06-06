let tasksData = {};
let isDraggingTask = false;
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;

/* ---------- Helper Functions ---------- */

function saveTasks() {
  [todo, progress, done].forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(tasks).map((t) => ({
      title: t.querySelector("h2").innerText,
      desc: t.querySelector("p").innerText,
    }));

    if (count) {
      count.innerText = tasks.length;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function attachDeleteEvent(div) {
  const deleteButton = div.querySelector("button");

  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();

    div.remove();

    saveTasks();
  });
}

function attachDragEvent(div) {
  div.setAttribute("draggable", "true");

  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
    window.currentDraggedTask = div;
    isDraggingTask = true;
  });

  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
    window.currentDraggedTask = null;
    isDraggingTask = false;
  });

  const deleteButton = div.querySelector("button");

  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    div.remove();
    saveTasks();
  });
}

/* ---------- Load Tasks ---------- */

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));

  for (const col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach((task) => {
      const div = document.createElement("div");

      div.classList.add("task");
      div.setAttribute("draggable", "true");

      div.innerHTML = ` 
        <h2>${task.title}</h2>
        <p>${task.desc}</p>
        <button>Delete</button>`;

      attachDragEvent(div);
      attachDeleteEvent(div);

      column.appendChild(div);
    });
  }

  saveTasks();
}

/* ---------- Drag & Drop ---------- */

function addDragEventsOnColumn(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();

    if (isDraggingTask) {
      column.classList.add("hover-over");
    }
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    column.classList.remove("hover-over");

    if (window.currentDraggedTask) {
      column.appendChild(window.currentDraggedTask);
    }

    saveTasks();
  });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

/* ---------- Modal Logic ---------- */

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".bg");
const modal = document.querySelector(".modal");
const remove = document.querySelector(".remove");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

remove.addEventListener("click", () => {
  modal.classList.remove("active");
});

/* ---------- Add Task ---------- */

addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDesc = document.querySelector("#task-desc-input").value;
  console.log("add task Clicked");
  if (!taskTitle.trim()) return;

  const div = document.createElement("div");

  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button>Delete</button>`;

  attachDragEvent(div);
  attachDeleteEvent(div);

  todo.appendChild(div);
  console.log(div);

  saveTasks();

  document.querySelector("#task-title-input").value = "";
  document.querySelector("#task-desc-input").value = "";

  modal.classList.remove("active");
});
