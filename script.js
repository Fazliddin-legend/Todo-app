let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let filter = "all"

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function setFilter(type){
filter = type
renderTasks()
}

function updateProgress(){

let completed = tasks.filter(t=>t.completed).length
let total = tasks.length

document.getElementById("progressText").innerText =
`${completed} / ${total} Completed`

let percent = total===0 ? 0 : (completed/total)*100

document.getElementById("progress").style.width = percent+"%"

}

function renderTasks(){

const list = document.getElementById("taskList")
list.innerHTML=""

let filtered = tasks

if(filter==="active"){
filtered = tasks.filter(t=>!t.completed)
}

if(filter==="completed"){
filtered = tasks.filter(t=>t.completed)
}

filtered.forEach((task,index)=>{

const realIndex = tasks.indexOf(task)

const li = document.createElement("li")

li.draggable=true

if(task.completed){
li.classList.add("completed")
}

li.innerHTML=`
<span onclick="toggleComplete(${realIndex})">
${task.text} (${task.priority})
</span>

<div>

<button onclick="editTask(${realIndex})">
Edit
</button>

<button class="delete-btn" onclick="deleteTask(${realIndex})">
Delete
</button>

</div>
`

list.appendChild(li)

})

updateProgress()

}

function addTask(){

const input = document.getElementById("taskInput")
const priority = document.getElementById("priority").value

const text = input.value.trim()

if(text==="") return

tasks.push({
text:text,
priority:priority,
completed:false
})

input.value=""

saveTasks()
renderTasks()

}

function deleteTask(index){

tasks.splice(index,1)

saveTasks()
renderTasks()

}

function editTask(index){

const newText = prompt("Edit task:",tasks[index].text)

if(newText===null || newText.trim()==="") return

tasks[index].text=newText.trim()

saveTasks()
renderTasks()

}

function toggleComplete(index){

tasks[index].completed=!tasks[index].completed

saveTasks()
renderTasks()

}

function toggleDark(){

document.body.classList.toggle("dark")

}

renderTasks()
const input = document.getElementById("taskInput")

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask()
    }
})