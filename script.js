document.addEventListener('DOMContentLoaded', () => {
    // Initialize Engine
    const engine = new PromptEngine();

    // DOM Elements - Chat Pane
    const chatHistory = document.getElementById('chatHistory');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    // DOM Elements - Prompt Pane
    const promptInput = document.getElementById('promptInput');
    const suggestBtn = document.getElementById('suggestBtn');
    const promptOutput = document.getElementById('promptOutput');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // DOM Elements - Options
    const personaSelect = document.getElementById('personaSelect');
    const checkCot = document.getElementById('checkCot');
    const checkExamples = document.getElementById('checkExamples');

    // Logic: Clear All
    clearBtn.addEventListener('click', () => {
        if (confirm('모든 내용을 초기화하시겠습니까?')) {
            promptInput.value = '';
            promptOutput.value = '';
            copyBtn.disabled = true;
        }
    });

    // Logic: AI Prompt Enhancement
    suggestBtn.addEventListener('click', () => {
        const rawPrompt = promptInput.value.trim();
        if (!rawPrompt) {
            alert('초안 프롬프트를 먼저 입력해주세요.');
            return;
        }

        // UI State: Loading
        suggestBtn.classList.add('loading');
        suggestBtn.innerHTML = '<span class="magic-icon">✨</span> 제안 중...';
        suggestBtn.disabled = true;
        promptOutput.value = '';
        copyBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            const options = {
                includeCot: checkCot.checked,
                includeExamples: checkExamples.checked
            };
            const enhancedPrompt = engine.buildPrompt(rawPrompt, personaSelect.value, options);

            // Typewriter effect for output
            let i = 0;
            promptOutput.value = '';
            const typingInterval = setInterval(() => {
                promptOutput.value += enhancedPrompt.charAt(i);
                i++;
                if (i >= enhancedPrompt.length) {
                    clearInterval(typingInterval);
                    // UI State: Done
                    suggestBtn.classList.remove('loading');
                    suggestBtn.innerHTML = '<span class="magic-icon">✨</span> 제안';
                    suggestBtn.disabled = false;
                    copyBtn.disabled = false;

                    // Simple haptic-like effect
                    promptOutput.style.borderColor = 'var(--accent-color)';
                    setTimeout(() => promptOutput.style.borderColor = 'var(--border-color)', 500);
                }
            }, 10);

        }, 1200);
    });

    // Logic: Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        if (!promptOutput.value) return;

        navigator.clipboard.writeText(promptOutput.value).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ea043" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });

    // Logic: Chat interaction
    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        // basic replace newline with br for formatting
        contentDiv.innerHTML = text.replace(/\n/g, '<br>');

        msgDiv.appendChild(contentDiv);
        chatHistory.appendChild(msgDiv);

        // Auto scroll
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function handleSendChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        addMessage(text, true);
        chatInput.value = '';

        // Simulate AI Response
        setTimeout(() => {
            addMessage(`"${text.substring(0, 15)}..."\n\n위 내용에 대해 아주 잘 이해했습니다. 원하시는 대로 체계적인 답변을 드리겠습니다! (이것은 테스트 응답입니다.)`, false);
        }, 1000);
    }

    sendChatBtn.addEventListener('click', handleSendChat);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendChat();
        }
    });
});
