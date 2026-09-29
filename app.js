(function () {
  "use strict";

  var STORAGE_KEY = "todos";

  var form = document.getElementById("todo-form");
  var input = document.getElementById("todo-input");
  var list = document.getElementById("todo-list");
  var emptyState = document.getElementById("empty-state");

  var todos = load();

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      /* storage unavailable; state stays in memory only */
    }
  }

  function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function addTodo(text) {
    todos.push({ id: createId(), text: text, completed: false });
    save();
    render();
  }

  function toggleTodo(id) {
    todos.forEach(function (todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    save();
    render();
  }

  function deleteTodo(id) {
    todos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    save();
    render();
  }

  function render() {
    list.innerHTML = "";

    todos.forEach(function (todo) {
      var li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.setAttribute("aria-label", "Mark \"" + todo.text + "\" complete");
      checkbox.addEventListener("change", function () {
        toggleTodo(todo.id);
      });

      var span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "\u2715";
      deleteBtn.setAttribute("aria-label", "Delete \"" + todo.text + "\"");
      deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });

    emptyState.classList.toggle("hidden", todos.length > 0);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text) {
      return;
    }
    addTodo(text);
    input.value = "";
    input.focus();
  });

  render();
})();
