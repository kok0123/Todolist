const todo = document.getElementById('inputTodo'), 
      add = document.getElementById('add'), 
      taskList = document.getElementById('taskList');

var listItem = [];

document.addEventListener('DOMContentLoaded', () => {
    const localStorageVal = localStorage.store; 
    if (localStorageVal === undefined) { 
      return;
    }
    listItem = JSON.parse(localStorageVal);

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

            const selectContent = selectedTask.children[0]; 
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
    if (todo.value.trim() !== '' && todo.value.trim().length <= 20) {

        let possibleTask = "Yes"; //タスク重複の有無
        if (listItem !== []) {
            for (let i = 0; i < listItem.length; i++) {
                if (listItem[i].todoitem === todo.value.trim()) {
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

                const selectContent = selectedTask.children[0];
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

            if (cnt === 0) { //削除ボタンが押されなかった場合
                localStorage.store = JSON.stringify(listItem);   
            }

            cnt = 0;
        } else {
            window.alert("同じタスクは入力できません。");
        }

        possibleTask = "Yes";

    } else if (todo.value.trim().length > 20) {
        var todoVal = todo.value.trim().length,
            cntVal = todoVal - 20;

        window.alert("20文字以内で入力してください。" + "\n" + `${cntVal}文字多く入力しています。`);
    } else {
        window.alert("タスクを入力してください。");
    }
});