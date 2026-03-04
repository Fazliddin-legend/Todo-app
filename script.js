let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let filter = "all"

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateCounter(){

document.getElementById("counter").innerText = "Tasks: " + tasks.length

let completed = tasks.filter(t => t.completed).length

let percent = 0

if(tasks.length > 0){
percent = (completed / tasks.length) * 100
}

document.getElementById("progressBar").style.width = percent + "%"

}

function renderTasks(){

let list = document.getElementById("taskList")
list.innerHTML=""

tasks.forEach((task,index)=>{

if(filter==="active" && task.completed) return
if(filter==="completed" && !task.completed) return

let li=document.createElement("li")

li.classList.add(task.priority)

if(task.completed){
li.classList.add("completed")
}

let span=document.createElement("span")
span.innerText = task.text

span.onclick=function(){
task.completed=!task.completed
saveTasks()
renderTasks()
}

let editBtn=document.createElement("button")
editBtn.innerText="Edit"

editBtn.onclick=function(){

let newText=prompt("Edit task",task.text)

if(newText){
task.text=newText
saveTasks()
renderTasks()
}

}

let deleteBtn=document.createElement("button")
deleteBtn.innerText="Delete"

deleteBtn.onclick=function(){
tasks.splice(index,1)
saveTasks()
renderTasks()
}

li.appendChild(span)
li.appendChild(editBtn)
li.appendChild(deleteBtn)

list.appendChild(li)

})

updateCounter()

}

function addTask(){

let text=document.getElementById("taskInput").value
let priority=document.getElementById("priority").value

if(text==="") return

tasks.push({
text:text,
priority:priority,
completed:false
})

saveTasks()
renderTasks()

document.getElementById("taskInput").value=""

}

function clearAll(){
tasks=[]
saveTasks()
renderTasks()
}

function filterTasks(type){
filter=type
renderTasks()
}

function toggleDark(){
document.body.classList.toggle("dark")
}

document.getElementById("taskInput").addEventListener("keypress",function(e){
if(e.key==="Enter"){
addTask()
}
})

renderTasks()