import uniqueId from 'lodash/uniqueId.js';

// BEGIN

export default () => {
  const id = uniqueId();
  const data = {
    current: id,
    lists:[{ id: id, name: 'General' }],
    tasks: [],
  };

  const showTaskList = (data, elements) => {
    elements.tasksContainer.innerHTML = '';
  
    const filteredTasks = data.tasks.filter(({ listId }) => listId === data.current);
  
    if (filteredTasks.length === 0) {
      return;
    }
  
    const ul = document.createElement('ul');
  
    filteredTasks.forEach(({ name }) => {
      const li = document.createElement('li');
      li.textContent = name;
      ul.append(li);
    });
  
    elements.tasksContainer.append(ul);
  };
  
  const showListOfLists = (data, elements) => {
    elements.listsContainer.innerHTML = '';
    const ul = document.createElement('ul');
  
    data.lists.forEach(({ id, name }) => {
      const li = document.createElement('li');
      let newElement;
  
      if (id === data.current) {
        newElement = document.createElement('b');
        newElement.textContent = name;
      } else {
        newElement = document.createElement('a');
        newElement.setAttribute('href', `#${name.toLowerCase()}`);
        newElement.textContent = name;
        newElement.addEventListener('click', (e) => {
          e.preventDefault();
          data.current = id;
          showListOfLists(data, elements);
          showTaskList(data, elements);
        });
      }
  
      li.append(newElement);
      ul.append(li);
    });
  
    elements.listsContainer.append(ul);
  };




  const elements = {
    listsContainer: document.querySelector('[data-container="lists"]'),
    tasksContainer: document.querySelector('[data-container="tasks"]'),
  };

  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const listName = formData.get('name');
    const list = { id: uniqueId(), name: listName.trim() };
    form.reset();
    form.focus();

    let flag = true;
    for (let item of data.lists) {
      if (item.name === listName) {
        flag = false;
      }
    }
    if (flag) {
      data.lists.push(list);
    } 
    
    console.log(data.lists)
    showListOfLists(data, elements);
  });

  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const taskName = formData.get('name');
    const task = { id: uniqueId(), name: taskName.trim(), listId: data.current };
    form.reset();
    form.focus();
    data.tasks.push(task);
    showTaskList(data, elements);
  });

  showListOfLists(data, elements);
  showTaskList(data, elements);
};

// END