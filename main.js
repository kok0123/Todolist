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
        const taskContainer = document.createTextNode(item.todoitem);       
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
 
            const selectContent = selectedTask.children[0]; //liタグの子要素であるpタグ
            const delItems = listItem.find(
                (item) => item.todoitem == selectContent.textContent
            );
            delItems.delConfirm = true;
            const remainlistItem = listItem.filter((item) => item.delConfirm === false);
            listItem = remainlistItem;
            storage.store = JSON.stringify(listItem);
        };
        
        delbtn.addEventListener('click', () => { 
            deleteTask();
        });
    }
});

add.addEventListener('click', () => {
    if (todo.value.trim() !== '') {    
        const sameWords = listItem.find( //タスク内容が被った
            (element) => element.todoitem == todo.value
        );
        if (sameWords === undefined) {
            let element = {};
            element.todoitem = todo.value;
            element.delConfirm = false;
            listItem.push(element);
            storage.store = JSON.stringify(listItem); //JSON変換

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

                const selectContent = selectedTask.children[0]; //liタグの子要素であるpタグ
                const delItems = listItem.find(
                    (element) => element.todoitem == selectContent.textContent
                );
                delItems.delConfirm = true;
                const remainlistItem = listItem.filter((element) => element.delConfirm === false);
                listItem = remainlistItem;
                storage.store = JSON.stringify(listItem);
            };

            delbtn.addEventListener('click', () => { 
                deleteTask();
            });
        } else {
            alert('同じタスクは入力できません')
        }
    } else {
        window.alert('タスクを入力してください');
    }
});