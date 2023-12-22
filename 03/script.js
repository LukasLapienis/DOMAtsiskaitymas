// "use strict";

// // const priorityValue = document.getElementById('priority').value
// // console.log(priorityValue)

// const selectedValue = document.getElementById('priority');

// // Function to handle storing the selected value in local storage
// function storeSelectedValue() {
//   const selectedValues = selectedValue.value;
//   localStorage.setItem('selectedValue', selectedValues);
// }

// // Add an event listener to the select element for the 'change' event
// selectedValue.addEventListener('change', storeSelectedValue);



// // Call the function initially to store the default selected value (if needed)
// storeSelectedValue();




//   Uzduotis Nr.3
const doc = document;
const toDoListHeader = doc.createElement("h1")
toDoListHeader.textContent = "To Do List"
toDoListHeader.style.textAlign = "center"
const div = doc.createElement("div");
const forma = doc.createElement("form");
const firstInt = doc.createElement("input");
const secondInt = doc.createElement("select");
const highOption = doc.createElement("option");
const mediumOption = doc.createElement("option");
const lowOption = doc.createElement("option");
const appendBtn = doc.createElement("button");
const table = doc.createElement("table");
const thead = doc.createElement("thead");
const tbody = doc.createElement("tbody");

firstInt.style.backgroundColor = "pink";
firstInt.style.width = "300px";
firstInt.style.height = "30px";
firstInt.style.borderRadius = "10px";

secondInt.style.backgroundColor = "pink";
secondInt.style.borderRadius = "10px";
secondInt.style.height = "35px";

appendBtn.style.backgroundColor = "pink";
appendBtn.style.borderRadius = "10px";
appendBtn.style.height = "35px";

document.body.append(div);

div.append(toDoListHeader, forma);
forma.appendChild(firstInt);
forma.appendChild(secondInt);
forma.appendChild(appendBtn);
div.appendChild(table);
table.appendChild(thead);
table.appendChild(tbody);

thead.innerHTML =
  "<tr><th id='uzduotisHeader'>Užduotis</th><th id='svarbaHeader'>Svarba</th><th id='deleteHeader'></th></tr>";

doc.getElementById("deleteHeader").textContent = "";

doc.getElementById("uzduotisHeader").style.paddingRight = "50px";
doc.getElementById("svarbaHeader").style.paddingRight = "50px";
doc.getElementById("uzduotisHeader").style.paddingTop = "50px";
doc.getElementById("svarbaHeader").style.paddingTop = "50px";
doc.getElementById("uzduotisHeader").style.borderBottom = "2px solid black";
doc.getElementById("svarbaHeader").style.borderBottom = "2px solid black";

table.style.borderBottom = "2px solid black";

appendBtn.textContent = "Prideti";

highOption.value = "high";
highOption.textContent = "High";

mediumOption.value = "medium";
mediumOption.textContent = "Medium";

lowOption.value = "low";
lowOption.textContent = "Low";

secondInt.appendChild(highOption);
secondInt.appendChild(mediumOption);
secondInt.appendChild(lowOption);

appendBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const firstInputValue = firstInt.value;
  const secondInputValue = secondInt.value;

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
    const newRow = doc.createElement("tr");

    const cell1 = doc.createElement("td");
    cell1.textContent = task.firstInputValue;
    cell1.style.borderRight = "2px solid black";

    const cell2 = doc.createElement("td");
    cell2.textContent = task.secondInputValue;

    const checkboxCell = doc.createElement("td");
    const checkbox = doc.createElement("input");
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

    const deleteCell = doc.createElement("td");
    const deleteButton = doc.createElement("button");
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
  firstInt.value = "";
}

updateTable();
// 