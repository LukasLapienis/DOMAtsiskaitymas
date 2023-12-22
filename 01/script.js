"use strict";

const buttonContainer = document.createElement("div");
document.body.append(buttonContainer);

const buttonAdd1 = document.createElement("button");
buttonAdd1.textContent = "add 1";
const buttonMinus1 = document.createElement("button");
buttonMinus1.textContent = "minus 1";
const buttonResultParagraph = document.createElement("p");
let countButtonClicks = 0;
buttonResultParagraph.textContent = `${countButtonClicks}`;

buttonContainer.append(buttonAdd1, buttonMinus1, buttonResultParagraph);

buttonAdd1.addEventListener("click", (event) => {
  event.preventDefault();
  countButtonClicks++;
  buttonResultParagraph.textContent = `${countButtonClicks}`;
  if (countButtonClicks % 2 == 0) {
    buttonAdd1.style.backgroundColor = "red";
  } else {
    buttonAdd1.style.backgroundColor = "grey";
  }
});

buttonMinus1.addEventListener("click", (event) => {
  event.preventDefault();
  countButtonClicks--;
  buttonResultParagraph.textContent = `${countButtonClicks}`;
  if (countButtonClicks % 2 == 0) {
    buttonMinus1.style.backgroundColor = "red";
  } else {
    buttonMinus1.style.backgroundColor = " grey";
  }
});
