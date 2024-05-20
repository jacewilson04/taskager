document.getElementById('create-task-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('task-name').value.trim();
    const details = document.getElementById('task-details').value.trim();
    const date = document.getElementById('task-due').value;

    if (name && details && date) {
        const response = await fetch('/create-task/save', {
            method: 'POST',
            body: JSON.stringify({ name, details, date }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create task');
        }
    }
});