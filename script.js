// Initialize SunWeb with your API key
const sunweb = new SunWeb(
  'https://api.trongrid.io',
  'https://api.trongrid.io',
  'https://api.trongrid.io',
  'YOUR_PRIVATE_KEY',
  'de182418-690a-44f6-b73a-d4001ed780d2'
);

// Get references to DOM elements
const inputText = document.getElementById('input-text');
const sendButton = document.getElementById('send-button');
const messageOutput = document.querySelector('.message-output');

// Add event listener to the send button
sendButton.addEventListener('click', () => {
  const message = inputText.value.trim();
  if (message) {
    displayMessage(message, 'user');
    processMessage(message);
    inputText.value = '';
  }
});

// Display a message in the chat interface
function displayMessage(message, sender) {
  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble', sender);
  messageBubble.textContent = message;
  messageOutput.appendChild(messageBubble);
  messageOutput.scrollTop = messageOutput.scrollHeight;
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
