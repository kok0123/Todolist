const todo = document.getElementById('inputTodo'),   //タスク
      add = document.getElementById('add'), //追加ボタン
      taskList = document.getElementById('taskList');

var listItem = [];

document.addEventListener("DOMContentLoaded", () => {
    const localStorageVal = localStorage.store; 
    if (localStorageVal === undefined) { 
      return;
    }
    listItem = JSON.parse(localStorageVal) //JavaScriptに戻す

    for (let i = 0; i < listItem.length; i++) {
        const taskContainer = document.createTextNode(listItem[i].todoitem),       
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
            for (let i = 0; i < listItem.length; i++) {
                if (listItem[i].todoitem === selectContent.innerHTML) {
                    listItem[i].delConfirm = true;
                }
            }

            var remainList = [];
            listItem.forEach((el) => {
                if (el.delConfirm === false) {
                    remainList.push(el);
                }
            });
            listItem = remainList;
            localStorage.store = JSON.stringify(listItem);
        };

        delbtn.addEventListener('click', () => {
            deleteTask();
        });
    }
});

add.addEventListener('click', () => {
    if (todo.value.trim() !== '') { 
        let possibleTask = "Yes";
        if (listItem !== []) {
            for (let i = 0; i < listItem.length; i++) {
                if (listItem[i].todoitem === todo.value) {
                    possibleTask = "No";    
                }               
            }
        }
        
        if (possibleTask === "Yes") {
            var item = {
                todoitem: todo.value,
                delConfirm: false
            };

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

            const deleteTask = () => {
                const selectedTask = delbtn.closest('li');
                taskList.removeChild(selectedTask);

                const selectContent = selectedTask.children[0]; //liタグの子要素であるpタグ
                for (let i = 0; i < listItem.length; i++) {
                    if (listItem[i].todoitem === selectContent.innerHTML) {
                        listItem[i].delConfirm = true;
                    }
                }

                var remainList = [];
                listItem.forEach((el) => {
                    if (el.delConfirm === false) {
                        remainList.push(el);
                    }
                });
                listItem = remainList;
                localStorage.store = JSON.stringify(listItem);
            };

            let cnt = 0;
            delbtn.addEventListener('click', () => {
                cnt += 1;
                deleteTask();
            });

            if (cnt === 0) {
                localStorage.store = JSON.stringify(listItem); //JSON変換    
            }

            cnt = 0;
        } else {
            alert('同じタスクは入力できません');
            todo.value = "";
        }

        possibleTask = "Yes";

    } else {
        window.alert('タスクを入力してください');
    }
});