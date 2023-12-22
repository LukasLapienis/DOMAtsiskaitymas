"use strict";

const createListForm = document.createElement("form");
createListForm.style.display = "grid"
document.body.append(createListForm);

const inputUlCount = document.createElement("input");
inputUlCount.setAttribute("type", "number");
inputUlCount.setAttribute("placeholder", "ul list");
const inputOlCount = document.createElement("input");
inputOlCount.setAttribute("type", "number");
inputOlCount.setAttribute("placeholder", "ol list");
const createListButton = document.createElement("button");
createListButton.textContent = "Create LIST";
createListForm.append(inputUlCount, inputOlCount, createListButton);

const listContainer = document.createElement("div")
document.body.appendChild(listContainer)

createListButton.addEventListener("click", (event) => {
  event.preventDefault();
  const listCheck = document.getElementById("ul")
  if(listCheck) {
    listCheck.remove()
  }
  const createOlLiCount = inputOlCount.value;
  const createUlLiCount = inputUlCount.value;
  inputOlCount.value = "";
  inputUlCount.value = "";

  const createUl = document.createElement("Ul");
  listContainer.appendChild(createUl)

  for (let ulLiCount = 0; ulLiCount < createUlLiCount; ulLiCount++) {
    const createUlLi = document.createElement("li");
    createUlLi.textContent = "unordered"
    const createOl = document.createElement("ol");
    createUl.appendChild(createUlLi)
    createUlLi.appendChild(createOl)

    for (let olLiCount = 0; olLiCount < createOlLiCount; olLiCount++) {
      const createOlLi = document.createElement("li");
      createOlLi.textContent = "ordered"
      createOl.appendChild(createOlLi)
    }
  }
});