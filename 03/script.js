"use strict";

const toDoItemsArray = localStorage.getItem("toDoItems") ? JSON.parse(localStorage.getItem("toDoItems")) : []


function newItemAdd(inputItem) {
  toDoItemsArray.push(inputItem.value)
  localStorage.setItem("toDoItems", JSON.stringify(toDoItemsArray))
}

function displayList() {
  let list = "" 
  for (let i = 0; i < toDoItemsArray.length; i++) {
    const list = document.querySelector(".toDoList")
    const listItem = document.createElement("tr")
    const listItemText = document.createElement("td")
    listItemText.textContent = `${toDoItemsArray[i].task}`
    const listItemPriority = document.createElement("td")
    listItemPriority.textContent = `${toDoItemsArray[i].priority}`
    const listItemEdit = document.createElement("td")
    listItemEdit.setAttribute("class", "fa-solid fa-pen-to-square")
    const listItemDelete = document.createElement("td")
    listItemDelete.setAttribute("class", "fa-solid fa-trash")

    list.append(listItem)
    listItem.append(listItemText, listItemPriority, listItemEdit, listItemDelete)



  }
}

document.querySelector(".toDoInputAdd").addEventListener("click", () => {
  const inputItem = document.querySelector(".toDoInputItem")
  const priority = document.querySelector(".toDoInputPriority")
  newItemAdd(inputItem)
})


