const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const apiKey = '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';
let messageHistory = [
    { role: "system", content: "You are a helpful AI assistant." }
];

let sessionMemory = {
    userName: '', 
    favoriteColor: '', 
    lastResult: null,
    facts: {},
    userQuestions: []
};

function addMessage(role, message) {
    chatContainer.innerHTML += `<p><strong>${role}:</strong> ${message}</p>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.createElement('p');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<strong>AI:</strong> Typing...';
    chatContainer.appendChild(typingIndicator);
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

function updateSessionMemory(key, value) {
    sessionMemory[key] = value;
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addMessage("You", userMessage);
    userInput.value = '';
    messageHistory.push({ role: "user", content: userMessage });

    showTypingIndicator();

    try {
        let responseMessage = '';

        if (/^\d+\s*[\+\-\*\/]\s*\d+$/.test(userMessage)) {
            const result = eval(userMessage);
            responseMessage = `The result of ${userMessage} is ${result}.`;
            updateSessionMemory('lastResult', result);
        } else if (userMessage.toLowerCase().includes('add')) {
            const lastResult = sessionMemory.lastResult || 0;
            const addValue = parseFloat(userMessage.match(/\d+/)[0]);
            const newResult = lastResult + addValue;
            responseMessage = `Adding ${addValue} to ${lastResult} gives ${newResult}.`;
            updateSessionMemory('lastResult', newResult);
        } else if (userMessage.toLowerCase().includes('my name is')) {
            const name = userMessage.split('is')[1].trim();
            sessionMemory.userName = name;
            responseMessage = `Nice to meet you, ${name}!`;
            updateSessionMemory('userName', name);
        } else if (userMessage.toLowerCase().includes('remember that')) {
            const fact = userMessage.split('remember that')[1].trim();
            sessionMemory.facts[fact] = true;
            responseMessage = `Got it! I'll remember that: "${fact}".`;
        } else if (userMessage.toLowerCase().includes('what do you remember')) {
            const facts = Object.keys(sessionMemory.facts);
            responseMessage = facts.length > 0 ? `I remember these things: ${facts.join(', ')}.` : "I don't remember anything yet.";
        } else {
            let context = `User's name is ${sessionMemory.userName}, and their favorite color is ${sessionMemory.favoriteColor}.`;

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        ...messageHistory,
                        { role: "user", content: context + " " + userMessage }
                    ],
                    temperature: 0.9,
                    max_tokens: 1024,
                    stream: false
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            responseMessage = data.choices[0].message.content;
        }

        removeTypingIndicator();
        addMessage("AI", responseMessage);
        messageHistory.push({ role: "assistant", content: responseMessage });
    } catch (error) {
        removeTypingIndicator();
        addMessage("Error", `Failed to get AI response. Error details: ${error.message}`);
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
