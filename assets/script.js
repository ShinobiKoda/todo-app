document.addEventListener("DOMContentLoaded", () => {
  const append = document.querySelector(".append");
  const input = document.getElementById("todo_input");
  const add = document.querySelector(".add");
  const todo = document.querySelector(".todo");
  const clear = document.getElementById("clear");
  const all = document.getElementById("all");
  const active = document.getElementById("active");
  const completed = document.getElementById("completed");
  const allDesktop = document.getElementById("all-desktop");
  const activeDesktop = document.getElementById("active-desktop");
  const completeDdesktop= document.getElementById("completed-desktop");
  const itemsLeft = document.getElementById("items-left");
  const secStatus = document.querySelector(".sec-status");
  const clearDesktop = document.getElementById("clear-desktop");
  const todoStatus = document.querySelector(".todo_status");
 

  todo.style.display = "none";

  let screenWidth = window.screen.width;

  input.addEventListener("input", () => {
    if (input.value !== "" && screenWidth < 600) {
      todo.style.display = "block";
      todoStatus.style.display = "flex";
    } 

    if (input.value !== "" && screenWidth > 600) {
      todo.style.display = "block";
      secStatus.style.display = "flex";
    } 
  });

  input.addEventListener("keydown", (event) => {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
      const todoText = input.value.trim();

      // Check if the input field is not empty
      if (todoText !== "") {
        // Call createTodo function only if todoText is not empty
        createTodo(todoText);

        // Clear the input field after creating a new todo
        input.value = "";

        // Prevent the default behavior of the Enter key (form submission)
        event.preventDefault();
      }
    }
  });

  // 1. Create a new todo item
  const createTodo = (
    todoText,
    completed = false,
    todoId = Date.now().toString()
  ) => {
    if (todoText.trim() === "") {
      return; // Do nothing if the input field is empty or contains only whitespace
    }

    // Create a unique ID for each todo

    //Create a todo object with an id and text
    const todo = {
      id: todoId,
      text: todoText,
      completed: completed,
    };

    //save the todo object in local storage
    localStorage.setItem(`todo_${todoId}`, JSON.stringify(todo));

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-todo-id", todoId);
    append.appendChild(li);

    const span = document.createElement("span");
    span.setAttribute("class", "text");
    li.appendChild(span);

    const circle = document.createElement("span");
    circle.setAttribute("class", "circle");
    span.appendChild(circle);

    const p = document.createElement("p");
    p.setAttribute("class", "todo-text");
    p.textContent = todoText;
    span.appendChild(p);

    const span2 = document.createElement("span");
    span2.setAttribute("class", "delete");
    li.appendChild(span2);

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("class", "delete");
    img.setAttribute("alt", "");
    span2.appendChild(img);

    // 2. Mark a todo as complete
    circle.addEventListener("click", () => {
      const todoId = li.getAttribute("data-todo-id");
      const storedTodo = JSON.parse(localStorage.getItem(`todo_${todoId}`));
  
      if (storedTodo) {
          // Toggle the completed property based on the presence of 'checked' class
          storedTodo.completed = !storedTodo.completed;
  
          // Save the updated todo back to localStorage
          localStorage.setItem(`todo_${todoId}`, JSON.stringify(storedTodo));
      }
  
      // Toggle the 'complete' class on the todo text
      p.classList.toggle("complete");
      // Toggle the 'checked' class on the circle
      circle.classList.toggle("checked");
  
      updateTodosCount();
  });
  
  

    // 3. Delete a todo item
    img.addEventListener("click", () => {
      if (p.classList.contains("complete")) {
        li.remove();

        //remove from local storage
        localStorage.removeItem(`todo_${todoId}`);

        // Call updateTodosCount to update the todos count after deleting a todo
        updateTodosCount();
      }
    });

    updateTodosCount();
  };



  // 4. Update the todos count

  const updateTodosCount = () => {
    const todos = document.querySelectorAll(".item"); // Select all todo items
    const todosCount = todos.length; // Get the count of todo items
    const todosCountElement = document.querySelector(".remains"); // Select the element to display the count

    todosCountElement.textContent = `${todosCount}`; // Update the element's text content with the count
    itemsLeft.innerText = todosCount;

  };

 

  const loadTodos = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("todo_")) {
        const todo = JSON.parse(localStorage.getItem(key));
        createTodo(todo.text, todo.completed, todo.id);
  
        // Check if the todo is completed and apply 'complete' and 'checked' classes
        const circleElement = document.querySelector(
          `[data-todo-id="${todo.id}"] .circle`
        );
        const todoTextElement = document.querySelector(
          `[data-todo-id="${todo.id}"] .todo-text`
        );
        if (todo.completed) {
          todoTextElement.classList.add("complete");
          circleElement.classList.add("checked");
        }
      }
    }
    updateTodosCount();
  };
  

  loadTodos();

  add.addEventListener("click", () => {
    // Get the value from the input field
    const todoText = input.value.trim();

    // Call createTodo function only if todoText is not empty
    if (todoText !== "") {
      // Call createTodo function only if todoText is not empty
      createTodo(todoText);
    }

    // Optionally, clear the input field after creating a new todo
    input.value = "";
  });

  clear.addEventListener("click", () => {
    const completedTodos = document.querySelectorAll(".item");
    completedTodos.forEach((todo) => {
      const isCompleted = todo
        .querySelector(".todo-text")
        .classList.contains("complete");
      if (isCompleted) {
        const todoId = todo.getAttribute("data-todo-id");
        localStorage.removeItem(`todo_${todoId}`);
        todo.remove();
      }
    });
    updateTodosCount();
  });

  clearDesktop.addEventListener("click", () => {
    const completedTodos = document.querySelectorAll(".item");
    completedTodos.forEach((todo) => {
      const isCompleted = todo
        .querySelector(".todo-text")
        .classList.contains("complete");
      if (isCompleted) {
        const todoId = todo.getAttribute("data-todo-id");
        localStorage.removeItem(`todo_${todoId}`);
        todo.remove();
      }
    });
    updateTodosCount();
  });

  all.addEventListener("click", () => {
    showTodos("all");
  });

  active.addEventListener("click", () => {
    showTodos("active");
  });

  completed.addEventListener("click", () => {
    showTodos("completed");
  });

  allDesktop.addEventListener("click", () => {
    showTodos("all");
  });

  activeDesktop.addEventListener("click", () => {
    showTodos("active");
  });

  completeDdesktop.addEventListener("click", () => {
    showTodos("completed");
  });

  function showTodos(filter) {
    const todos = document.querySelectorAll(".item");
    todos.forEach((todo) => {
      const isCompleted = todo
        .querySelector(".todo-text")
        .classList.contains("complete");
      if (filter === "active" && isCompleted) {
        todo.style.display = "none";
      } else if (filter === "completed" && !isCompleted) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    });
  }
});
