document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const chatForm = document.getElementById("chatForm");
    
    // Get the username from localStorage
    const username = localStorage.getItem('chatUserName');
    if (!username) {
        // If the username is not found, redirect to the login page
        alert("Please enter your username.");
        window.location.href = "LoginPage.html";
        return;
    }

    // Fetch message history
    fetch("http://localhost:8080/messages")
        .then(response => response.json())
        .then(messages => {
            // Sort messages by timestamp
            messages.sort((a, b) => a.timestamp - b.timestamp);
            messages.forEach(message => {
                addMessageToUI(message, message.username === username ? "sent" : "received");
            });
        })
        .catch(error => console.error("Failed to fetch messages:", error));

    // Connect to WebSocket
    const socket = new WebSocket(`ws://localhost:8080/chat-socket?username=${username}`);

    socket.addEventListener("open", () => {
        console.log("WebSocket connection established");
    });

    socket.addEventListener("message", event => {
        const message = JSON.parse(event.data);
        // Only render the message if it was sent by another user
        if (message.username !== username) {
            addMessageToUI(message, "received");
        }
    });

    socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
    });

    // Handle the case where the username is already in use
    socket.addEventListener("close", event => {
        if (event.code === 1008) { // Custom code for `MemberAlreadyExistsException`
            alert("Username already in use. Please choose a different name.");
            window.location.href = "LoginPage.html";
        }
    });

    // Send message on form submission
    chatForm.addEventListener("submit", event => {
        event.preventDefault(); // Prevent default form submission
        const text = messageInput.value.trim();
        if (text) {
            socket.send(text);
            addMessageToUI({ text, username, timestamp: Date.now() }, "sent");
            messageInput.value = "";
        }
    });

    // Utility function to add messages to the UI
    function addMessageToUI({ text, username: sender, timestamp }, type) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", type);
        messageElement.innerHTML = `
            <strong>${sender}</strong><br>
            <p>${text}</p>
            <small class="timestamp">${formatTimestamp(timestamp)}</small>
        `;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    }

    // Utility function to format timestamp as "HH:MM"
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
