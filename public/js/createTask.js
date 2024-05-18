
document.getElementById('create-task-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('task-name').value.trim();
    const details = document.getElementById('task-details').value.trim();

    if(name){
        const response = await fetch ('/create-task/save',{
            method: 'POST', 
            body: JSON.stringify({name, details}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok){
            document.location.replace("/");
        }
        else{
            alert("failed to create task");
        }
   
    }
});
