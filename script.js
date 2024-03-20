// Initialize SunWeb with your API key and private key
const sunweb = new SunWeb(
  'https://api.trongrid.io',
  'https://api.trongrid.io',
  'https://api.trongrid.io',
  'YOUR_PRIVATE_KEY',
  'de182418-690a-44f6-b73a-d4001ed780d2'
);

// Get references to DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

// Add event listener to the send button
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    displayMessage(message, 'user');
    processMessage(message);
    messageInput.value = '';
  }
});

// Display a message in the chat interface
function displayMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process the user's message and generate a response
function processMessage(message) {
  // Use SunWeb to interact with the Tron network
  sunweb.mainchain.trx.getBalance('YOUR_TRON_ADDRESS').then(balance => {
    const response = `Your Tron balance is ${balance} TRX.`;
    displayMessage(response, 'bot');
  }).catch(error => {
    const response = `Error: ${error.message}`;
    displayMessage(response, 'bot');
  });
}
