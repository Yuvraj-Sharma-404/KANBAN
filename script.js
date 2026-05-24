const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    dragElement = task;
  });
});

function addDragEventsOnColumn(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
  });
}

/* Modal related logic */
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".bg");
const modal = document.querySelector(".modal");
const remove = document.querySelector(".remove");

toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

remove.addEventListener("click", () => {
  modal.classList.remove("active");
});
/* Modal related logic */

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
