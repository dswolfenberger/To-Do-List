var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");
var toggleButton=document.getElementById("toggle-button");

var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    
        label.innerText=taskString;

checkBox.type="checkbox";
editInput.type="text";

editButton.innerText="Edit";
editButton.className="edit";
deleteButton.innerText="Delete";
deleteButton.className="delete";

listItem.appendChild(checkBox);
listItem.appendChild(label);
listItem.appendChild(editInput);
listItem.appendChild(editButton);
listItem.appendChild(deleteButton);
return listItem;
}

//Custom fix for blank task being added to the to do list, code by Devin Wolfenberger - https://github.com/dswolfenberger
var addTask = function() {
 console.log("Add Task...");
 if (taskInput.value.trim() !== '') {
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
 }
};


var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
    if(containsClass){
        label.innerText=editInput.value;
    } else {
        editInput.value=label.innerText;
    }

    listItem.classList.toggle("editMode");
}

var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

}

var taskCompleted=function(){
    console.log("Completed Task...")

    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    console.log("Incomplete Task...")

    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete")

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}
//Custom fix for listed tasks to be saved, code by Devin Wolfenberger - https://github.com/dswolfenberger

//1. Store the to-do list in local storage
var saveTasks=function() {
    var tasks=[];
    for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
      tasks.push(incompleteTaskHolder.children[i].getElementsByTagName("label")[0].innerText);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
// 2. Retrieve the to-do list from local storage
  var loadTasks=function() {
    var tasks=JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      for (var i = 0; i < tasks.length; i++) {
        var listItem=createNewTaskElement(tasks[i]);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
      }
    }
  }; 
  
// 3. Added event listeners to save and load the to-do list
  addButton.addEventListener("click", function() {
    addTask();
    saveTasks();
  });
  window.addEventListener("load", loadTasks);
  
//Dark mode toggle - code by Devin Wolfenberger - https://github.com/dswolfenberger
// Add event listener to toggle button
toggleButton.addEventListener("click", function() {
  // Toggle dark mode
  var currentMode = toggleButton.dataset.mode;
  if (currentMode === "light") {
    toggleButton.dataset.mode = "dark";
    document.body.classList.add("dark-mode");
    localStorage.setItem("mode", "dark");
  } else {
    toggleButton.dataset.mode = "light";
    document.body.classList.remove("dark-mode");
    localStorage.setItem("mode", "light");
  }
});

window.addEventListener("load", function() {
  // Load dark mode setting
  var currentMode = localStorage.getItem("mode");
  if (currentMode === "dark") {
    toggleButton.dataset.mode = "dark";
    document.body.classList.add("dark-mode");
  } else {
    toggleButton.dataset.mode = "light";
    document.body.classList.remove("dark-mode");
  }
  // Load tasks
  loadTasks();
});



for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}