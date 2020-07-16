//do edit button
//do search button
//take completed to a seperate section
//save to file 
//input manipulation

//create variables
var todoArray = [];
var errorString, inputTag, priorityTag, inputValue, dateElement, Ul, clearlist, Li, liChildP, liChildComplete, liChildDelete, del, priorityValue, completeButton;
//date constants
var iV;
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
//get elements
var addButn = document.getElementById("addButton");
var DELETE = document.getElementById("DELETE");
Ul = document.getElementById("list");
clearlist = document.getElementById("clearlist");
dateElement = document.getElementById("date");
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

class todoClass {
    input;
    id;
    complete;
    constructor(input, id, complete) {
        this.input = input;
        this.id = id;
        this.complete = complete;
    }
}


function clearDOM() {
    Ul.innerHTML = "";
}

function clearList() {
    todoArray = [];
    Ul.innerHTML = "";
    console.log(todoArray);
}
function pushIntoArray(num, value) {
    var contain = false;
    for (var i = 0; i < todoArray.length; i++) {
        if (todoArray[i].id > num) {
            todoArray.splice(num - 1, 0, value);
            contain = true;
            break;
        }
    }
    if (!contain) {
        todoArray.push(value);
    }
}

function AppendListToDom(err) {
    for (var i = 0; i < todoArray.length; i++) {
        Li = document.createElement("li");
        Ul.append(Li);
        //Li.classList.add("list");
        liChildP = document.createElement("p")
        liChildComplete = document.createElement("i")
        liChildDelete = document.createElement("i")

        liChildDelete.classList += "iDelete"
        Li.id = i;
        liChildP.textContent = todoArray[i].input;
        if (todoArray[i].complete === true) {
            liChildP.classList.add("Lt")
            liChildComplete.classList += "iCompleteActivated"
        } else {
            liChildP.classList.add("NLt")
            liChildComplete.classList += "iComplete"
        }
        Li.appendChild(liChildP)
        Li.appendChild(liChildComplete)
        Li.appendChild(liChildDelete)
        if (err = "noPriority") {
            errorLog();
        }
        liChildDelete.addEventListener("click", deleteListFromDom);
        liChildComplete.addEventListener("click", completeListCss);
    }
}

function deleteListFromDom(e) {
    var DeleteButton = e.target;
    var idDelete = DeleteButton.parentElement.id;
    todoArray.splice(idDelete, 1);
    clearDOM();
    AppendListToDom();
}


function completeListCss(element) {
    var done = element.target;
    if (todoArray[done.parentElement.id].complete === false) {
        todoArray[done.parentElement.id].complete = true;
    } else {
        todoArray[done.parentElement.id].complete = false;
    }
    clearDOM();
    AppendListToDom();
}

function capital_letter(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
function displayToDom() {
    inputTag = document.getElementById("stuffs");
    priorityTag = document.getElementById("Pid")
    inputValue = inputTag.value;
    priorityValue = priorityTag.value;
    if (inputValue === "") { window.alert("Enter Something In Input Fields"); return; }
    if (priorityValue === "") { priorityValue = 1; errorString = "noPriority"; /* errorLog(errorString)  */ }
    if (isNaN(priorityValue)) { window.alert("Provide a number in priority"); return; };
    iV = capital_letter(inputValue.toLowerCase());
    todoObject = new todoClass(iV, priorityValue, false)
    console.log(priorityValue)
    pushIntoArray(todoObject.id, todoObject);
    document.getElementById("Pid").value = "";
    document.getElementById("stuffs").value = "";
    clearDOM();
    AppendListToDom(errorString);

}
addButn.addEventListener("click", displayToDom);
clearlist.addEventListener("click", clearList);



function errorLog() {
    const errorP = document.createElement('p');
    errorP.classList.add("errorP");
    errorP.innerText = "NO PRIOROTY GIVEN, SO DEFAULT PRIORITY IS 1"
    Li.append(errorP);
    setTimeout(() => {
        errorP.remove();
    }, 2000)
}
