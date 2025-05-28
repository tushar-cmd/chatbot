let messageCount = 0;
let isTyping = false;

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('message-input').focus();
    hideQuickSuggestions();
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message && !isTyping) {
        addMessage(message, 'user');
        input.value = '';
        hideQuickSuggestions();
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateAIResponse(message);
            addMessage(response, 'ai');
        }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }
}

function sendQuickMessage(message) {
    document.getElementById('message-input').value = message;
    sendMessage();
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'ai' ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    
    // Handle markdown-like formatting
    const formattedText = formatMessage(text);
    messageText.innerHTML = formattedText;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    content.appendChild(messageText);
    content.appendChild(messageTime);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    messageCount++;
}

function formatMessage(text) {
    // Simple formatting for better readability
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

function generateAIResponse(userMessage) {
    const responses = {
        greeting: [
            "Hello! I'm excited to help you learn today. What subject interests you most?",
            "Hi there! What would you like to explore or learn about?",
            "Welcome! I'm here to make learning fun and easy. What can I help you with?"
        ],
        math: [
            "**Mathematics** is fascinating! Whether it's *algebra*, *calculus*, or *geometry*, I can break it down step by step. Let me know what specific concept you'd like to explore, and I'll explain it clearly with examples.",
            "Great choice! Math builds logical thinking. What level are you working at? I can help with:\n• Basic arithmetic\n• Algebra and equations\n• Calculus and derivatives\n• Statistics and probability\n• Geometry and trigonometry",
            "I love helping with math! From basic arithmetic to advanced calculus, I can explain concepts clearly. What's your specific question or topic?"
        ],
        science: [
            "**Science** is amazing! I can help with:\n• *Physics* - from mechanics to quantum theory\n• *Chemistry* - molecular structures to reactions\n• *Biology* - from cells to ecosystems\n• *Earth Science* - geology, weather, and climate\n\nWhat interests you most?",
            "Excellent! Science helps us understand our world. What specific scientific concept or phenomenon would you like to learn about? I can explain it step by step.",
            "Science is full of wonder! Whether you want to understand how things work, explore natural phenomena, or dive into scientific theories, I'm here to help. What's on your mind?"
        ],
        programming: [
            "**Programming** is a superpower! I can help with:\n• *Python* - great for beginners\n• *JavaScript* - for web development\n• *Java* - object-oriented programming\n• *C++* - system programming\n• *Data structures and algorithms*\n\nWhat would you like to learn or build?",
            "Coding is creative problem-solving! Whether you're a beginner learning your first language or advanced developer tackling complex algorithms, I can help with concepts, debugging, or project ideas. What's your focus?",
            "Great choice! Programming opens up endless possibilities. What language or concept would you like to explore? I can provide examples, explain concepts, and help you practice."
        ],
        physics: [
            "**Quantum Physics** is mind-bending! Let me break it down:\n\n*Key Concepts:*\n• Particles behave like waves\n• Uncertainty principle\n• Quantum superposition\n• Wave-particle duality\n\nThink of it like this: imagine a coin that's spinning in the air - until it lands, it's both heads AND tails simultaneously. That's quantum superposition!\n\nWhat aspect would you like me to explain further?",
            "Physics is the foundation of understanding our universe! Whether it's *classical mechanics*, *thermodynamics*, *electromagnetism*, or *modern physics*, I can explain the concepts with real-world examples. What interests you?",
            "Let's explore physics together! From the motion of planets to the behavior of subatomic particles, physics explains how everything works. What topic would you like to dive into?"
        ],
        history: [
            "**World War II** had complex causes:\n\n*Primary Factors:*\n• Treaty of Versailles aftermath\n• Economic depression\n• Rise of totalitarian regimes\n• Failure of League of Nations\n• Appeasement policies\n\n*Key Timeline:*\n• 1933: Hitler rises to power\n• 1939: Germany invades Poland\n• 1941: Pearl Harbor attack\n\nWould you like me to elaborate on any of these factors?",
            "History helps us understand how we got to where we are today! I can explore any period, civilization, or historical event with you. What era or topic interests you most?",
            "Great question about history! Understanding the past helps us make sense of the present. What specific period, event, or civilization would you like to explore?"
        ],
        default: [
            "That's a fascinating topic! I'd love to help you understand it better. Could you tell me more about what specifically you'd like to learn? The more details you provide, the better I can tailor my explanation to your needs.",
            "Interesting question! I'm here to help you learn about virtually any subject. Could you provide a bit more context about what you're trying to understand? Are you looking for:\n• Basic concepts\n• Detailed explanations\n• Practical examples\n• Problem-solving help",
            "Great question! I can help explain that concept. What's your current understanding of the topic, and what specific aspect would you like to know more about? This will help me give you the most useful explanation.",
            "I love curious minds! Learning is all about asking questions. Let me help you explore that topic. What specific aspect interests you most, and what level of detail would be most helpful?",
            "Excellent topic to explore! Learning is a journey, and I'm here to guide you through it. Could you tell me more about what you're trying to understand or what sparked your interest in this subject?"
        ]
    };
    
    const message = userMessage.toLowerCase();
    
    // Check for specific topics
    if (message.includes('quantum physics') || message.includes('quantum')) {
        return responses.physics[0];
    }
    
    if (message.includes('world war') || message.includes('wwii') || message.includes('ww2')) {
        return responses.history[0];
    }
    
    // Check for greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse(responses.greeting);
    }
    
    // Check for subject areas
    if (message.includes('math') || message.includes('algebra') || message.includes('calculus') || 
        message.includes('geometry') || message.includes('equation') || message.includes('derivative')) {
        return getRandomResponse(responses.math);
    }
    
    if (message.includes('science') || message.includes('physics') || message.includes('chemistry') || 
        message.includes('biology') || message.includes('experiment')) {
        return getRandomResponse(responses.science);
    }
    
    if (message.includes('programming') || message.includes('code') || message.includes('python') || 
        message.includes('javascript') || message.includes('java') || message.includes('coding')) {
        return getRandomResponse(responses.programming);
    }
    
    if (message.includes('history') || message.includes('historical') || message.includes('war') || 
        message.includes('ancient') || message.includes('civilization')) {
        return getRandomResponse(responses.history);
    }
    
    // Default response
    return getRandomResponse(responses.default);
}

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

function showTypingIndicator() {
    isTyping = true;
    document.getElementById('typing-indicator').style.display = 'block';
    document.getElementById('send-button').disabled = true;
}

function hideTypingIndicator() {
    isTyping = false;
    document.getElementById('typing-indicator').style.display = 'none';
    document.getElementById('send-button').disabled = false;
}

function hideQuickSuggestions() {
    if (messageCount > 0) {
        const suggestions = document.querySelector('.quick-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="message ai-message welcome-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">
                        <h3>Chat Cleared! 🧹</h3>
                        <p>Ready for a fresh start? What would you like to learn about?</p>
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
        messageCount = 0;
        document.querySelector('.quick-suggestions').style.display = 'block';
    }
}

function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    const overlay = document.getElementById('settings-overlay');
    
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = 'hidden'; // Keep body scroll locked for chat
    } else {
        panel.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function resetSettings() {
    if (confirm('Reset all settings to default values?')) {
        // Reset all form elements to default values
        document.getElementById('learning-level').value = 'intermediate';
        document.getElementById('response-style').value = 'detailed';
        document.getElementById('subject-focus').value = 'general';
        document.getElementById('show-steps').checked = true;
        document.getElementById('include-examples').checked = true;
        document.getElementById('follow-up-questions').checked = false;
        
        // Show confirmation
        const originalText = document.querySelector('.reset-settings').textContent;
        document.querySelector('.reset-settings').textContent = 'Reset Complete!';
        document.querySelector('.reset-settings').style.background = '#10b981';
        
        setTimeout(() => {
            document.querySelector('.reset-settings').textContent = originalText;
            document.querySelector('.reset-settings').style.background = '';
        }, 2000);
    }
}

// Close settings panel when clicking outside or pressing Escape
document.addEventListener('click', function(event) {
    const panel = document.getElementById('settings-panel');
    const settingsButton = document.querySelector('.settings-button');
    const settingsCloseBtn = document.querySelector('.settings-close-btn');
    const overlay = document.getElementById('settings-overlay');
    
    // Close if clicking on overlay
    if (event.target === overlay && panel.classList.contains('open')) {
        toggleSettings();
    }
    
    // Don't close if clicking inside the panel, on the settings button, or close button
    if (!panel.contains(event.target) && 
        !settingsButton.contains(event.target) && 
        !settingsCloseBtn?.contains(event.target) &&
        panel.classList.contains('open')) {
        
        // Only close if clicking outside the panel area (but not on overlay, handled above)
        if (event.target !== overlay) {
            toggleSettings();
        }
    }
});

// Handle Escape key to close settings
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const panel = document.getElementById('settings-panel');
        if (panel.classList.contains('open')) {
            toggleSettings();
        }
    }
});

// Handle settings changes
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for settings changes
    const settingsInputs = document.querySelectorAll('#settings-panel select, #settings-panel input');
    
    settingsInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Save settings to localStorage
            saveSettings();
            
            // Show brief feedback
            showSettingsSaved();
        });
    });
    
    // Load saved settings
    loadSettings();
});

function saveSettings() {
    const settings = {
        learningLevel: document.getElementById('learning-level').value,
        responseStyle: document.getElementById('response-style').value,
        subjectFocus: document.getElementById('subject-focus').value,
        showSteps: document.getElementById('show-steps').checked,
        includeExamples: document.getElementById('include-examples').checked,
        followUpQuestions: document.getElementById('follow-up-questions').checked
    };
    
    localStorage.setItem('naiveLearnerSettings', JSON.stringify(settings));
}

function loadSettings() {
    const savedSettings = localStorage.getItem('naiveLearnerSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        document.getElementById('learning-level').value = settings.learningLevel || 'intermediate';
        document.getElementById('response-style').value = settings.responseStyle || 'detailed';
        document.getElementById('subject-focus').value = settings.subjectFocus || 'general';
        document.getElementById('show-steps').checked = settings.showSteps !== false;
        document.getElementById('include-examples').checked = settings.includeExamples !== false;
        document.getElementById('follow-up-questions').checked = settings.followUpQuestions || false;
    }
}

function showSettingsSaved() {
    // Create or update a small notification
    let notification = document.querySelector('.settings-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'settings-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = 'Settings saved!';
    notification.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 2000);
} 