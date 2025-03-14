// Load chat history when the page loads
document.addEventListener("DOMContentLoaded", loadChatList);

let currentChatId = null;

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("messages");

    if (userInput.trim() === "") return;

    const userMessage = `<div class="user-message">${userInput}</div>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("user-input").value = '';

    // Save message to history
    saveMessage(userMessage);

    fetch("http://127.0.0.1:5000/predict", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: [userInput] }) 
    })
    .then(response => response.json())
    .then(data => {
        // Fix: data.disease is a string, not an array
        let botMessage = data.disease 
            ? `<div class="bot-message">Predicted Disease: ${data.disease} (Confidence: ${data.confidence}%)</div>`
            : `<div class="bot-message">Error: No disease prediction found.</div>`;
        
        // Add warning messages if any
        if (data.warning) {
            botMessage += `<div class="bot-message warning">${data.warning}</div>`;
        }
        
        // Add note for low confidence predictions
        if (data.note) {
            botMessage += `<div class="bot-message note">${data.note}</div>`;
        }

        chatBox.innerHTML += botMessage;
        saveMessage(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        const errorMessage = `<div class="bot-message">Error: Something went wrong.</div>`;
        chatBox.innerHTML += errorMessage;
        saveMessage(errorMessage);
    });
}

function saveMessage(message) {
    if (!currentChatId) {
        currentChatId = `chat-${Date.now()}`;
        addChatToList(currentChatId);
    }
    let chatHistory = JSON.parse(localStorage.getItem(currentChatId)) || [];
    chatHistory.push(message);
    localStorage.setItem(currentChatId, JSON.stringify(chatHistory));
}

function loadChat(chatId) {
    currentChatId = chatId;
    document.getElementById("messages").innerHTML = JSON.parse(localStorage.getItem(chatId)).join("");
}

function addChatToList(chatId) {
    let chatList = document.getElementById("chat-list");
    let li = document.createElement("li");
    li.innerHTML = `Chat ${chatId.split('-')[1]} <button class="delete-btn" onclick="deleteChat('${chatId}')"><i class="fas fa-trash-alt"></i></button>`;
    li.classList.add("chat-item");
    li.onclick = () => loadChat(chatId);
    chatList.appendChild(li);
}

let chatIdToDelete = null; // Variable to store the chat ID to delete

function deleteChat(chatId) {
    chatIdToDelete = chatId; // Store the chat ID to delete
    document.getElementById('delete-modal').style.display = 'flex'; // Show the confirmation modal
}

document.getElementById('confirm-delete').addEventListener('click', function() {
    // Delete the chat if the user confirms
    localStorage.removeItem(chatIdToDelete);
    document.getElementById('chat-list').innerHTML = ''; // Clear the chat list
    loadChatList(); // Reload the chat list
    document.getElementById('delete-modal').style.display = 'none'; // Hide the modal
});

document.getElementById('cancel-delete').addEventListener('click', function() {
    // Close the modal without deleting the chat
    document.getElementById('delete-modal').style.display = 'none';
});

function loadChatList() {
    let keys = Object.keys(localStorage);
    keys.forEach(addChatToList);
}

// Event Listeners
document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("new-chat").addEventListener("click", () => { 
    currentChatId = null; 
    document.getElementById("messages").innerHTML = ""; 
});
