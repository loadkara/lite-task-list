
function clearInput(inputElement){
    inputElement.value = "";
}

function isValid(text){
    if (text.trim()!==""){
        return true;
    }
    return false;
}
function createTaskElement(task){
    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.dataset.id = task.id;
    checkbox.classList.add("task-checkbox");
    

    let delButton = document.createElement("button");
    delButton.textContent = "Удалить";
    delButton.classList.add("delete-btn");
    delButton.dataset.id = task.id;
    li.prepend(checkbox);
    li.appendChild(delButton)
    return li;
}

function addTask() {
    let text = taskInput.value;
    if (isValid(text)){
        tasks.push({
            id:Date.now(), 
            text: text,
            done:false
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        counter++;
        localStorage.setItem("counter", counter);
    }

    renderTasks();
}

function deleteTask(event){
    
    for (let index = 0; index<tasks.length; index++ )
    {
        if(tasks[index].id == event.target.dataset.id){
            tasks.splice(index,1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            counter--;
            localStorage.setItem("counter", counter);
        }
    }
    renderTasks();
}

function renderTasks(){
    ol.replaceChildren();
    for (let task of tasks)
    {
        let li = createTaskElement(task);
        ol.appendChild(li);
    }
    taskCount.textContent = `Создано задач ${counter}`;
    clearInput(taskInput);
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {id:1, text: "Стать frontend разработчиком", done: false},
    {id:2, text: "Начать изучение JS", done: true}
];


let taskInput = document.querySelector("#task-input");
let addButton = document.querySelector("#add-task");
let ol = document.querySelector("#task-list");
let clear = document.querySelector("#clear-all")
let counter = Number(localStorage.getItem("counter")) || 2;
let taskCount = document.querySelector("#task-count")

renderTasks();
addButton.addEventListener("click", addTask);
ol.addEventListener("click", function(event) {
  if (event.target.classList.contains("task-checkbox")) {
    const id = event.target.dataset.id;
    const task = tasks.find(t => t.id == id);
    if (task) {
      task.done = event.target.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }
  else if (event.target.classList.contains("delete-btn"))
    {
        deleteTask(event);
    }
});

clear.addEventListener("click",function(){
    tasks = [];
    localStorage.clear();
    counter = 0;
    localStorage.setItem("counter", counter);
    renderTasks();
});