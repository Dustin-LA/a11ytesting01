// Simple todo app with localStorage persistence. No build step or dependencies.
(function () {
  "use strict";

  var STORAGE_KEY = "todo-app.items";

  /** @type {{ id: string, text: string, completed: boolean }[]} */
  var todos = loadTodos();
  var currentFilter = "all";

  var form = document.getElementById("todo-form");
  var input = document.getElementById("todo-input");
  var list = document.getElementById("todo-list");
  var emptyState = document.getElementById("empty-state");
  var itemCount = document.getElementById("item-count");
  var clearCompletedBtn = document.getElementById("clear-completed");
  var filterButtons = document.querySelectorAll(".btn-filter");

  function loadTodos() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveTodos() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      /* storage may be unavailable; app still works in-memory */
    }
  }

  function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function addTodo(text) {
    todos.push({ id: createId(), text: text, completed: false });
    saveTodos();
    render();
  }

  function toggleTodo(id) {
    todos = todos.map(function (t) {
      return t.id === id ? Object.assign({}, t, { completed: !t.completed }) : t;
    });
    saveTodos();
    render();
  }

  function deleteTodo(id) {
    todos = todos.filter(function (t) {
      return t.id !== id;
    });
    saveTodos();
    render();
  }

  function clearCompleted() {
    todos = todos.filter(function (t) {
      return !t.completed;
    });
    saveTodos();
    render();
  }

  function getVisibleTodos() {
    if (currentFilter === "active") {
      return todos.filter(function (t) {
        return !t.completed;
      });
    }
    if (currentFilter === "completed") {
      return todos.filter(function (t) {
        return t.completed;
      });
    }
    return todos;
  }

  function render() {
    var visible = getVisibleTodos();
    list.innerHTML = "";

    visible.forEach(function (todo) {
      var li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.setAttribute("aria-label", "Mark \"" + todo.text + "\" as " + (todo.completed ? "active" : "completed"));
      checkbox.addEventListener("change", function () {
        toggleTodo(todo.id);
      });

      var span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      var del = document.createElement("button");
      del.type = "button";
      del.className = "btn btn-delete";
      del.setAttribute("aria-label", "Delete \"" + todo.text + "\"");
      del.textContent = "\u00d7";
      del.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    });

    emptyState.hidden = visible.length !== 0;

    var remaining = todos.filter(function (t) {
      return !t.completed;
    }).length;
    itemCount.textContent = remaining + (remaining === 1 ? " item left" : " items left");

    var hasCompleted = todos.some(function (t) {
      return t.completed;
    });
    clearCompletedBtn.disabled = !hasCompleted;
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

  clearCompletedBtn.addEventListener("click", clearCompleted);

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentFilter = btn.getAttribute("data-filter");
      filterButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });

  render();
})();
