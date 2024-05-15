
const createTaskFormHandler = async (event) => {
    event.preventDefault();

    const taskname = document.querySelector('#task-name').value.trim();
    const taskdetails = document.querySelector('#task-details').value.trim();
    var body=JSON.stringify({taskname, taskdetails})
    console.log (body)

    if(taskname && taskdetails){
        const response = await fetch ('/api/tasks',{
            method: 'post', 
            body: JSON.stringify({taskname, taskdetails}),
            headers: {'content-type': 'applicaiton/json'},
        });

        if (response.ok){
            document.location.replace("/");
        }
        else{
            alert("failed to create task");
        }
   
    }
};

document.querySelector('#create-task-form').addEventListener('submit', createTaskFormHandler);