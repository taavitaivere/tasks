
const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const taskList =document.querySelector(".collection");
const delTasksBtn = document.querySelector("#del-tasks");

form.addEventListener("submit", addTask)
taskList.addEventListener("click", deleteTask);
delTasksBtn.addEventListener("click", deleteTasks);
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function getTasksFromLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (tasksElement){
        const li = document.createElement("li");
        //define <li> css class
        li.className = "collection-item";
        //create text value for <li>
        const text = document.createTextNode(tasksElement);
        // add text value for <li>
        li.appendChild(text);
        //create link element
        const link = document.createElement("a");
        //set href attribute
        link.setAttribute("href","#")
        //add css style
        link.className = "secondary-content";
        //add x to link
        link.appendChild(document.createTextNode("x"));
        //add link to <li>
        li.appendChild(link)
        // find <ul> DOM component
        const ul = document.querySelector(".collection");
        //add <li> to <ul>
        ul.appendChild(li);
    });
}
function deleteTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    deleteAllTaskFromLocalStorage();

}
//kustutamine kõik
function deleteAllTaskFromLocalStorage(){
    //localStorage.clear();
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    localStorage.removeItem("tasks");
}

function deleteTask(e) {
    if (e.target.textContent == "x"){
        if(confirm('Do you want to delete this task?')){
            e.target.parentElement.remove();
            task = e.target.parentElement.firstChild.textContent;
            deleteTaskFromLocalStorage(task);
        }
    }
}

//kustutamine ühekaupa
function deleteTaskFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (tasksElement, index){
        if(tasksElement === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTask(e) {
    //input value
    const task = taskInput.value;
    //create <li> element
    const li = document.createElement("li");
    //define <li> css class
    li.className = "collection-item";
    //create text value for <li>
    const text = document.createTextNode(task);
    // add text value for <li>
    li.appendChild(text);
    //create link element
    const link = document.createElement("a");
    //set href attribute
    link.setAttribute("href","#")
    //add css style
    link.className = "secondary-content";
    //add x to link
    link.appendChild(document.createTextNode("x"));
    //add link to <li>
    li.appendChild(link)
    // find <ul> DOM component
    const ul = document.querySelector(".collection");
    //add <li> to <ul>
    ul.appendChild(li);
    //save task
    addTaskToLocalStorage(task);
    // clear input value


    taskInput.value = "";

    e.preventDefault();
}
function addTaskToLocalStorage(task){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}