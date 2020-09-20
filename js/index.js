

// const formtask = document.querySelector('#form-task');
// const formtaskText = document.querySelector('#form-task-text');
// const taskList = document.querySelector('#task-list');

// formtask.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const newtask = document.createElement('li');
//     newtask.innerText = formtaskText.value 
//     newtask.classList.add('task', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
//     //newtask.className = "task list-group-item d-flex justify-content-between align-items-center"
//     taskList.appendChild(newtask);  

//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("x");
//     span.className = "remove-task badge badge-danger";
//     span.appendChild(txt);
//     newtask.appendChild(span);
    
// });



// //const taskList2 = document.querySelector('#task-list-2');

// taskList.addEventListener('click', (event) => {
//     if (event.target.classList.contains('remove-task')) {
//         event.preventDefault();
//         const parentLi = event.target.parentElement;
//         taskList.removeChild(parentLi);
//     }
// });

const taskManager = new TaskManager(0);
console.log("hi");

const newTaskForm = document.querySelector('#newTaskForm');

newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');


    
    /*
        Validation code here
    */

    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;

    taskManager.addTask(name, description, assignedTo, dueDate);
    console.log("task added");  

    taskManager.render();

    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
});

// Select the Tasks List
const tasksList = document.querySelector('#tasksList');

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener('click', (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains('done-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        task.status = 'DONE';

        // Render the tasks
        taskManager.render();
    }
});
