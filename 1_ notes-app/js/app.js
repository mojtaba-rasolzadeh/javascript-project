// select varibales
const alert = document.querySelector(".alert");
const list = document.querySelector(".note-list");
const openModal = document.querySelector(".open-modal-btn");
const noteOverlay = document.querySelector(".note-overlay");
const form = document.querySelector(".note-form");
const close = document.querySelector(".close");
const formTitle = document.querySelector(".form-title");
const titleInput = document.querySelector("#title-input");
const descInput = document.querySelector("#desc-input");
const addNoteBtn = document.querySelector(".add-note-btn");

// edit options
let editTitle,
    editDesc,
    editFlag = false,
    editID = "";

// event listeners
// open modal
openModal.addEventListener("click", () => {
    noteOverlay.classList.toggle("show-modal");
});

// close modal
close.addEventListener("click", (event) => {
    event.preventDefault();
    noteOverlay.classList.remove("show-modal");

    // reset value
    resetValue();
});

// submit form
form.addEventListener("submit", addNote);

// setup items
window.addEventListener("DOMContentLoaded", setupItems);

// functions
// add note
function addNote(event) {
    event.preventDefault();

    // select value
    const title = titleInput.value;
    const desc = descInput.value;

    // create id & date
    const id = new Date().getTime().toString();
    const date = new Date().toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (title && desc && !editFlag) {
        // create note item
        createNote(id, title, desc, date);

        // remove modal
        noteOverlay.classList.remove("show-modal");

        // display alert
        displayAlert("add item to the list", "success");

        // add to localStorage
        addToLocalStorage(id, title, desc, date);

        // reset value
        resetValue();
    } else if (title && desc && editFlag) {
        editTitle.innerHTML = title;
        editDesc.innerHTML = desc;

        // display alert
        displayAlert("change item", "success");

        // remove modal
        noteOverlay.classList.remove("show-modal");

        // edit localStorage
        editLocalStorage(editID, title, desc, date);

        // reset value
        resetValue();
    } else {
        // display alert
        displayAlert("please enter value", "danger");
    }
}

// display alert
function displayAlert(text, className) {
    alert.textContent = text;
    alert.classList.add(`alert-${className}`);

    // remove alert
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${className}`);
    }, 1000);
}

// create note item
function createNote(id, title, desc, date) {
    // create element
    const article = document.createElement("article");
    article.classList = "note-item grid-3-row";

    // create attribute
    const attr = document.createAttribute("data-id");
    attr.value = id;

    // set attribue
    article.setAttributeNode(attr);

    article.innerHTML = `
    <h3 class="title">${title}</h3>
    <p class="description">${desc}</p>
    <div class="info">
        <p class="date">${date}</p>
        <div class="more-option">
            <button class="more-option-btn">
                <i class="fa fa-ellipsis-h"></i>
            </button>
            <ul class="options">
                <li class="edit">
                    <button class="edit-btn">
                        <i class="fa fa-pencil"></i>
                        <span>edit</span>
                    </button>
                </li>
                <li class="delete">
                    <button class="delete-btn">
                        <i class="fa fa-trash"></i>
                        <span>delete</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    `;

    // add article to the list
    list.appendChild(article);

    // select buttons & value
    const options = article.querySelector(".options");
    const moreBtn = article.querySelector(".more-option-btn");
    const deleteBtn = article.querySelector(".delete-btn");
    const editBtn = article.querySelector(".edit-btn");

    // event listeners
    // display more option
    moreBtn.addEventListener("click", () => {
        options.classList.toggle("show-options");
    });

    // delete btn
    deleteBtn.addEventListener("click", deleteItem);

    // edit btn
    editBtn.addEventListener("click", editItem);
}

// reset value
function resetValue() {
    formTitle.textContent = "add new note";
    titleInput.value = "";
    descInput.value = "";
    editFlag = false;
    editID = "";
    addNoteBtn.textContent = "add note";
}

// delete item to the list
function deleteItem(event) {
    // select element & id
    const element =
        event.currentTarget.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    const id = element.dataset.id;

    // remove element from list
    list.removeChild(element);

    // display alert
    displayAlert("remove item", "danger");

    // delete from localStorage
    deleteFromLocalStorage(id);
}

// edit item
function editItem(event) {
    // select element & id
    const element =
        event.currentTarget.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    const id = element.dataset.id;

    // update value
    editTitle = element.querySelector(".title");
    editDesc = element.querySelector(".description");
    editFlag = true;
    editID = id;

    // show modal
    noteOverlay.classList.add("show-modal");

    // update modal value
    formTitle.textContent = "update a note";
    titleInput.value = editTitle.innerHTML;
    descInput.value = editDesc.innerHTML;
    addNoteBtn.textContent = "update note";

    // select options
    const options = element.querySelector(".options");
    // remove options
    options.classList.toggle("show-options");
}

// localStorage
// get from localStorage
function getFromLocalStorage() {
    return localStorage.getItem("list") ?
        JSON.parse(localStorage.getItem("list")) :
        [];
}
// add to localStorage
function addToLocalStorage(id, title, desc, date) {
    const note = { id, title, desc, date };
    let items = getFromLocalStorage();
    items.push(note);
    localStorage.setItem("list", JSON.stringify(items));
}

// delete from localStorage
function deleteFromLocalStorage(id) {
    let items = getFromLocalStorage();
    items = items.filter((item) => {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// edit localStorage
function editLocalStorage(id, title, desc, date) {
    let items = getFromLocalStorage();
    items = items.map((item) => {
        if (item.id === id) {
            item.title = title;
            item.desc = desc;
            item.date = date;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// setup items
function setupItems() {
    let items = getFromLocalStorage();
    items = items.forEach((item) => {
        createNote(item.id, item.title, item.desc, item.date);
    });
}