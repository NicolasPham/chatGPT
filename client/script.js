import bot from './assets/bot.svg';
import user from './assets/user.svg';
import axios from 'axios';

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

  let interval = setInterval(() => {

    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index += 1;
    } else {
      clearInterval(interval);
    }

  }, 20)

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


async function handleSubmit(e) {
  e.preventDefault();

  const data = new FormData(form);

  //user chat
  chatContainer.innerHTML += showMessage(false, data.get('prompt'));
  form.reset();

  //bot chat
  const uniqueId = createUniqueId();
  chatContainer.innerHTML += showMessage(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv)

  // fetching data from server
  const response = await axios.post('https://nicolas-chatgpt.onrender.com/', { prompt: data.get('prompt') })
  console.log(response)
  clearInterval(loadInterval);
  messageDiv.innerHTML = "";

  if (response) {
    typeText(messageDiv, response.data)
  } else {
    messageDiv.innerHTML = "Something went wrong"
  }

}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.key === "Enter") {
    handleSubmit(e)
  }
})