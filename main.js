const todo = document.getElementById('inputTodo');   //タスク
const add = document.getElementById('add'); //追加ボタン
const taskList = document.getElementById('taskList');

var listItem = [];
//const storage = localStorage;

document.addEventListener("DOMContentLoaded", () => {
    const json = localStorage.store; 
    if (json === undefined) { 
      return;
    }
    listItem = JSON.parse(json);
  
    for (const item of listItem) { 
        const taskContainer = document.createTextNode(item.todoitem),       
              li = document.createElement('li'),
              p = document.createElement('p');

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
            const delItems = item.find((item) => {
                return item.todoitem = selectContent.textContent;
            });
            if (item.todoitem === delItems.todoitem) {
                item.delConfirm = true;
            }
            const remainlistItem = item.filter((item) => {
                return item.delConfirm = false;
            });
            listItem = remainlistItem;
            console.log(listItem);
            localStorage.store = JSON.stringify(listItem);
        };

        delbtn.addEventListener('click', () => { 
            deleteTask();
        });
    }
});

add.addEventListener('click', () => {
    if (todo.value.trim() !== '') {    
        const sameWords = listItem.find((item) => { //タスク内容が被った場合
            item.todoitem == todo.value
        });
        if (sameWords === undefined) {
            var item = {
                todoitem: todo.value,
                delConfirm: false
            };
            //listItem.push(item);
            //localStorage.store = JSON.stringify(listItem); //JSON変換

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

            listItem.push(item);

            //console.log(listItem);

            const deleteTask = () => {
                const selectedTask = delbtn.closest('li');
                taskList.removeChild(selectedTask);

                const selectContent = selectedTask.children[0]; //liタグの子要素であるpタグ
                //console.log(selectContent);
                //console.log(listItem);
                for (let i = 0; i < listItem.length; i++) {
                    if (listItem[i].todoitem === selectContent.innerHTML) {
                        listItem[i].delConfirm = true;
                    }
                }
                //console.log(listItem);

                var remainList = [];
                listItem.forEach((el) => {
                    if (el.delConfirm === false) {
                        remainList.push(el);
                    }
                });
                //console.log(remainList);
                /*listItem.filter((el) => {
                    return el.delConfirm = false;
                });
                console.log(listItem);*/
                listItem = remainList;
                localStorage.store = JSON.stringify(listItem);
            };

            let cnt = 0;
            delbtn.addEventListener('click', () => {
                cnt += 1;
                //console.log(listItem); 
                deleteTask();
            });

            if (cnt === 0) {
                localStorage.store = JSON.stringify(listItem); //JSON変換    
            }

            cnt = 0;
        } else {
            alert('同じタスクは入力できません')
        }
    } else {
        window.alert('タスクを入力してください');
    }
});