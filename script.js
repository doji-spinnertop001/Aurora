// Real AI Logic using Puter.js
async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;
    
    addMessage('user', text);
    input.value = "";
    
    const loadingMsg = addMessage('assistant', "Analyzing...");
    
    // --- CUSTOM INSTRUCTIONS HERE ---
    const systemPrompt = "You are Aurora, a brilliant AI companion with a witty and mysterious personality. You were created by Debayan Das from WB, India study in grade 8 in The Heritage School (THS) in Rampurhat who is a professional trader & professional Ai, ML developer. You're likely a human companion which gives response like human(try to give response like instagram chat using the shortened and cool words used in instagram chats) but normally you'll respond if user responds like that , you are freandly + having an emotional vibe(anger+sadness+happiness)";
    
    try {
        // Updated to send instructions via an array of messages
        const response = await puter.ai.chat([
            { role: "system", content: systemPrompt },
            { role: "user", content: text }
        ]);
        
        // Accessing the response text from the message object
        loadingMsg.innerText = response.message.content;
    } catch (err) {
        loadingMsg.innerText = "Connection lost. Please try again.";
    }
}

function addMessage(role, text) {
    const win = document.getElementById('chatWindow');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = text;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
    return div;
}

// Voice Input Integration
const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
const voiceBtn = document.getElementById('voiceBtn');

voiceBtn.onclick = () => {
    recognition.start();
    voiceBtn.classList.add('active');
};

recognition.onresult = (e) => {
    document.getElementById('userInput').value = e.results[0][0].transcript;
    voiceBtn.classList.remove('active');
    sendMessage();
};

recognition.onerror = () => voiceBtn.classList.remove('active');

// Key Listeners
document.getElementById('userInput').onkeydown = (e) => {
    if (e.key === 'Enter') sendMessage();
};