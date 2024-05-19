const updateTaskFormHandler = async (event) =>{
    event.preventDefault();

    const taskname = document.querySelector('#task-name').value.trim();
    const taskdetails = document.querySelector('#task-details').value.trim();

    if(taskname && taskdetails){
        const taskId = window.location.pathname.split('/').pop();
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({taskname, taskdetails}),
            headers: {'Content-Type' : 'application/json'},
        });

        if (response.ok){
            document.location.replace("/");
        }
        else{
            alert("Failed to update task");
        }
    }
};

document.querySelector('#update-task-form').addEventListener('submit', updateTaskFormHandler);
