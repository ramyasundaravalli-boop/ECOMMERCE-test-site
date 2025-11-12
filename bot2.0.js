// ShopAssist Pro - Simple Customer Service Bot
// No tickets, just smart conversations
(function() {
    if (window.shopAssistLoaded) return;
    window.shopAssistLoaded = true;
    
    // CSS (same as before)
    const css = `
        .shopassist-chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .shopassist-chat-widget {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 350px;
            height: 500px;
            display: flex;
            flex-direction: column;
            display: none;
        }
        
        .shopassist-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px 15px 0 0;
            text-align: center;
        }
        
        .shopassist-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            background: #f8f9fa;
        }
        
        .shopassist-message {
            margin-bottom: 10px;
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 80%;
            line-height: 1.4;
            animation: fadeIn 0.3s ease-in;
        }
        
        .shopassist-message-bot {
            background: white;
            border-bottom-left-radius: 4px;
            text-align: left;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .shopassist-message-user {
            background: #667eea;
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px;
            text-align: right;
        }
        
        .shopassist-chat-input-container {
            padding: 15px;
            border-top: 1px solid #e5e7eb;
            background: white;
            border-radius: 0 0 15px 15px;
        }
        
        .shopassist-chat-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 10px;
            font-size: 14px;
            box-sizing: border-box;
        }
        
        .shopassist-chat-input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .shopassist-send-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            width: 100%;
            cursor: pointer;
            font-weight: 600;
        }
        
        .shopassist-toggle-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: transform 0.2s;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10001;
        }
        
        .shopassist-toggle-button:hover {
            transform: scale(1.1);
        }
        
        .shopassist-suggestions {
            display: flex;
            gap: 8px;
            margin-top: 10px;
            flex-wrap: wrap;
        }
        
        .shopassist-suggestion {
            background: #e5e7eb;
            padding: 6px 12px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s;
        }
        
        .shopassist-suggestion:hover {
            background: #d1d5db;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = css;
    document.head.appendChild(styleSheet);
    
    // Create chat widget
    const chatContainer = document.createElement('div');
    chatContainer.className = 'shopassist-chat-container';
    chatContainer.innerHTML = `
        <div class="shopassist-chat-widget" id="shopassistChatWidget">
            <div class="shopassist-chat-header">
                <h3 style="margin: 0 0 5px 0;">🛍️ ShopAssist Pro</h3>
                <p style="margin: 0; font-size: 12px; opacity: 0.9;">Customer Support • Online</p>
            </div>
            
            <div class="shopassist-chat-messages" id="shopassistChatMessages">
                <div class="shopassist-message shopassist-message-bot">
                    👋 Hello! I can help with:
                    <br>• Order tracking
                    <br>• Returns & refunds  
                    <br>• Shipping info
                    <br>• Product questions
                    <br><br>How can I help you today?
                </div>
            </div>
            
            <div class="shopassist-chat-input-container">
                <input type="text" class="shopassist-chat-input" id="shopassistChatInput" 
                       placeholder="Ask about orders, shipping, returns...">
                <button class="shopassist-send-button" id="shopassistSendButton">
                    Send Message
                </button>
                <div class="shopassist-suggestions">
                    <div class="shopassist-suggestion" data-question="Where is my order?">📦 Track Order</div>
                    <div class="shopassist-suggestion" data-question="Return policy?">🔄 Returns</div>
                    <div class="shopassist-suggestion" data-question="Shipping time?">🚚 Shipping</div>
                    <div class="shopassist-suggestion" data-question="Contact support?">👨‍💻 Help</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'shopassist-toggle-button';
    toggleButton.innerHTML = '💬';
    toggleButton.id = 'shopassistToggleButton';
    document.body.appendChild(toggleButton);
    
    // Bot functionality - SIMPLE, NO TICKETS
    window.shopAssistToggleChat = function() {
        const widget = document.getElementById('shopassistChatWidget');
        widget.style.display = widget.style.display === 'none' ? 'flex' : 'none';
    };
    
    window.shopAssistSendMessage = function() {
        const input = document.getElementById('shopassistChatInput');
        const message = input.value.trim();
        
        if (message) {
            window.shopAssistAddMessage(message, 'user');
            input.value = '';
            window.shopAssistGenerateResponse(message);
        }
    };
    
    window.shopAssistQuickQuestion = function(question) {
        window.shopAssistAddMessage(question, 'user');
        window.shopAssistGenerateResponse(question);
    };
    
    window.shopAssistAddMessage = function(text, sender) {
        const messages = document.getElementById('shopassistChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `shopassist-message shopassist-message-${sender}`;
        messageDiv.textContent = text;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    };
    
    window.shopAssistGenerateResponse = function(userMessage) {
        // Simple response logic - NO TICKETS
        setTimeout(() => {
            const messageLower = userMessage.toLowerCase();
            let response = "I understand you're asking about this. For detailed assistance, please contact us at:\n\n📧 Email: ramya.sundaravalli@gmail.com\n📞 Phone: 780-686-6472";
            
            if (messageLower.includes('order') || messageLower.includes('track')) {
                response = "To track your order, check your order confirmation email for tracking details. Most orders ship within 1-2 business days.\n\nFor order-specific help, contact:\n📧 ramya.sundaravalli@gmail.com\n📞 780-686-6472";
            }
            else if (messageLower.includes('return') || messageLower.includes('refund')) {
                response = "We offer a 30-day return policy. Items must be unused with original packaging.\n\nTo start a return, contact:\n📧 ramya.sundaravalli@gmail.com\n📞 780-686-6472";
            }
            else if (messageLower.includes('shipping') || messageLower.includes('delivery')) {
                response = "Standard shipping: 3-7 business days. Express: 2-3 days. Free shipping on orders over $50!\n\nFor shipping questions:\n📧 ramya.sundaravalli@gmail.com\n📞 780-686-6472";
            }
            else if (messageLower.includes('contact') || messageLower.includes('support') || messageLower.includes('help') || messageLower.includes('human')) {
                response = "You can reach our support team:\n\n📧 Email: ramya.sundaravalli@gmail.com\n📞 Phone: 780-686-6472\n🕒 We'll respond within 1-2 hours";
            }
            else if (messageLower.includes('hello') || messageLower.includes('hi')) {
                response = "Hello! 👋 How can I help you today?\n\nFor immediate assistance:\n📧 ramya.sundaravalli@gmail.com\n📞 780-686-6472";
            }
            else if (messageLower.includes('thank')) {
                response = "You're welcome! 😊 Is there anything else I can help with?\n\nRemember, you can always contact us directly:\n📧 ramya.sundaravalli@gmail.com\n📞 780-686-6472";
            }
            
            window.shopAssistAddMessage(response, 'bot');
        }, 1000);
    };
    
    // Event listeners
    document.getElementById('shopassistToggleButton').addEventListener('click', window.shopAssistToggleChat);
    document.getElementById('shopassistSendButton').addEventListener('click', window.shopAssistSendMessage);
    
    document.getElementById('shopassistChatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            window.shopAssistSendMessage();
        }
    });
    
    document.querySelectorAll('.shopassist-suggestion').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            window.shopAssistQuickQuestion(question);
        });
    });
    
    console.log('🛍️ ShopAssist Pro loaded successfully!');
})();
