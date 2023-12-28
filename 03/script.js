"use strict";


const toDoItemsArray = localStorage.getItem("toDoItems") ? JSON.parse(localStorage.getItem("toDoItems")) : []

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

  for (let i = 0; i < toDoItemsArray.length; i++) {
    const listItem = document.createElement("tr")

    const listItemCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = toDoItemsArray[i].isDone === "Yes";
    listItemCheckbox.appendChild(checkbox);

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
      localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray))
    })

    listItem.append(listItemCheckbox, listItemText, listItemPriority, listItemEdit, listItemDelete)
    listTable.append(listItem)
    list.append(listTable)
  }
}

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
})

displayList()