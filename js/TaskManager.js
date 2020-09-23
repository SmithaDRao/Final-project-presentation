
const createTaskHtml = (id, name, description, assignedTo, dueDate, status)=>`
<div class="row">
      <div class="col sm-3">
        <div class="card bg-info" style="width: 18rem;>
          <div class="card-body" "list-group-item" data-task-id=${id}>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="card-title text-white">${name}</h4>
              <!-- <div class="btn btn-primary">Todo</div> -->
              <button class="btn btn-light text-warning ${status === 'TODO' ? 'button-danger' : 'button-success'}">${status}</button>
            </div>
            <div>

              <p class="card-text bg-light">Assigned To: ${assignedTo}</p>
              <p class="card-text bg-light"> Due: ${dueDate}</p>
              <p class="bg-light">${description}</p>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-light text-success done-button ${status === 'TODO' ? 'visible' : 'invisible'}">done</button>

          </div>
        </div>
      </div>
    </div>            
   

  
    `




class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'TODO'
        };

        this.tasks.push(task);
    }

    getTaskById(taskId) {
        // Create a variable to store the found task
        let foundTask;

        // Loop over the tasks and find the task with the id passed as a parameter
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }

        // Return the found task
        return foundTask;
    }

    render() {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            // Pass the task id as a parameter
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);

            //tasksHtmlList.push(taskHtml);
            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('');

        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;
    }
}
