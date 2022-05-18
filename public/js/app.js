// const forcast = require("../../src/utils/forecast");

console.log("client side js file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...'
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        console.log("error ", error);
      } else {
        messageOne.textContent = data.forcast;
        messageTwo.textContent = data.location;
        forcast1 = data.forcast;
      }
    });
  });
});
