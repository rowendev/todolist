let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click" , e=> {
    e.preventDefault();
    
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoDate = form.children[1].value;
    let todoDateSplit = todoDate.split('-');
    let todoYear = todoDateSplit[0];
    let todoMonth = todoDateSplit[1];
    let todoDay = todoDateSplit[2];
    let done = false;

    if (todoText === ""){
        alert("Please Enter something...");
        return;
    }
    if (todoDate === ""){
        alert("Don't forget your date...");
        return;
    }
    
    //create list
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let text = document.createElement("p");
    text.innerText = todoText;
    text.classList.add("todo-text");
    // text.setAttribute("onclick", "editText()");

    let date = document.createElement("p");
    date.classList.add("todo-date");
    date.innerText = todoYear + "/" + todoMonth + "/" + todoDay;

    //complete
    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.addEventListener("click", e=> {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
        let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    
                    if(item.todoText == text.innerText){
                        if(item.done == true){
                            item.done = false;
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }else if(item.done == false){
                            item.done = true;
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                        
                    }
                })
    })

    //delete
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.addEventListener("click", e=> {
        let todoItem = e.target.parentElement;
        
        todoItem.style.animation = "scaleDown 0.3s forwards";
        todoItem.addEventListener("animationend", ()=> {
            todoItem.remove();
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if(item.todoText == text){
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
        })
    })
    
    todo.appendChild(text);
    todo.appendChild(date);
    todo.appendChild(completeBtn);
    todo.appendChild(deleteBtn);
    todo.style.animation = "scaleUp 0.3s forwards";

    //local storage
    let myTodo = {
        todoText: todoText,
        todoYear: todoYear,
        todoMonth : todoMonth,
        todoDay : todoDay,
        done : done
    }
    let myList = localStorage.getItem("list");
    if(myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
    //clear the input field
    form.children[0].value = "";
    form.children[1].value = "";
    //put into section
    section.appendChild(todo);
})

loadData();

function editText() {
    let text = document.querySelector("p");
    text.setAttribute("contenteditable", "true");
    console.log(text.innerText);
}

function loadData() {
    let myList = localStorage.getItem("list");
    if(myList !==null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {
            let todo = document.createElement("div");
            todo.classList.add("todo");
            
            let text = document.createElement("p");
            text.innerText = item.todoText;
            text.classList.add("todo-text");
            // text.setAttribute("onclick", "editText()");
    
            let date = document.createElement("p");
            date.classList.add("todo-date");
            date.innerText = item.todoYear + "/" + item.todoMonth + "/" + item.todoDay;
    
            let completeBtn = document.createElement("button");
            completeBtn.classList.add("complete");
            completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            completeBtn.addEventListener("click", e=> {
                let todoItem = e.target.parentElement;
                todoItem.classList.toggle("done");
                
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    
                    if(item.todoText == text.innerText){
                        if(item.done == true){
                            item.done = false;
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }else if(item.done == false){
                            item.done = true;
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                    }
                })
            })
    
            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteBtn.addEventListener("click", e=> {
                let todoItem = e.target.parentElement;
                
                todoItem.style.animation = "scaleDown 0.3s forwards";
                todoItem.addEventListener("animationend", ()=> {
                    todoItem.remove();
                    //remove from local storage
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item, index) => {
                        if(item.todoText == text){
                            myListArray.splice(index, 1);
                            localStorage.setItem("list", JSON.stringify(myListArray));
                        }
                    })
                })
            })

            todo.appendChild(text);
            todo.appendChild(date);
            todo.appendChild(completeBtn);
            todo.appendChild(deleteBtn);
            todo.style.animation = "scaleUp 0.3s forwards";
            section.appendChild(todo);
            if(item.todoText == text.innerText){
                if(item.done == true){
                    todo.classList.add("done");
                }else {
                    todo.classList.remove("done");
                }
            }
        })
    }
}

function mergeTime(arr1, arr2){
let result = [];
let i = 0;
let j = 0;

while (i < arr1.length && j < arr2.length) {
    //sort by year
    if (Number(arr1[i].todoYear) > Number(arr2[j].todoYear)){
        result.push(arr2[j]);
        j++;
    } else if (Number(arr1[i].todoYear) < Number(arr2[j].todoYear)){
        result.push(arr1[i]);
        i++;
    } else if (Number(arr1[i].todoYear) == Number(arr2[j].todoYear)){
        //sort by month
        if(Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)){
            result.push(arr2[j]);
            j++
        } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)){
            result.push(arr1[i]);
            i++;
        } else if(Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)){
            //sort by date
            if(Number(arr1[i].todoDay) > Number(arr2[j].todoDay)){
                result.push(arr2[j]);
                j++;
            } else if (Number(arr1[i].todoDay) < Number(arr2[j].todoDay)){
                result.push(arr1[i]);
                i++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }
    }
    while (i<arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while(j<arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
    }
}

function mergeSort(arr) {
    if(arr.length === 1){
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));
    }
}

let sortBtn = document.querySelector("div.sort button");
sortBtn.addEventListener("click" , ()=>{
    let sortArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortArray));

    //remove browser data
    let len = section.children.length;
    for(let i =0; i < len; i++){
        section.children[0].remove();
    }

    //load data
    loadData();
})