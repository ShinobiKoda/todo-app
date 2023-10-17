const append = document.querySelector('.append');
const input = document.getElementById('todo_input');

// 1. Create a new todo item
const CreateTodo = () => {
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
  p.textContent = 'Complete online JavaScript course';
  span.appendChild(p);

  const span2 = document.createElement('span');
  span2.setAttribute('class', 'delete');
  li.appendChild(span2);

  const img = document.createElement('img');
  img.setAttribute('src', './assets/images/icon-cross.svg');
  img.setAttribute('class', 'delete');
  img.setAttribute('alt', '');
  span2.appendChild(img);

  const hr = document.createElement('hr');
  append.appendChild(hr);

  // 2. Mark a todo as complete
  circle.addEventListener('click', () => {
    p.classList.toggle('complete');
    circle.classList.toggle('checked');
  });

  // 3. Delete a todo item
  img.addEventListener('click', () => {
    if (p.classList.contains('complete')) {
      li.remove();
      hr.remove();
    }
    
  });

  // 4. Clear all completed todos



}
CreateTodo();