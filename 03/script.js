"use strict";

const toDoItemsArray = localStorage.getItem("toDoItems") ? JSON.parse(localStorage.getItem("toDoItems")) : []

function hideIfEmpty() {
  if (toDoItemsArray.length === 0) {
    listTable.style.display = 'none';
  } else {
    listTable.style.display = 'table';
  }
}

function newItemAdd(inputItem, priority) {
  const newItem = {
    isDone: "No",
    value: inputItem.value,
    priority: priority.value
  }
  toDoItemsArray.push(newItem)
  localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray))
}


const list = document.querySelector(".toDoList")
const listTable = document.createElement("table")
listTable.style.border = "1px solid black"
listTable.style.borderCollapse = "collapse"

function displayList() {
  listTable.innerHTML = ""

  const listTableHeader = document.createElement("thead")
  const listTableHeaderRow = document.createElement("tr")
  const listTableTh1 = document.createElement("th")
  listTableTh1.textContent = "Status"
  const listTableTh2 = document.createElement("th")
  listTableTh2.textContent = "Task"
  const listTableTh3 = document.createElement("th")
  listTableTh3.textContent = "Priority"
  const listTableTh4 = document.createElement("th")
  listTableTh4.textContent = "Edit"
  const listTableBody = document.createElement("tbody")

  listTableHeader.append(listTableHeaderRow)
  listTableHeaderRow.append(listTableTh1, listTableTh2, listTableTh3, listTableTh4)
  listTable.append(listTableHeader, listTableBody)

  for (let i = 0; i < toDoItemsArray.length; i++) {
    const listItem = document.createElement("tr")

    const listItemCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = toDoItemsArray[i].isDone === "Yes";
    listItemCheckbox.append(checkbox);

    const listItemText = document.createElement("td")
    listItemText.textContent = toDoItemsArray[i].value
    listItemText.style.width = "300px"
    if (toDoItemsArray[i].isDone === "Yes") {
      listItemText.style.textDecoration = "line-through"
    }

    const listItemPriority = document.createElement("td")
    listItemPriority.textContent = toDoItemsArray[i].priority
    listItemPriority.style.textAlign = "center"
    listItemPriority.style.width = "80px"
    if (toDoItemsArray[i].priority === "high") {
      listItemPriority.style.color = "red"
    }
    else if (toDoItemsArray[i].priority === "medium") {
      listItemPriority.style.color = "orange"
    }
    else {
      listItemPriority.style.color = "green"
    }

    const listItemEdit = document.createElement("td")
    listItemEdit.setAttribute("class", "fa-solid fa-pen-to-square")

    const listItemDelete = document.createElement("td")
    listItemDelete.setAttribute("class", "fa-solid fa-trash")

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        listItemText.style.textDecoration = "line-through";
        toDoItemsArray[i].isDone = "Yes";
        localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray));
      } else {
        listItemText.style.textDecoration = "none";
        toDoItemsArray[i].isDone = "No";
        localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray));
      }
    });

    listItemEdit.addEventListener("click", () => {
      const text = listItemText.textContent;
      listItemText.innerHTML = "";
    
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = text;
      inputField.style.width = "300px"

      inputField.addEventListener("keypress", e => {
        if (e.key === "Enter") {
          updateTask()
        }
      });
      inputField.addEventListener("blur", () => {
        updateTask()
      });

      function updateTask() {
        toDoItemsArray[i].value = inputField.value;
        localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray));
        displayList();
      }
    
      listItemText.append(inputField)
      inputField.focus()
    })

    listItemDelete.addEventListener("click", () => {
      listItem.remove()
      toDoItemsArray.splice(i, 1)
      hideIfEmpty()
      localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray))
    })
      
    listItem.append(listItemCheckbox, listItemText, listItemPriority, listItemEdit, listItemDelete)
    listTableBody.append(listItem)
    list.append(listTable)
  }
}

// add to list EventListener 
document.querySelector(".toDoInputAdd").addEventListener("click", e => {
  e.preventDefault()
  localStorage.clear()
  if (toDoItemsArray.length > 0) {
    const table = document.querySelector("table")
    table.remove()
  }
  const inputItem = document.querySelector(".toDoInputItem")
  const priority = document.querySelector(".toDoInputPriority")
  newItemAdd(inputItem, priority)
  displayList()
  hideIfEmpty()
})

displayList()