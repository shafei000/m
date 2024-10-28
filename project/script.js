async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const chatWindow = document.getElementById("chat-window");

  // Display user message in chat
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  userMessage.textContent = userInput.value;
  chatWindow.appendChild(userMessage);

  // Prepare the request payload for Hugging Face API
  const payload = {
    inputs: userInput.value, // Use plain text as input
    parameters: { max_length: 100 } // Adjust max tokens if needed
  };

  try {
    // Fetch bot response from Hugging Face API
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(result)
    if (response.ok) {
      const botReply = result[0].generated_text;
      
      // Display bot response in chat
      const botMessage = document.createElement("div");
      botMessage.classList.add("message", "bot-message");
      botMessage.textContent = botReply;
      chatWindow.appendChild(botMessage);
    } else {
      console.error("Error:", result);
      alert("There was an error with the model response.");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to connect to the Hugging Face API.");
  }

  // Clear input field
  userInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
