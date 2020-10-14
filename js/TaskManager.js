
const createTaskHtml = (id, name, description, assignedTo, dueDate, status)=>`
  
  <div class="row">
      <div class="col sm-3">
        <div class="card text-center ${status === 'TODO' ? 'text-danger' : 'text-success'}" style="width: 18rem;>
        
          <div class="card-body" "list-group-item" data-task-id=${id}>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="card-title">${name}</h4>
            
              <button class="btn btn-light text-danger btn btn-outline-danger  ${status === 'TODO' ? 'button-danger' : 'button-success'}">${status}</button>
              
              
            </div>
            <div>

              <p class="card-text bg-light">Assigned To <i class="fas fa-user"></i>: ${assignedTo}</p>
              <p class="card-text bg-light"> Due<i class="fas fa-date"></i>: ${dueDate}</p>
              <p class="card-text bg-light"><i class="fas fa-file"></i>:${description}</p>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-light text-success done-button btn-outline-success  ${status === 'TODO' ? 'visible' : 'invisible'}">Done <i class="fas fa-thumbs-up"></i></button>
                <button class="btn btn-light btn-outline-danger delete-button"><i class="fas fa-trash"></i></button>

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
   // Create a method on the class addTask and set status to TODO 
      addTask(name, description, assignedTo, dueDate) {
          const task = {
              id: this.currentId++,
              name: name,
              description: description,
              assignedTo: assignedTo,
              dueDate: dueDate,
              status: 'TODO'
          };
    // push new task to this.task
          this.tasks.push(task);
      }
  
      // Create the deleteTask method
      deleteTask(taskId) {
      // Create an empty array and store it in a new variable, newTasks
          const newTasks = [];
  
          // Loop over the tasks
          for (let i = 0; i < this.tasks.length; i++) {
              // Get the current task in the loop
              const task = this.tasks[i];
  
              // Check if the task id is not the task id passed in as a parameter
              if (task.id !== taskId) {
                  // Push the task to the newTasks array
                  newTasks.push(task);
              }
          }
  
          // Set this.tasks to newTasks
          this.tasks = newTasks;
      }
            // Add a new method, getTaskById(), it should accept a taskId as a parameter.
          getTaskById(taskId) {
            // In the getTaskById() method, create a foundTask variable to store the found task.
          let foundTask;
            // Loop over the this.tasks array, for each task in the loop
          for (let i = 0; i < this.tasks.length; i++) {
            // Store the current task in a variable called task
              const task = this.tasks[i];
            // Compare task.id to the passed in taskId, if its a match, store the task to the variable foundTask
              if (task.id === taskId) {
                  foundTask = task;
              }
          }
        //   After the loop, return the foundTask variable from the method.
          return foundTask;
      }
  
      render() {
          const tasksHtmlList = [];
  
          for (let i = 0; i < this.tasks.length; i++) {
              const task = this.tasks[i];
  
              const date = new Date(task.dueDate);
              const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  
              const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
  
              tasksHtmlList.push(taskHtml);
          }
  
          const tasksHtml = tasksHtmlList.join('\n');
  
          const tasksList = document.querySelector('#tasksList');
          tasksList.innerHTML = tasksHtml;
      }
  
      save() {
          const tasksJson = JSON.stringify(this.tasks);
  
          localStorage.setItem('tasks', tasksJson);
  
          const currentId = String(this.currentId);
  
          localStorage.setItem('currentId', currentId);
      }
  
      load() {
          if (localStorage.getItem('tasks')) {
              const tasksJson = localStorage.getItem('tasks');
  
              this.tasks = JSON.parse(tasksJson);
          }
  
          if (localStorage.getItem('currentId')) {
              const currentId = localStorage.getItem('currentId');
  
              this.currentId = Number(currentId);
          }
      }
      
  }
  
