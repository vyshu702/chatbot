// Load intents from intents.json
let intents = [];

fetch('intents.json')
  .then(response => response.json())
  .then(data => {
    intents = data.intents;
  })
  .catch(error => console.error("Error loading intents:", error));

// A chatbot function that responds based on the intents.json file
function chatbot(input) {
  input = input.toLowerCase();
  for (let intent of intents) {
    for (let pattern of intent.patterns) {
      if (input.includes(pattern.toLowerCase())) {
        return intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
    }
  }
  return "Sorry, I don't understand that. Please try something else.";
}

// Display the user message on the chat
function displayUserMessage(message) {
  let chat = document.getElementById("chat");
  let userMessage = document.createElement("div");
  userMessage.classList.add("message");
  userMessage.classList.add("user");
  let userAvatar = document.createElement("div");
  userAvatar.classList.add("avatar");
  let userText = document.createElement("div");
  userText.classList.add("text");
  userText.innerHTML = message;
  userMessage.appendChild(userAvatar);
  userMessage.appendChild(userText);
  chat.appendChild(userMessage);
  chat.scrollTop = chat.scrollHeight;
}

// Display the bot message on the chat
function displayBotMessage(message) {
  let chat = document.getElementById("chat");
  let botMessage = document.createElement("div");
  botMessage.classList.add("message");
  botMessage.classList.add("bot");
  let botAvatar = document.createElement("div");
  botAvatar.classList.add("avatar");
  let botText = document.createElement("div");
  botText.classList.add("text");
  botText.innerHTML = message;
  botMessage.appendChild(botAvatar);
  botMessage.appendChild(botText);
  chat.appendChild(botMessage);
  chat.scrollTop = chat.scrollHeight;
}

// Send the user message and get the bot response
function sendMessage() {
  let input = document.getElementById("input").value;
  if (input) {
    displayUserMessage(input);
    let output = chatbot(input);
    setTimeout(function () {
      displayBotMessage(output);
    }, 1000);
    document.getElementById("input").value = "";
  }
}

// Add a click event listener to the button
document.getElementById("button").addEventListener("click", sendMessage);

// Add a keypress event listener to the input
document.getElementById("input").addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    sendMessage();
  }
});
