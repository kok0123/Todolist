const todo = document.getElementById('inputTodo');   //タスク
const add = document.getElementById('add'); //追加ボタン
const taskList = document.getElementById('taskList');

add.addEventListener('click', () => {
    if (todo.value.trim() == '') {
        window.alert('タスクを入力してください');
    }else {
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
        
        const deleteTask = (delbtn) => {
            const selectedTask = delbtn.closest('li');
            taskList.removeChild(selectedTask);
        };

        delbtn.addEventListener('click', () => { 
            deleteTask(delbtn);
        });
    }
});