const chatBox = document.getElementById("chatArea");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");

function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = async () => {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  try {
    const res = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    addMessage("wolf", "🐺 Wolf: " + data.wolf);
    addMessage("sage", "🧘 Sage: " + data.sage);
  } catch (err) {
    addMessage("system", "❌ Server error");
  }
};
