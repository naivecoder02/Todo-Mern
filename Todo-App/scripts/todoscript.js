const btn = document.getElementById('btnId');
const todoInput = document.getElementById("newTodoInput");
const prioritySelectorNode = document.getElementById("prioritySelector");
const ul = document.getElementById("todos");

btn.addEventListener('click', function() {
  const todoText = todoInput.value;
  const priority = prioritySelectorNode.value;

  if (!todoText || !priority) {
    alert("Please enter a todo");
    return;
  }

  const id = Math.floor(Math.random() * 10000000000000001);

  const todo = {
    id,
    todoText,
    priority,
  };

  fetch("/addTodata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(function(response) {
    if (response.status === 200) {
      showToDoSorted(todo); // Use the new function for showing the todo
    }
  });
});

// ... Rest of the client-side code ...



function showToDoSorted(todo) {
  const newTodoItem = document.createElement("div");
  newTodoItem.innerText = todo.todoText;


  const img = document.createElement('img');
  img.setAttribute('src', todo.filename );
  img.setAttribute('width', "50" );
  img.setAttribute('height', "50" );
  img.setAttribute('style', "max-width: 100%; max-height: 100%; object-fit: cover; margin-left: 30px; margin-right: 10px" );



  const priorityBtn = document.createElement("button");
  priorityBtn.innerText = todo.priority;

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerText = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";

  newTodoItem.appendChild(editBtn);
  newTodoItem.appendChild(deleteBtn);
  newTodoItem.appendChild(priorityBtn);
  newTodoItem.appendChild(img);

  insertSorted(newTodoItem); // Insert the new todo in the sorted list

  // Add event listeners for delete and edit buttons
  deleteBtn.addEventListener("click", () => {
    deleteTodoById(todo.id);
  });

  editBtn.addEventListener("click", () => {
    editTodoById(todo.id);
  });
}


function insertSorted(newTodoItem) {
    const priority = newTodoItem.querySelector("button").innerText;
    let insertIndex = 0;
  
    // Sort todos based on priority and insert accordingly
    for (let i = 0; i < ul.children.length; i++) {
      const currentPriority = ul.children[i].querySelector("button").innerText;
      if (priority === "High" && currentPriority !== "High") {
        insertIndex = i;
        break;
      } else if (priority === "Medium" && currentPriority === "Low") {
        insertIndex = i;
        break;
      } else if (priority === "Low") {
        insertIndex = i + 1;
        break;
      }
    }
  
    // Insert the new todo at the correct position
    ul.insertBefore(newTodoItem, ul.children[insertIndex]);
  }

function deleteTodoById(todoId) {
  const ID = { id: todoId };
  fetch("/delTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ID)
  }).then((response) => {
    if (response.status === 200) {
      window.location.reload();
    } else {
      // console.log(response.json());
      alert('Something went wrong in todo deletion');
    }
  });
}

function editTodoById(todoId) {
  const edit = prompt("What is your next task..?");

  if (edit) {
    const to = {
      id: todoId,
      data: edit
    };
    fetch("/editTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(to)
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      } else {
        // console.log(response.json());
        alert('Something went wrong in todo editing');
      }
    });
  }
}

fetch("/todo-data").then((response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    alert("Something went wrong");
  }
}).then((todos) => {
  // Sort the todos based on priority before showing them
  todos.sort((a, b) => {
    const priorityA = a.priority.toLowerCase();
    const priorityB = b.priority.toLowerCase();
    if (priorityA < priorityB) return -1;
    if (priorityA > priorityB) return 1;
    return 0;
  });

  todos.forEach((todo) => {
    showToDoSorted(todo);
  });
})
