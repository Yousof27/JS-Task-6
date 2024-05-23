let input = document.querySelector('input[type="text"]');
let result = document.querySelector('.tasks-con');
let deleteBtns = document.querySelectorAll('.delete');
let message = document.querySelector('.message');

let tasksArr = [];

if (localStorage.Tasks) {
    tasksArr = JSON.parse(localStorage.Tasks);
    showTasks();
}

input.parentElement.addEventListener('submit', (ev) => {
    ev.preventDefault();

    if (input.value) {
        if (check(input.value)) {
            let task = create(`${input.value}`);
            result.appendChild(task);
            tasksArr.push(task.outerHTML);
            localStorage.Tasks = JSON.stringify(tasksArr);
            input.value = '';
        } else {
            showMessage();
        }
    } else {
        console.log('No')
    }
});

function showTasks() {
    while (result.firstElementChild) {
        result.firstElementChild.remove();
    }
    for (let i = 0; i < tasksArr.length; i++) {
        let task = document.createElement('div');
        task.innerHTML = tasksArr[i];
        remove(task.firstElementChild.lastElementChild);
        result.appendChild(task.firstElementChild);
    }
}

function create(content) {
    let e = document.createElement("div");
    let eContent = document.createTextNode(`${content}`);
    e.appendChild(eContent);
    e.className = 'task';
    let delBtn = document.createElement("button");
    let delBtnContent = document.createTextNode('Delete');
    delBtn.appendChild(delBtnContent);
    delBtn.className = 'delete';
    remove(delBtn);
    e.appendChild(delBtn);
    return e;
}

function remove(btn) {
    btn.addEventListener('click', () => {
        let textContent = btn.parentElement.outerHTML;
        tasksArr = tasksArr.filter(item => item !== textContent);
        localStorage.Tasks = JSON.stringify(tasksArr);
        btn.parentElement.remove();
    });
}

function check(value) {
    for (let i = 0; i < tasksArr.length; i++) {
        if (value === tasksArr[i].split('>')[1].split('<')[0]) {
            return 0;
        }
    }
    return 1;
}

function showMessage() {
    message.style.opacity = 1;
    setTimeout(() => {
    message.style.opacity = 0;
    }, 2000);
}

// localStorage.clear()
