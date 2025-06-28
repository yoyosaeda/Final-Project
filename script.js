// ------------------------- < Dark Mode Changes ------------------------------
let dark = document.querySelector("nav .dark");
let nav = document.querySelector("nav");
let footer = document.querySelector("footer");
let cards = document.querySelectorAll("body > div .card");
let titles = document.querySelectorAll("body > div .title");
let servicesCards = document.querySelector(".Services .cards");
let contact = document.querySelector(".contact");
let reposDark = document.querySelector(".repos");

const savedMode = localStorage.getItem("mode");

if (savedMode) {
  document.body.classList.add(savedMode);
  dark.classList.add(savedMode);
  nav.classList.add(savedMode);
  footer.classList.add(savedMode);
  try {
    contact.classList.add(savedMode);
  } catch (error) {
    console.log(error);
  }
  cards.forEach((a) => {
    a.classList.add(savedMode);
  });
  titles.forEach((a) => {
    a.classList.add(savedMode);
  });
  try {
    servicesCards.classList.add(savedMode);
  } catch (error) {
    console.log(error);
  }
} else {
  document.body.classList.add("light-mode");
  dark.classList.add("light-mode");
  nav.classList.add("light-mode");
  footer.classList.add("light-mode");
  contact.classList.add("light-mode");
  cards.forEach((a) => {
    a.classList.add("light-mode");
  });
  titles.forEach((a) => {
    a.classList.add("light-mode");
  });
  servicesCards.classList.add("light-mode");
}

dark.addEventListener("click", () => {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.replace("light-mode", "dark-mode");
    dark.classList.replace("light-mode", "dark-mode");
    nav.classList.replace("light-mode", "dark-mode");
    footer.classList.replace("light-mode", "dark-mode");
    try {
      contact.classList.replace("light-mode", "dark-mode");
    } catch (error) {
      console.log(error);
    }
    cards.forEach((a) => {
      a.classList.replace("light-mode", "dark-mode");
    });
    titles.forEach((a) => {
      a.classList.replace("light-mode", "dark-mode");
    });
    try {
      servicesCards.classList.replace("light-mode", "dark-mode");
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem("mode", "dark-mode");
  } else {
    document.body.classList.replace("dark-mode", "light-mode");
    dark.classList.replace("dark-mode", "light-mode");
    nav.classList.replace("dark-mode", "light-mode");
    footer.classList.replace("dark-mode", "light-mode");
    try {
      contact.classList.replace("dark-mode", "light-mode");
    } catch (error) {
      console.log(error);
    }
    cards.forEach((a) => {
      a.classList.replace("dark-mode", "light-mode");
    });
    titles.forEach((a) => {
      a.classList.replace("dark-mode", "light-mode");
    });
    try {
      servicesCards.classList.replace("dark-mode", "light-mode");
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem("mode", "light-mode");
  }
});

// -------------------------  Dark Mode Changes > ------------------------------

// -----------------------------------------------------------------------------

// ------------------------- < To Do List Changes ------------------------------

let listInput = document.querySelector(".to-do-card .card .top input");
let addBtn = document.querySelector(".to-do-card .card .top button");
let listUl = document.querySelector(".to-do-card .card #list");
let counter = document.querySelector(".to-do-card .card #count");
let doneCounter = document.querySelector(".to-do-card .card #doneCount");
// let CheckedCounter = document.querySelector(".to-do-card .card #checkedCount");

let checkSymbol = '<i class="fa-solid fa-check"></i>';
let trashSymbol = '<i class="fa-solid fa-trash"></i>';

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  let remaining = tasks.filter((task) => !task.done).length;
  let doneRemaining = tasks.filter((task) => task.done).length;
  try {
    counter.textContent = `You have ${remaining} task(s) left.`;
  } catch (error) {
    console.log(error);
  }
  try {
    doneCounter.textContent = `You have ${doneRemaining} Done task(s) left.`;
  } catch (error) {
    console.log(error);
  }
}

function createTaskElement(task, index) {
  let list = document.createElement("li");
  list.className = task.done ? "done" : "";

  let span = document.createElement("span");
  span.textContent = task.text;

  let doneBtn = document.createElement("button");
  doneBtn.innerHTML = checkSymbol;
  doneBtn.className = "done-btn";
  doneBtn.onclick = () => {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = trashSymbol;
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  list.appendChild(span);
  list.appendChild(doneBtn);
  list.appendChild(deleteBtn);
  return list;
}

try {
  function renderTasks() {
    try {
      listUl.innerHTML = "";
    } catch (error) {
      console.log(error);
    }
    tasks.forEach((task, index) => {
      let li = createTaskElement(task, index);
      try {
        listUl.appendChild(li);
      } catch (error) {
        console.log(error);
      }
    });
    updateCounter();
  }
} catch (error) {
  console.log(error);
}

try {
  addBtn.addEventListener("click", () => {
    let text = listInput.value.trim();
    if (text !== "") {
      tasks.push({ text: text, done: false });
      listInput.value = "";
      saveTasks();
      renderTasks();
    }
  });
} catch (error) {
  console.log(error);
}

renderTasks();

// -------------------------  To Do List Changes > ------------------------------

// -----------------------------------------------------------------------------

// ------------------------- < Repos Fetching ------------------------------


try {
  document.getElementById("getRepos").addEventListener("click", async () => {
    const apiUrl = document.getElementById("apiInput").value.trim();
    const container = document.getElementById("repoContainer");
    container.innerHTML = "";

    if (!apiUrl.includes("api.github.com")) {
      return (container.innerHTML =
        "<p> Please enter a valid GitHub API URL.</p>");
    }

    try {
      const response = await fetch(apiUrl);
      const repos = await response.json();

      localStorage.setItem("github_repos", JSON.stringify(repos));

      repos.forEach((repo) => {
        const card = document.createElement("div");
        card.classList.add("repo-card");
        card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
        container.appendChild(card);
      });
    } catch (error) {
      container.innerHTML = `<p>⚠ Error fetching repos: ${error.message}</p>`;
    }
  });
} catch (error) {
  console.log(error);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedRepos = localStorage.getItem("github_repos");
  const container = document.getElementById("repoContainer");

  if (savedRepos) {
    const repos = JSON.parse(savedRepos);

    repos.forEach((repo) => {
      const card = document.createElement("div");
      card.classList.add("repo-card");
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      container.appendChild(card);
    });
  }
});

let clearBtn = document.getElementById("clearBtn");

try {
  clearBtn.addEventListener("click", () => {
    const container = document.getElementById("repoContainer");
    localStorage.removeItem("github_repos");
    document.getElementById("repoContainer").innerHTML =
      "<p>Saved repos cleared.</p>";
  });
} catch (error) {
  console.log(error);
}

// ------------------------- Repos Fetching >------------------------------

