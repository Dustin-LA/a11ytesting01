(function () {
  "use strict";

  var STORAGE_KEY = "todo-app.todos";

  var form = document.getElementById("todo-form");
  var input = document.getElementById("todo-input");
  var list = document.getElementById("todo-list");
  var emptyMessage = document.getElementById("empty-message");
  var status = document.getElementById("status");

  /** @type {{ id: string, text: string, completed: boolean }[]} */
  var todos = load();

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      /* Ignore storage errors (e.g. private mode). */
    }
  }

  function announce(message) {
    status.textContent = message;
  }

  function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function addTodo(text) {
    todos.push({ id: createId(), text: text, completed: false });
    save();
    render();
    announce('Added "' + text + '".');
  }

  function toggleTodo(id) {
    todos.forEach(function (todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        announce(
          '"' + todo.text + '" marked ' +
          (todo.completed ? "complete." : "incomplete.")
        );
      }
    });
    save();
    render();
  }

  function deleteTodo(id) {
    var removed = todos.find(function (todo) {
      return todo.id === id;
    });
    todos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    save();
    render();
    if (removed) {
      announce('Deleted "' + removed.text + '".');
    }
  }

  function render() {
    list.innerHTML = "";

    if (todos.length === 0) {
      emptyMessage.classList.remove("hidden");
    } else {
      emptyMessage.classList.add("hidden");
    }

    todos.forEach(function (todo) {
      var item = document.createElement("li");
      item.className = "todo-item" + (todo.completed ? " completed" : "");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.checked = todo.completed;
      checkbox.id = "todo-" + todo.id;
      checkbox.addEventListener("change", function () {
        toggleTodo(todo.id);
      });

      var label = document.createElement("label");
      label.className = "todo-label";
      label.htmlFor = checkbox.id;
      label.textContent = todo.text;

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute(
        "aria-label",
        'Delete "' + todo.text + '"'
      );
      deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      item.appendChild(checkbox);
      item.appendChild(label);
      item.appendChild(deleteBtn);
      list.appendChild(item);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    addTodo(text);
    input.value = "";
    input.focus();
  });

  render();
})();
