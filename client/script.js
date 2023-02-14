import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300)
}


function typeText(element, text) {
  let index = 0;

  while (index < text.length) {
    setTimeout(() => {
      element.innerHTML += text.charAt(index);
      index++;
    }, 20)
  }
} //maybe need to change to if and setInterval


function createUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const stringNumber = randomNumber.toString(16);

  return `id-${timestamp}-${stringNumber}`
}

function showMessage(isAI, value, id) {
  return (
    `
    <div class="wrapper ${isAI && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img src="${isAI ? bot : user}"
            alt="${isAI ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${id}>${value}</div>
      </div>
    </div>
    `
  )
}


function handleSubmit(e) {
  e.preventDefault();

  const data = FormData(form);

  //user chat
  chatContainer.innerHTML += showMessage(false, data.get('prompt'));

  //bot chat
  const uniqueId = createUniqueId();
  chatContainer.innerHTML
}