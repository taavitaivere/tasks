
const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const taskList =document.querySelector(".collection");
const delTasksBtn = document.querySelector("#del-tasks");

form.addEventListener("submit", addTask)
taskList.addEventListener("click", deleteTask);
delTasksBtn.addEventListener("click", deleteTasks);

function deleteTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

}


function deleteTask(e){
    if(e.target.textContent =="x")
        if(confirm("Do You want to delete this task?")){
            console.log(e.target.parentElement.remove())
        }
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
    console.log(tasks);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}