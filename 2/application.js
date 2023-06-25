import axios from 'axios';

const routes = {
    tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
    const form = document.querySelector('form');
    const formInput = form.querySelector('input');
    const taskList = document.getElementById('tasks');

    const response = await axios.get(routes.tasksPath());
    
    if (response) {
        for (let item of response.data.items) {
            const task = document.createElement('li');
            task.innerHTML = item.name;
            task.classList.add('list-group-item');
            taskList.append(task);
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newTaskName = formInput.value;
        if (newTaskName !== undefined) {
            form.reset();
            const newTask = document.createElement('li');
            newTask.innerHTML = newTaskName;
            newTask.classList.add('list-group-item');
            taskList.prepend(newTask);
            await axios.post(routes.tasksPath(), { name: newTaskName })
        }
        
    })
}
// END