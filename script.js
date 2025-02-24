let todos = [];

let inputField = document.getElementById('todo-input');

inputField.addEventListener("keypress", function(event) { //found here https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-btn").click();
    }
});

function newItem() {
    let todo = inputField.value.trim();

    if (todo === "") {
        errorNotice("empty");
        return;
    } else {
        todos.push(todo);
        inputField.value = "";
        updateUI();
    }
}



const inputNotice = document.querySelector('.input-notice');

function errorNotice(errorType) {
    if (errorType === "empty") {
        inputNotice.style.display = "block";
        inputNotice.innerHTML = 'Cannot create an empty todo <i style="color: #808080" class="fa-solid fa-xmark"></i>';
    }
}

function hideNotice() {
    inputNotice.style.display = "none";
}

function updateUI() {
    const todosList = document.querySelector(".todo-list");
    todosList.innerHTML = "";

    todos.forEach((task, index) => {
        let listItem = document.createElement('li');
        listItem.className = "todo-items";

        let contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';
        contentWrapper.innerText = task;

        let buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'buttons-wrapper';

        let completeButton = document.createElement('button');
        completeButton.className = 'item-btn';
        completeButton.id = 'complete-btn';
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.onclick = () => removeItem(index);

        let editButton = document.createElement('button');
        editButton.className = 'item-btn';
        editButton.id = 'edit-btn';
        editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        editButton.onclick = () => editItem(index);

        let removeButton = document.createElement('button');
        removeButton.className = 'item-btn';
        removeButton.id = 'remove-btn';
        removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeButton.onclick = () => removeItem(index);

        buttonsWrapper.appendChild(completeButton);
        buttonsWrapper.appendChild(editButton);
        buttonsWrapper.appendChild(removeButton);
        contentWrapper.appendChild(buttonsWrapper);
        listItem.appendChild(contentWrapper);
        todosList.appendChild(listItem);
    });
};

function removeItem(index) {
    todos.splice(index, 1);
    updateUI();
};

// Code below was given by ChatGPT as I am learning JavaScript and was hard for my level of knowladge. I copied here so I can read it and learn from it

function editItem(index) {
    let listItem = document.querySelectorAll(".todo-items")[index]; // Get the specific todo item
    let contentWrapper = listItem.querySelector(".content-wrapper"); // Get the text container
    let oldTodo = todos[index]; // Get current task text

    // Create input field
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.className = "edit-input";
    inputField.value = oldTodo;
    inputField.focus(); // Focus on input immediately

    // Replace text with input field
    contentWrapper.innerHTML = ""; 
    contentWrapper.appendChild(inputField);

    // Save changes when user presses Enter or clicks outside
    inputField.addEventListener("blur", saveEdit);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") saveEdit();
    });

    function saveEdit() {
        let newTodo = inputField.value.trim();
        if (newTodo !== "") {
            todos[index] = newTodo; // Update array
        }
        updateUI(); // Refresh UI to show updated todo
    }
}
