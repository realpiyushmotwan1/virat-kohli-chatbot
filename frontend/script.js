async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message.trim()) return;

  appendToChat("You", message);
  input.value = "";

  showTyping();

  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  hideTyping();
  appendToChat("Virat Kohli", data.reply);
}

function appendToChat(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  document.getElementById("typing-indicator").classList.remove("hidden");
}

function hideTyping() {
  document.getElementById("typing-indicator").classList.add("hidden");
}
