//do edit button
//do search button
//take completed to a seperate section
//save to file 
//input manipulation

//create variables
var todoArray = [];
var errorString, inputTag, priorityTag, inputValue, dateElement, Ul, clearlist, Li, liChildP, liChildComplete, liChildDelete, del, priorityValue, completeButton;
let error_delete = false;
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

//fucntion to clear Dom so that we can regenerate List element in unordered list of HTML Dom
function clearDOM() {
    Ul.innerHTML = "";
}

//the clear button uses this function to remove everythhing from the dom and memory
function clearList() {
    todoArray = [];
    Ul.innerHTML = "";
    console.log(todoArray);
}

//pushes objects into array called here todoArray[]
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

//appends to list the todos and the delete and complete button everytime any button is clicked
function AppendListToDom(err) {
    //loops for each array memeber
        for (var i = 0; i < todoArray.length; i++) {
            Li = document.createElement("li");
            Ul.append(Li);

            //handles p, i and delete tag and delete styling
            liChildP = document.createElement("p")
            liChildComplete = document.createElement("i")
            liChildDelete = document.createElement("i")
            liChildDelete.classList += "iDelete"
            Li.id = i;
            liChildP.textContent = todoArray[i].input;

            //handles complete button
            if (todoArray[i].complete === true) {
                liChildP.classList.add("Lt")
                liChildComplete.classList += "iCompleteActivated"
            } else {
                liChildP.classList.add("NLt")
                liChildComplete.classList += "iComplete"
            }

            //appends everything to DOM
            Li.appendChild(liChildP)
            Li.appendChild(liChildComplete)
            Li.appendChild(liChildDelete)

//event listeners inside the function to check for items completed and deleted everytime
//it is inside the function because the "liChildDelete" and "liChildComplete" is created only inside the function
            liChildDelete.addEventListener("click", deleteListFromDom);
            liChildComplete.addEventListener("click", completeListCss);
        }

        // handles no priority given
    if (err === "noPriority" && error_delete === false) {

        //passing in function argument for other future case error handling situations
        errorLog(err); 
    }
}

//function handles no priority given log
function errorLog(err) {
    const errorP = document.createElement('p');
    
    //checks if priority is equal to noPriority. This is incase other validators are given
    //in the future
    if (err === "noPriority") {
        errorP.classList.add("errorP");
        errorP.innerText = "NO PRIOROTY GIVEN, SO DEFAULT PRIORITY IS 1";
    }
    Li.append(errorP);

    //sets timeout delays this removal of p tag from the DOM so user can see it for some time
    setTimeout(() => {
        //removes the p tag from LI (DOM)
        errorP.remove();
    }, 2000)
}

//this deletes array items and regenerates a new list in DOM with the new array
function deleteListFromDom(e) {
    error_delete = true;
    var DeleteButton = e.target;
    var idDelete = DeleteButton.parentElement.id;
    todoArray.splice(idDelete, 1);
    clearDOM();
    AppendListToDom();
    error_delete = false;
}

//gives different css property when complete button is clicked.
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

//capitalises the array items
function capital_letter(str) {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

//calls the tags from html and starts the engine for the todo list
function displayToDom() {
    errorString = "";
    inputTag = document.getElementById("stuffs");
    priorityTag = document.getElementById("Pid")
    inputValue = inputTag.value;
    priorityValue = priorityTag.value;
    if (inputValue === "") {console.error("no input given"); return; }
    if (priorityValue === "") { priorityValue = 1; errorString = "noPriority"; }
    if (isNaN(priorityValue)) { window.alert("Provide a number in priority"); return; };
    iV = capital_letter(inputValue.toLowerCase());
    todoObject = new todoClass(iV, priorityValue, false)
    console.log(priorityValue)
    pushIntoArray(todoObject.id, todoObject);
    clearDOM();
    AppendListToDom(errorString);
    document.getElementById("Pid").value = "";
    document.getElementById("stuffs").value = "";
}

//addeventlisteners for addButn and clearbtn
addButn.addEventListener("click", displayToDom);
clearlist.addEventListener("click", clearList);



