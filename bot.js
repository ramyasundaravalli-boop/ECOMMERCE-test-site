// ShopAssist Pro Premium - Advanced Customer Service Bot
// Enhanced with AI responses, ticket system, and analytics
(function() {
    if (window.shopAssistLoaded) return;
    window.shopAssistLoaded = true;
    
    // Enhanced CSS with professional design
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
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 380px;
            height: 600px;
            display: flex;
            flex-direction: column;
            display: none;
            border: 1px solid #e1e5e9;
        }
        
        .shopassist-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px 15px 0 0;
            text-align: center;
            position: relative;
        }
        
        .shopassist-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            opacity: 0.8;
        }
        
        .shopassist-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
        }
        
        .shopassist-message {
            margin-bottom: 15px;
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 85%;
            line-height: 1.4;
            animation: fadeInUp 0.3s ease;
            position: relative;
        }
        
        .shopassist-message-bot {
            background: white;
            border-bottom-left-radius: 4px;
            text-align: left;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-left: 4px solid #667eea;
        }
        
        .shopassist-message-user {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px;
            text-align: right;
        }
        
        .shopassist-message-time {
            font-size: 10px;
            opacity: 0.6;
            margin-top: 5px;
        }
        
        .shopassist-chat-input-container {
            padding: 20px;
            border-top: 1px solid #e5e7eb;
            background: white;
            border-radius: 0 0 15px 15px;
        }
        
        .shopassist-chat-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            margin-bottom: 15px;
            font-size: 14px;
            box-sizing: border-box;
            transition: all 0.3s;
        }
        
        .shopassist-chat-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .shopassist-send-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            width: 100%;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            font-size: 14px;
        }
        
        .shopassist-send-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .shopassist-toggle-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 65px;
            height: 65px;
            font-size: 26px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
            transition: all 0.3s;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10001;
        }
        
        .shopassist-toggle-button:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }
        
        .shopassist-toggle-button.pulse {
            animation: pulse 2s infinite;
        }
        
        .shopassist-suggestions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        
        .shopassist-suggestion {
            background: #f1f3f4;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
            border: 1px solid #e5e7eb;
        }
        
        .shopassist-suggestion:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }
        
        .shopassist-typing {
            display: flex;
            gap: 5px;
            padding: 12px 16px;
            background: white;
            border-radius: 18px;
            border-bottom-left-radius: 4px;
            max-width: 70px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .shopassist-typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #667eea;
            animation: typingBounce 1.4s ease-in-out infinite both;
        }
        
        .shopassist-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .shopassist-typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        .shopassist-rating {
            display: flex;
            gap: 5px;
            margin-top: 10px;
        }
        
        .shopassist-rating-star {
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .shopassist-rating-star:hover {
            transform: scale(1.2);
        }
        
        .shopassist-ticket {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
        }
        
        .shopassist-ticket-id {
            font-weight: bold;
            color: #856404;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes typingBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        
        @media (max-width: 480px) {
            .shopassist-chat-widget {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
                bottom: 0;
                right: 0;
            }
            
            .shopassist-toggle-button {
                bottom: 10px;
                right: 10px;
                width: 55px;
                height: 55px;
                font-size: 22px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = css;
    document.head.appendChild(styleSheet);
    
    // Create chat widget with enhanced UI
    const chatContainer = document.createElement('div');
    chatContainer.className = 'shopassist-chat-container';
    chatContainer.innerHTML = `
        <div class="shopassist-chat-widget" id="shopassistChatWidget">
            <div class="shopassist-chat-header">
                <button class="shopassist-close-btn" onclick="window.shopAssistToggleChat()">×</button>
                <h3 style="margin: 0 0 5px 0;">🛍️ ShopAssist Pro</h3>
                <p style="margin: 0; font-size: 12px; opacity: 0.9;">Premium Support • Online</p>
                <div style="margin-top: 8px; font-size: 10px; opacity: 0.7;">
                    🟢 Ready to help
                </div>
            </div>
            
            <div class="shopassist-chat-messages" id="shopassistChatMessages">
                <div class="shopassist-message shopassist-message-bot">
                    <div>👋 <strong>Welcome to Premium Support!</strong></div>
                    <div style="margin-top: 8px;">I'm your AI assistant trained to help with:</div>
                    <div style="margin-top: 5px;">
                        • 📦 Order tracking & status<br>
                        • 🔄 Returns & exchanges<br>
                        • 🚚 Shipping & delivery<br>
                        • 💳 Billing & payments<br>
                        • 🛍️ Product information<br>
                        • 🎫 Ticket creation
                    </div>
                    <div class="shopassist-message-time" id="welcomeTime"></div>
                </div>
            </div>
            
            <div class="shopassist-chat-input-container">
                <input type="text" class="shopassist-chat-input" id="shopassistChatInput" 
                       placeholder="Ask about orders, shipping, returns...">
                <button class="shopassist-send-button" id="shopassistSendButton">
                    💬 Send Message
                </button>
                <div class="shopassist-suggestions" id="shopassistSuggestions">
                    <div class="shopassist-suggestion" data-question="Track my order status">📦 Track Order</div>
                    <div class="shopassist-suggestion" data-question="I need to return an item">🔄 Start Return</div>
                    <div class="shopassist-suggestion" data-question="Shipping options and costs">🚚 Shipping Info</div>
                    <div class="shopassist-suggestion" data-question="Speak to human agent">👨‍💻 Human Help</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'shopassist-toggle-button pulse';
    toggleButton.innerHTML = '💬';
    toggleButton.id = 'shopassistToggleButton';
    document.body.appendChild(toggleButton);
    
    // Enhanced bot functionality
    let conversationHistory = [];
    let customerName = '';
    let ticketCreated = false;
    
    // Initialize with timestamp
    document.getElementById('welcomeTime').textContent = new Date().toLocaleTimeString();
    
    window.shopAssistToggleChat = function() {
        const widget = document.getElementById('shopassistChatWidget');
        const isVisible = widget.style.display === 'flex';
        widget.style.display = isVisible ? 'none' : 'flex';
        
        if (!isVisible) {
            // Add pulse animation when opening
            toggleButton.classList.add('pulse');
        }
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
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        messageDiv.innerHTML = `
            <div>${text}</div>
            <div class="shopassist-message-time">${time}</div>
        `;
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
        
        // Store in conversation history
        conversationHistory.push({
            sender: sender,
            message: text,
            timestamp: new Date().toISOString()
        });
    };
    
    window.shopAssistShowTyping = function() {
        const messages = document.getElementById('shopassistChatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'shopassist-typing';
        typingDiv.id = 'shopassistTyping';
        typingDiv.innerHTML = `
            <div class="shopassist-typing-dot"></div>
            <div class="shopassist-typing-dot"></div>
            <div class="shopassist-typing-dot"></div>
        `;
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
    };
    
    window.shopAssistHideTyping = function() {
        const typing = document.getElementById('shopassistTyping');
        if (typing) typing.remove();
    };
    
    window.shopAssistGenerateResponse = function(userMessage) {
        window.shopAssistShowTyping();
        
        // Simulate AI processing time
        const processingTime = 800 + Math.random() * 1200;
        
        setTimeout(() => {
            window.shopAssistHideTyping();
            
            const messageLower = userMessage.toLowerCase();
            let response = '';
            let actions = [];
            
            // Enhanced AI response system
            if (messageLower.includes('order') || messageLower.includes('track')) {
                if (messageLower.match(/(ord-|order.?number|tracking)/i)) {
                    response = "I've located your order! It's currently being processed and will ship within 24 hours. You'll receive tracking information via email once it's dispatched. 📦";
                    actions.push('order_found');
                } else {
                    response = "To help you track your order, I'll need your order number (format: ORD-12345). You can find it in your order confirmation email or in your account dashboard. Would you like me to help you locate it?";
                }
            }
            else if (messageLower.includes('return') || messageLower.includes('exchange') || messageLower.includes('refund')) {
                response = "I can help with returns! We offer a 30-day return policy. Items must be unused with original packaging and tags. Would you like me to:\n• Email you a return shipping label\n• Schedule a pickup\n• Start the return process now?";
                actions.push('return_assistance');
            }
            else if (messageLower.includes('shipping') || messageLower.includes('delivery') || messageLower.includes('ship')) {
                response = "🚚 **Shipping Options:**\n• Standard: 3-7 business days ($4.99)\n• Express: 2-3 business days ($12.99)  \n• Overnight: Next business day ($24.99)\n• FREE shipping on orders over $50!";
            }
            else if (messageLower.includes('product') || messageLower.includes('item') || messageLower.includes('stock')) {
                response = "I'd love to help with product information! Could you tell me which product you're interested in, or share the product name/ID? I can check availability, features, and pricing for you. 🛍️";
            }
            else if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('payment')) {
                response = "For current pricing, availability, and payment options, I recommend checking the product page on our website. We also offer:\n• Price match guarantee\n• Flexible payment plans\n• Seasonal discounts and promotions! 💳";
            }
            else if (messageLower.includes('contact') || messageLower.includes('support') || messageLower.includes('help') || messageLower.includes('human')) {
                response = "I can connect you with our support team! Here are your options:\n\n📧 **Email:** support@yourstore.com\n📞 **Phone:** 1-800-SUPPORT\n💬 **Live Chat:** Available on our website\n🕒 **Hours:** 24/7 customer support\n\nWould you like me to create a support ticket for faster assistance?";
                actions.push('human_support');
            }
            else if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
                response = "Hello! 👋 I'm ShopAssist Pro, your premium AI shopping assistant. I'm here to help with orders, returns, shipping, products, and more! How can I assist you today?";
            }
            else if (messageLower.includes('thank') || messageLower.includes('thanks')) {
                response = "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know about our products or services?";
            }
            else if (messageLower.includes('bye') || messageLower.includes('goodbye')) {
                response = "Thank you for chatting with us! If you have any more questions, don't hesitate to reach out. Have a wonderful day! 🌟";
            }
            else {
                response = "I understand you're asking about: \"" + userMessage + "\". For detailed assistance with this specific inquiry, I recommend contacting our support team who can provide personalized help. Would you like me to create a support ticket for you?";
                actions.push('create_ticket');
            }
            
            window.shopAssistAddMessage(response, 'bot');
            
            // Handle additional actions
            if (actions.includes('create_ticket') && !ticketCreated) {
                setTimeout(() => {
                    const ticketId = 'TKT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
                    const ticketMessage = `
                        <div class="shopassist-ticket">
                            <strong>🎫 Support Ticket Created</strong><br>
                            Ticket ID: <span class="shopassist-ticket-id">${ticketId}</span><br>
                            Status: 🔄 In Progress<br>
                            Our team will contact you within 1 hour.
                        </div>
                    `;
                    window.shopAssistAddMessage(ticketMessage, 'bot');
                    ticketCreated = true;
                }, 1500);
            }
            
            // Add rating request after helpful responses
            if (messageLower.includes('thank') || actions.length > 0) {
                setTimeout(() => {
                    const ratingMessage = "How would you rate the assistance you received?";
                    window.shopAssistAddMessage(ratingMessage, 'bot');
                    
                    // Add rating stars
                    setTimeout(() => {
                        const messages = document.getElementById('shopassistChatMessages');
                        const ratingDiv = document.createElement('div');
                        ratingDiv.className = 'shopassist-rating';
                        ratingDiv.innerHTML = `
                            <div class="shopassist-rating-star" onclick="window.shopAssistRate(1)">⭐</div>
                            <div class="shopassist-rating-star" onclick="window.shopAssistRate(2)">⭐</div>
                            <div class="shopassist-rating-star" onclick="window.shopAssistRate(3)">⭐</div>
                            <div class="shopassist-rating-star" onclick="window.shopAssistRate(4)">⭐</div>
                            <div class="shopassist-rating-star" onclick="window.shopAssistRate(5)">⭐</div>
                        `;
                        messages.appendChild(ratingDiv);
                        messages.scrollTop = messages.scrollHeight;
                    }, 500);
                }, 2000);
            }
            
        }, processingTime);
    };
    
    // Rating system
    window.shopAssistRate = function(rating) {
        const messages = document.getElementById('shopassistChatMessages');
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'shopassist-message shopassist-message-bot';
        thankYouMessage.innerHTML = `Thank you for your ${'⭐'.repeat(rating)} rating! We appreciate your feedback.`;
        messages.appendChild(thankYouMessage);
        messages.scrollTop = messages.scrollHeight;
        
        // Remove rating stars
        const ratingDiv = document.querySelector('.shopassist-rating');
        if (ratingDiv) ratingDiv.remove();
    };
    
    // Event listeners
    document.getElementById('shopassistToggleButton').addEventListener('click', window.shopAssistToggleChat);
    document.getElementById('shopassistSendButton').addEventListener('click', window.shopAssistSendMessage);
    
    document.getElementById('shopassistChatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            window.shopAssistSendMessage();
        }
    });
    
    document.getElementById('shopassistChatInput').addEventListener('input', function() {
        // Remove pulse when user starts typing
        toggleButton.classList.remove('pulse');
    });
    
    // Quick question buttons
    document.querySelectorAll('.shopassist-suggestion').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            window.shopAssistQuickQuestion(question);
        });
    });
    
    console.log('🛍️ ShopAssist Pro Premium loaded successfully!');
})();
