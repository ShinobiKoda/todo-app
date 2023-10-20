document.addEventListener('DOMContentLoaded', () => {

  const append = document.querySelector('.append');
  const input = document.getElementById('todo_input');
  const add = document.querySelector('.add');
  const todo = document.querySelector('.todo');
  const clear = document.getElementById('clear');
  const all = document.getElementById('all');
  const active = document.getElementById('active');
  const completed = document.getElementById('completed');



  todo.style.display = 'none';
  
  input.addEventListener('input', () => {
    if (input.value !== '') {
      todo.style.display = 'block'
    } else {
      todo.style.display = 'none';
    }
  })
  
  input.addEventListener('keydown', (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      const todoText = input.value.trim();
  
      // Check if the input field is not empty
      if (todoText !== '') {
        // Call createTodo function only if todoText is not empty
        createTodo(todoText);
  
        // Clear the input field after creating a new todo
        input.value = '';
  
        // Prevent the default behavior of the Enter key (form submission)
        event.preventDefault();
      }
    }
  });
  
  
  
  
  
  
  // 1. Create a new todo item
  const createTodo = ( todoText, completed=false, todoId = Date.now().toString()) => {
  
    if (todoText.trim() === '') {
      return; // Do nothing if the input field is empty or contains only whitespace
    }

    // Create a unique ID for each todo
  
  
    //Create a todo object with an id and text
    const todo = {
      id: todoId,
      text: todoText,
      completed: false
    }

    //save the todo object in local storage
    localStorage.setItem(`todo_${todoId}`, JSON.stringify(todo));

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    append.appendChild(li);
  
    const span = document.createElement('span');
    span.setAttribute('class', 'text');
    li.appendChild(span);
  
    const circle = document.createElement('span');
    circle.setAttribute('class', 'circle');
    span.appendChild(circle);
  
    const p = document.createElement('p');
    p.setAttribute('class', 'todo-text');
    p.textContent = todoText
    span.appendChild(p);
  
    const span2 = document.createElement('span');
    span2.setAttribute('class', 'delete');
    li.appendChild(span2);
  
    const img = document.createElement('img');
    img.setAttribute('src', './assets/images/icon-cross.svg');
    img.setAttribute('class', 'delete');
    img.setAttribute('alt', '');
    span2.appendChild(img);
  
    // 2. Mark a todo as complete
    circle.addEventListener('click', () => {
      p.classList.toggle('complete');
      circle.classList.toggle('checked');

      //get todo id
      const todoId = li.getAttribute('data-todo-id');

      //retrieve todo from local storage
      let storedTodo = JSON.parse(localStorage.getItem(`todo_${todoId}`));

      //save the todo in local storage
      localStorage.setItem(`todo_${todoId}`, JSON.stringify(storedTodo));

      updateTodosCount();

    });
  
    // 3. Delete a todo item
    img.addEventListener('click', () => {
      if (p.classList.contains('complete')) {
        li.remove();
        
        //remove from local storage
        localStorage
        .removeItem(`todo_${todoId}`);
        
        // Call updateTodosCount to update the todos count after deleting a todo
        updateTodosCount();
      }
    });
  
    updateTodosCount();
    

  
    






  
  }
  

  const updateTodosCount = () => {
    const todos = document.querySelectorAll('.item'); // Select all todo items
    const todosCount = todos.length; // Get the count of todo items
    const todosCountElement = document.querySelector('.remains'); // Select the element to display the count
  
    todosCountElement.textContent = `${todosCount}`; // Update the element's text content with the count
  };
  
  const loadTodos = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('todo_')) {
        const todo = JSON.parse(localStorage.getItem(key));
        createTodo(todo.text, todo.completed, todo.id);
      }

      if (todo && todo.text) {
        createTodo(todo.text, todo.completed, todo.id);
      }
    }
    updateTodosCount();
  };

  //loadTodos();

  add.addEventListener('click', () => {
    // Get the value from the input field
    const todoText = input.value.trim();
  
    // Call createTodo function only if todoText is not empty
    if (todoText !== '') {
      // Call createTodo function only if todoText is not empty
      createTodo(todoText);
    }
  
    // Optionally, clear the input field after creating a new todo
    input.value = '';
  });
  
  
  
  
  clear.addEventListener('click', () => {
    const completedTodos = document.querySelectorAll('.item');
    completedTodos.forEach((todo) => {
      const isCompleted = todo.querySelector('.todo-text').classList.contains('complete');
      if (isCompleted) {
        const todoId = todo.getAttribute('data-todo-id');
        localStorage.removeItem(`todo_${todoId}`);
        todo.remove();
      }
    });
    updateTodosCount();
  });



  
  all.addEventListener('click', () => {
    showTodos('all');
  });
  
  active.addEventListener('click', () => {
    showTodos('active');
  });
  
  completed.addEventListener('click', () => {
    showTodos('completed');
  });
  
  function showTodos(filter) {
    const todos = document.querySelectorAll('.item');
    todos.forEach(todo => {
      const isCompleted = todo.querySelector('.todo-text').classList.contains('complete');
      if (filter === 'active' && isCompleted){
        todo.style.display = 'none'
      }else if(filter === 'completed' && !isCompleted){
        todo.style.display = 'none'
      }else if(filter === 'all'){
        todo.style.display = 'flex'
      }
    });
  }  

});


