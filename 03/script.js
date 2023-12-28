"use strict";


const toDoItemsArray = localStorage.getItem("toDoItems") ? JSON.parse(localStorage.getItem("toDoItems")) : []

function newItemAdd(inputItem, priority) {
  const newItem = {
    value: inputItem.value,
    priority: priority.value
  }
  toDoItemsArray.push(newItem)
  localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray))
}

const list = document.querySelector(".toDoList")
const listTable = document.createElement("table")
listTable.style.border = "1px solid black"

function displayList() {
  listTable.innerHTML = ""

  for (let i = 0; i < toDoItemsArray.length; i++) {
    const listItem = document.createElement("tr")
    const listItemText = document.createElement("td")
    listItemText.textContent = toDoItemsArray[i].value
    const listItemPriority = document.createElement("td")
    listItemPriority.textContent = toDoItemsArray[i].priority
    const listItemEdit = document.createElement("td")
    listItemEdit.setAttribute("class", "fa-solid fa-pen-to-square")
    const listItemDelete = document.createElement("td")
    listItemDelete.setAttribute("class", "fa-solid fa-trash")

    listItemEdit.addEventListener("click", () => {
      const text = listItemText.textContent;
      listItemText.innerHTML = "";
    
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = text;

      inputField.addEventListener("blur", () => {
        toDoItemsArray[i].value = inputField.value;
        localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray));
        displayList();
      });

      listItemText.append(inputField)
    })

    listItemDelete.addEventListener("click", () => {
      listItem.remove()
      toDoItemsArray.splice(i, 1)
      localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray))
    })

    listItem.append(listItemText, listItemPriority, listItemEdit, listItemDelete)
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