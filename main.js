const todo = document.getElementById('inputTodo');   //タスク
const add = document.getElementById('add'); //追加ボタン
const taskList = document.getElementById('taskList');

let listItem = [];
const storage = localStorage;

document.addEventListener("DOMContentLoaded", () => {
    const json = storage.store; 
    if (json === undefined) { 
      return;
    }
    listItem = JSON.parse(json);
  
    for (const item of listItem) { 
        controlItem(item);
    }
});

add.addEventListener('click', () => {
    if (todo.value.trim() == '') {
        window.alert('タスクを入力してください');
    } else {
        const item = {
            todoitem: todo.value,
            delConfirm: false,
        };
        listItem.push(item);
        storage.store = JSON.stringify(listItem);

        controlItem(item);
    }
});

const controlItem = (item) => {
    const taskContainer = document.createTextNode(todo.value);
    todo.value = '';
    const li = document.createElement('li');
    const p = document.createElement('p');

    p.appendChild(taskContainer);
    li.appendChild(p);
    taskList.appendChild(li);
    
    const delbtn = document.createElement('button');
    delbtn.innerHTML = "消去";
    delbtn.setAttribute('id', 'delbtn');
    li.appendChild(delbtn);

    const deleteTask = () => {
        const selectedTask = delbtn.closest('li');
        taskList.removeChild(selectedTask);
    
        const delContent = selectedTask.previousElementSibling;
        const delFind = listItem.find(
            (item) => item.todoitem == delContent.textContent
        );
        delFind.delConfirm = true;
        const remainlistItem = listItem.filter((item) => item.delConfirm === false);
        listItem = remainlistItem;
        storage.store = JSON.stringify(listItem);
    };
    
    delbtn.addEventListener('click', () => { 
        deleteTask();
    });
};