const { json } = require("sequelize");

const updateTaskFormHandler = async (event) => {
    Event.preventDefault();

    const taskname = document.querySelector('#task-name').value.trim();
    const taskdetails = document.querySelector('task-details').value.trim();

    if(taskname && taskdetails){
        const taskId = window.location.pathname.split('/').pop();
        const response = await fetch (`/api/tasks/${taskId}`,{
            method: 'put', 
            body: JSON.stringify({taskname, taskdetails}),
            headers: {'content-type': 'applicaiton/json'},
        });

        if (response.ok){
            document.location.replace("/");
        }
        else{
            alert("failed to update task");
        }
   
    }
};

document.querySelector('#update-task-form').addEventListener('submit', createTaskFormHandler);