"use strict";

const toDoListContainer = document.createElement("div");
const toDoListH1 = document.createElement("h1")
const toDoForm = document.createElement("form");
const toDoInput = document.createElement("input");
const toDoPriority = document.createElement("select");
const toDoPriorityLow = document.createElement("option");
const toDoPriorityMedium = document.createElement("option");
const toDoPriorityHigh = document.createElement("option");
const addToListButton = document.createElement("button");

const table = document.createElement("table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");

toDoListH1.textContent = "To Do List"
toDoListH1.style.textAlign = "center"

toDoInput.style.width = "300px";
toDoInput.style.height = "25px";
toDoPriority.style.height = "30px";
addToListButton.style.height = "30px";

document.body.append(toDoListContainer);
toDoListContainer.append(toDoListH1, toDoForm);
toDoForm.append(toDoInput, toDoPriority, addToListButton);
toDoListContainer.append(table);
table.append(thead);
table.append(tbody);

thead.innerHTML =
  "<tr><th id='uzduotisHeader'>Užduotis</th><th id='svarbaHeader'>Svarba</th><th id='deleteHeader'></th></tr>";

// document.getElementById("deleteHeader").textContent = "";

document.getElementById("uzduotisHeader").style.paddingRight = "50px";
document.getElementById("svarbaHeader").style.paddingRight = "50px";
document.getElementById("uzduotisHeader").style.paddingTop = "50px";
document.getElementById("svarbaHeader").style.paddingTop = "50px";
document.getElementById("uzduotisHeader").style.borderBottom = "2px solid black";
document.getElementById("svarbaHeader").style.borderBottom = "2px solid black";

table.style.borderBottom = "2px solid black";

addToListButton.textContent = "Add";

toDoPriorityHigh.value = "high";
toDoPriorityHigh.textContent = "High";
toDoPriorityMedium.value = "medium";
toDoPriorityMedium.textContent = "Medium";
toDoPriorityLow.value = "low";
toDoPriorityLow.textContent = "Low";

toDoPriority.appendChild(toDoPriorityHigh);
toDoPriority.appendChild(toDoPriorityMedium);
toDoPriority.appendChild(toDoPriorityLow);

addToListButton.addEventListener("click", function (event) {
  event.preventDefault();

  const firstInputValue = toDoInput.value;
  const secondInputValue = toDoPriority.value;

  if (firstInputValue.trim() === "" || secondInputValue.trim() === "") {
    alert("Iveskite kokia uzduoti norite prideti.");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const checkedStates = JSON.parse(localStorage.getItem("checkedStates")) || [];

  tasks.push({ firstInputValue, secondInputValue });
  checkedStates.push(false);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("checkedStates", JSON.stringify(checkedStates));

  updateTable();
});

function updateTable() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const checkedStates = JSON.parse(localStorage.getItem("checkedStates")) || [];

  tbody.innerHTML = "";

  if (tasks.length === 0) {
    table.style.display = "none";
    return;
  } else {
    table.style.display = "";
  }

  tasks.forEach((task, index) => {
    const newRow = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.textContent = task.firstInputValue;
    cell1.style.borderRight = "2px solid black";

    const cell2 = document.createElement("td");
    cell2.textContent = task.secondInputValue;

    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = checkedStates[index];

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        cell1.style.backgroundColor = "lightgreen";
        cell2.style.backgroundColor = "lightgreen";
      } else {
        cell1.style.backgroundColor = "";
        cell2.style.backgroundColor = "";
      }

      checkedStates[index] = checkbox.checked;
      localStorage.setItem("checkedStates", JSON.stringify(checkedStates));
    });

    checkboxCell.appendChild(checkbox);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.borderRadius = "50px";
    deleteButton.style.backgroundColor = "red";
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      checkedStates.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("checkedStates", JSON.stringify(checkedStates));
      updateTable();
    });

    deleteCell.appendChild(deleteButton);

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(checkboxCell);
    newRow.appendChild(deleteCell);

    if (checkbox.checked) {
      cell1.style.backgroundColor = "lightgreen";
      cell2.style.backgroundColor = "lightgreen";
    }

    tbody.appendChild(newRow);
  });
  toDoInput.value = "";
}

updateTable();
// 