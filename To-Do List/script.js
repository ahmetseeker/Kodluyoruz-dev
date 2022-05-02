const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const taskList = document.querySelector('#task-list');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const toastMessage = document.querySelector('#toast-message')

loadItems();

loadEvents();

function loadEvents() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAll);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
      createNewItem(item);
    });
  }

  function getItemsFromLS() {
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }

  function setItemToLS(newItem) {
    items = getItemsFromLS();
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
  }

  function deleteItemFromLS(newItem) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
      if (item === newItem) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }

const toastFunction = (message, title, className) => `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
<strong><span>${title}</span></strong> ${message}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;

function createNewItem(item) {
    
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(item));

        const a = document.createElement('a');
        a.classList='delete-item float-right';
        a.setAttribute('href', '#');
        a.innerHTML='<i class="fas fa-times"></i>';

        li.appendChild(a);

        taskList.appendChild(li);
}

function addNewItem(e) {
    if(input.value === '') {
        toastMessage.innerHTML = toastFunction("Add New Task!", "ERROR", "danger");
    } else {
        toastMessage.innerHTML = toastFunction("Task Added!", "MESSAGE", "success");

        createNewItem(input.value);

        setItemToLS(input.value);

        input.value = '';
    }
        e.preventDefault();   
    
}

function deleteItem(e) {
    if(e.target.className === 'fas fa-times') {
        if(confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.remove();
            toastMessage.innerHTML = toastFunction("Selected Task Deleted!", "MESSAGE", "warning");
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAll(e) {
    if(confirm("Are You Sure?")) {
        taskList.innerHTML = '';
        toastMessage.innerHTML = toastFunction("All Tasks Are Deleted!", "MESSAGE", "warning");
        localStorage.clear();   
    }

    e.preventDefault();
}