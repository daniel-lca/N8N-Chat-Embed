// Chat Widget Embed Script
(function() {
    // Inject styles (will be updated to use CSS variables from config)
    const styles = `
        .n8n-chat-widget-embed {
            container-type: inline-size; /* Enable container queries */
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, transparent); /* Default transparent */
            --chat--color-internal-background: var(--n8n-chat-internal-background-color, #ffffff); /* Background for internal elements like chat container, messages */
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            --chat--font-size: var(--n8n-chat-font-size, 14px);

            --chat--user-bubble-bg-start: var(--n8n-chat-user-bubble-bg-start, var(--chat--color-primary));
            --chat--user-bubble-bg-end: var(--n8n-chat-user-bubble-bg-end, var(--chat--color-secondary));
            --chat--user-bubble-text-color: var(--n8n-chat-user-bubble-text-color, white);

            --chat--bot-bubble-bg: var(--n8n-chat-bot-bubble-bg, var(--chat--color-internal-background));
            --chat--bot-bubble-border: var(--n8n-chat-bot-bubble-border, rgba(133, 79, 255, 0.2));
            --chat--bot-bubble-text-color: var(--n8n-chat-bot-bubble-text-color, var(--chat--color-font));
            
            --chat--send-button-bg-start: var(--n8n-chat-send-button-bg-start, var(--chat--color-primary));
            --chat--send-button-bg-end: var(--n8n-chat-send-button-bg-end, var(--chat--color-secondary));
            --chat--send-button-text-color: var(--n8n-chat-send-button-text-color, white);

            --chat--input-bg: var(--n8n-chat-input-bg, var(--chat--color-internal-background));
            --chat--input-border: var(--n8n-chat-input-border, rgba(133, 79, 255, 0.2));
            --chat--input-text-color: var(--n8n-chat-input-text-color, var(--chat--color-font));
            --chat--input-placeholder-color: var(--n8n-chat-input-placeholder-color, rgba(51, 51, 51, 0.6));

            --chat--suggested-question-bg: var(--n8n-chat-suggested-question-bg, rgba(133, 79, 255, 0.1));
            --chat--suggested-question-text-color: var(--n8n-chat-suggested-question-text-color, var(--chat--color-font));
            --chat--suggested-question-border: var(--n8n-chat-suggested-question-border, rgba(133, 79, 255, 0.2));

            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            height: 100%; /* Occupy full height of parent */
            width: 100%; /* Occupy full width of parent */
            display: flex; /* Use flexbox for layout */
            flex-direction: column; /* Stack children vertically */
            box-sizing: border-box;
        }

        .n8n-chat-widget-embed .embed-container {
            flex: 1; /* Allow container to grow and shrink */
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.05); /* Lighter shadow for embed */
            border: 1px solid rgba(133, 79, 255, 0.1);
            overflow: hidden;
            background: var(--chat--color-internal-background); /* Explicit internal background */
            font-family: inherit;
        }

        .n8n-chat-widget-embed .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
            background: var(--chat--color-internal-background);
            flex-shrink: 0; /* Prevent header from shrinking */
        }

        .n8n-chat-widget-embed .close-button { /* Keep for consistency in structure but hidden */
            display: none;
        }

        .n8n-chat-widget-embed .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget-embed .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget-embed .initial-state {
            flex: 1; /* Take up remaining space */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            text-align: center;
        }

        .n8n-chat-widget-embed .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget-embed .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: auto; /* Adjust width dynamically */
            max-width: 250px; /* Limit width */
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--send-button-bg-start) 0%, var(--chat--send-button-bg-end) 100%);
            color: var(--chat--send-button-text-color);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget-embed .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget-embed .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget-embed .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget-embed .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget-embed .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget-embed .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-internal-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget-embed .chat-message {
            padding: 8px 12px;
            margin: 6px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: var(--chat--font-size);
            line-height: 1.4;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .n8n-chat-widget-embed .chat-message.user {
            background: linear-gradient(135deg, var(--chat--user-bubble-bg-start) 0%, var(--chat--user-bubble-bg-end) 100%);
            color: var(--chat--user-bubble-text-color);
            align-self: flex-end;
            box-shadow: 0 4px 12px hsla(255, 100%, 75%, 0.2); /* Adjusted for general primary color */
            border: none;
        }

        .n8n-chat-widget-embed .chat-message.bot {
            background: var(--chat--bot-bubble-bg);
            border: 1px solid var(--chat--bot-bubble-border);
            color: var(--chat--bot-bubble-text-color);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Markdown styling for bot messages */
        .n8n-chat-widget-embed .chat-message.bot h1,
        .n8n-chat-widget-embed .chat-message.bot h2,
        .n8n-chat-widget-embed .chat-message.bot h3,
        .n8n-chat-widget-embed .chat-message.bot h4,
        .n8n-chat-widget-embed .chat-message.bot h5,
        .n8n-chat-widget-embed .chat-message.bot h6 {
            margin: 0.3em 0;
            font-weight: 600;
        }

        .n8n-chat-widget-embed .chat-message.bot ul,
        .n8n-chat-widget-embed .chat-message.bot ol {
            margin: 0.3em 0;
            padding-left: 1.2em;
        }

        .n8n-chat-widget-embed .chat-message.bot p {
            margin: 0.3em 0;
        }

        .n8n-chat-widget-embed .chat-message.bot p:first-child {
            margin-top: 0 !important;
        }

        .n8n-chat-widget-embed .chat-message.bot p:last-child {
            margin-bottom: 0 !important;
        }

        .n8n-chat-widget-embed .chat-message.bot code {
            background: var(--chat--suggested-question-bg); /* Reusing for code blocks */
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
        }

        .n8n-chat-widget-embed .chat-message.bot pre {
            background: var(--chat--suggested-question-bg); /* Reusing for code blocks */
            padding: 0.8em;
            border-radius: 6px;
            overflow-x: auto;
            margin: 0.3em 0;
        }

        .n8n-chat-widget-embed .chat-message.bot pre code {
            background: none;
            padding: 0;
        }

        .n8n-chat-widget-embed .chat-message.bot a {
            color: var(--chat--color-primary);
            text-decoration: underline;
        }

        .n8n-chat-widget-embed .chat-message.bot blockquote {
            border-left: 3px solid var(--chat--color-primary);
            padding-left: 0.8em;
            margin: 0.3em 0;
            opacity: 0.8;
        }

        /* Remove default margins from first and last child elements */
        .n8n-chat-widget-embed .chat-message.bot > *:first-child {
            margin-top: 0;
        }

        .n8n-chat-widget-embed .chat-message.bot > *:last-child {
            margin-bottom: 0 !important;
        }

        .n8n-chat-widget-embed .suggested-questions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 10px 16px 0px 16px; /* Padding only top/sides */
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            background: var(--chat--color-internal-background);
            flex-shrink: 0; /* Prevent from shrinking */
        }

        .n8n-chat-widget-embed .suggested-question-bubble {
            background: var(--chat--suggested-question-bg);
            border: 1px solid var(--chat--suggested-question-border);
            color: var(--chat--suggested-question-text-color);
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            white-space: nowrap;
            transition: background-color 0.2s, border-color 0.2s;
        }

        .n8n-chat-widget-embed .suggested-question-bubble:hover {
            background-color: var(--chat--suggested-question-border);
        }

        .n8n-chat-widget-embed .chat-input {
            padding: 16px;
            background: var(--chat--color-internal-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
            flex-shrink: 0; /* Prevent from shrinking */
        }

        .n8n-chat-widget-embed .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid var(--chat--input-border);
            border-radius: 8px;
            background: var(--chat--input-bg);
            color: var(--chat--input-text-color);
            resize: none;
            font-family: inherit;
            font-size: var(--chat--font-size);
            min-height: 44px; /* Maintain height */
            height: 44px; /* Keep height consistent with send button */
            line-height: 1.4;
            overflow-y: hidden;
            transition: height 0.1s ease;
            box-sizing: border-box;
        }

        .n8n-chat-widget-embed .chat-input textarea::placeholder {
            color: var(--chat--input-placeholder-color);
            opacity: 0.8;
        }

        .n8n-chat-widget-embed .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
        }

        .n8n-chat-widget-embed .chat-input textarea:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .n8n-chat-widget-embed .chat-input button {
            background: linear-gradient(135deg, var(--chat--send-button-bg-start) 0%, var(--chat--send-button-bg-end) 100%);
            color: var(--chat--send-button-text-color);
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
            height: 44px;
            line-height: 44px; /* Vertically center icon/text */
            min-width: 70px; /* Ensure send button has enough width */
            flex-shrink: 0; /* Prevent button from shrinking */
        }

        .n8n-chat-widget-embed .chat-input button:hover:not(:disabled) {
            transform: scale(1.05);
        }

        .n8n-chat-widget-embed .chat-input button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        /* Typing indicator styles */
        .n8n-chat-widget-embed .typing-indicator {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            background: var(--chat--bot-bubble-bg);
            border: 1px solid var(--chat--bot-bubble-border);
            border-radius: 12px;
            max-width: 80%;
            align-self: flex-start;
            margin: 6px 0;
        }

        .n8n-chat-widget-embed .typing-indicator span {
            height: 8px;
            width: 8px;
            background-color: var(--chat--color-primary);
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
            animation: typing 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget-embed .typing-indicator span:nth-child(1) {
            animation-delay: -0.32s;
        }

        .n8n-chat-widget-embed .typing-indicator span:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .n8n-chat-widget-embed .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-internal-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            flex-shrink: 0; /* Prevent footer from shrinking */
        }

        .n8n-chat-widget-embed .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget-embed .chat-footer a:hover {
            opacity: 1;
        }

        /* Responsive adjustments for smaller embed sizes */
        @container (max-width: 480px) {
            .n8n-chat-widget-embed .welcome-text {
                font-size: 20px;
            }
            .n8n-chat-widget-embed .new-chat-btn {
                padding: 12px 20px;
                font-size: 14px;
            }
            .n8n-chat-widget-embed .brand-header {
                padding: 12px;
            }
            .n8n-chat-widget-embed .brand-header img {
                width: 28px;
                height: 28px;
            }
            .n8n-chat-widget-embed .brand-header span {
                font-size: 16px;
            }
            .n8n-chat-widget-embed .chat-messages {
                padding: 15px;
            }
            .n8n-chat-widget-embed .chat-input {
                padding: 12px;
            }
            .n8n-chat-widget-embed .chat-input textarea {
                min-height: 40px;
                height: 40px;
            }
            .n8n-chat-widget-embed .chat-input button {
                height: 40px;
                line-height: 40px;
                padding: 0 16px;
            }
            .n8n-chat-widget-embed .suggested-question-bubble {
                font-size: 13px;
                padding: 6px 10px;
            }
        }
    `;

    // Load dependencies (Geist Sans, Marked.js, DOMPurify)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js';
    document.head.appendChild(markedScript);

    const purifyScript = document.createElement('script');
    purifyScript.src = 'https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js';
    document.head.appendChild(purifyScript);

    // Wait for scripts to load before initializing
    Promise.all([
        new Promise(resolve => markedScript.onload = resolve),
        new Promise(resolve => purifyScript.onload = resolve)
    ]).then(() => {
        initializeWidget();
    });

    // Inject styles (ensure styleSheet is created after `styles` string is finalized)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);


    function initializeWidget() {
        // Prevent multiple initializations if the script runs again
        if (window.N8NChatWidgetEmbedInitialized) return;
        window.N8NChatWidgetEmbedInitialized = true;

        // Default configuration
        const defaultConfig = {
            webhook: {
                url: '',
                route: ''
            },
            branding: {
                logo: '',
                name: '',
                welcomeText: 'Hi 👋, how can we help?',
                responseTimeText: 'We typically respond right away',
                poweredBy: {
                    text: 'Powered by LowCode',
                    link: 'https://www.lowcode.agency'
                }
            },
            style: {
                primaryColor: '#854fff',
                secondaryColor: '#6b3fd4',
                internalBackgroundColor: '#ffffff', // New variable for internal elements
                fontColor: '#333333',
                fontSize: '14px',
                userBubble: {
                    bgColorStart: null, // will default to primaryColor
                    bgColorEnd: null,   // will default to secondaryColor
                    textColor: 'white'
                },
                botBubble: {
                    bgColor: null, // will default to internalBackgroundColor
                    borderColor: 'rgba(133, 79, 255, 0.2)',
                    textColor: null // will default to fontColor
                },
                sendButton: {
                    bgColorStart: null, // will default to primaryColor
                    bgColorEnd: null,   // will default to secondaryColor
                    textColor: 'white'
                },
                input: {
                    bgColor: null, // will default to internalBackgroundColor
                    borderColor: 'rgba(133, 79, 255, 0.2)',
                    textColor: null, // will default to fontColor
                    placeholderColor: 'rgba(51, 51, 51, 0.6)'
                },
                suggestedQuestion: {
                    bgColor: 'rgba(133, 79, 255, 0.1)',
                    borderColor: 'rgba(133, 79, 255, 0.2)',
                    textColor: null // will default to fontColor
                }
            },
            markdown: {
                enabled: true,
                sanitize: true
            },
            suggestedQuestions: []
        };

        // Deep merge for config
        const mergeDeep = (target, source) => {
            const output = { ...target };
            if (target && typeof target === 'object' && source && typeof source === 'object') {
                Object.keys(source).forEach(key => {
                    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && key in target) {
                        output[key] = mergeDeep(target[key], source[key]);
                    } else {
                        output[key] = source[key];
                    }
                });
            }
            return output;
        };

        const config = mergeDeep(defaultConfig, window.ChatWidgetEmbedConfig || {});

        // Apply defaults for style properties that should inherit from primary/secondary/font color if not specified
        config.style.userBubble.bgColorStart = config.style.userBubble.bgColorStart || config.style.primaryColor;
        config.style.userBubble.bgColorEnd = config.style.userBubble.bgColorEnd || config.style.secondaryColor;
        config.style.botBubble.bgColor = config.style.botBubble.bgColor || config.style.internalBackgroundColor;
        config.style.botBubble.textColor = config.style.botBubble.textColor || config.style.fontColor;
        config.style.sendButton.bgColorStart = config.style.sendButton.bgColorStart || config.style.primaryColor;
        config.style.sendButton.bgColorEnd = config.style.sendButton.bgColorEnd || config.style.secondaryColor;
        config.style.input.bgColor = config.style.input.bgColor || config.style.internalBackgroundColor;
        config.style.input.textColor = config.style.input.textColor || config.style.fontColor;
        config.style.input.placeholderColor = config.style.input.placeholderColor || `rgba(${parseInt(config.style.fontColor.slice(1, 3), 16)}, ${parseInt(config.style.fontColor.slice(3, 5), 16)}, ${parseInt(config.style.fontColor.slice(5, 7), 16)}, 0.6)`;
        config.style.suggestedQuestion.textColor = config.style.suggestedQuestion.textColor || config.style.fontColor;

        let currentSessionId = '';

        // Create widget container that takes up 100% of the parent
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'n8n-chat-widget-embed';

        // Set CSS variables based on the final config
        widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
        widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
        widgetContainer.style.setProperty('--n8n-chat-internal-background-color', config.style.internalBackgroundColor);
        widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);
        widgetContainer.style.setProperty('--n8n-chat-font-size', config.style.fontSize);

        widgetContainer.style.setProperty('--n8n-chat-user-bubble-bg-start', config.style.userBubble.bgColorStart);
        widgetContainer.style.setProperty('--n8n-chat-user-bubble-bg-end', config.style.userBubble.bgColorEnd);
        widgetContainer.style.setProperty('--n8n-chat-user-bubble-text-color', config.style.userBubble.textColor);

        widgetContainer.style.setProperty('--n8n-chat-bot-bubble-bg', config.style.botBubble.bgColor);
        widgetContainer.style.setProperty('--n8n-chat-bot-bubble-border', config.style.botBubble.borderColor);
        widgetContainer.style.setProperty('--n8n-chat-bot-bubble-text-color', config.style.botBubble.textColor);

        widgetContainer.style.setProperty('--n8n-chat-send-button-bg-start', config.style.sendButton.bgColorStart);
        widgetContainer.style.setProperty('--n8n-chat-send-button-bg-end', config.style.sendButton.bgColorEnd);
        widgetContainer.style.setProperty('--n8n-chat-send-button-text-color', config.style.sendButton.textColor);

        widgetContainer.style.setProperty('--n8n-chat-input-bg', config.style.input.bgColor);
        widgetContainer.style.setProperty('--n8n-chat-input-border', config.style.input.borderColor);
        widgetContainer.style.setProperty('--n8n-chat-input-text-color', config.style.input.textColor);
        widgetContainer.style.setProperty('--n8n-chat-input-placeholder-color', config.style.input.placeholderColor);

        widgetContainer.style.setProperty('--n8n-chat-suggested-question-bg', config.style.suggestedQuestion.bgColor);
        widgetContainer.style.setProperty('--n8n-chat-suggested-question-border', config.style.suggestedQuestion.borderColor);
        widgetContainer.style.setProperty('--n8n-chat-suggested-question-text-color', config.style.suggestedQuestion.textColor);

        const embedContainer = document.createElement('div');
        embedContainer.className = 'embed-container';

        const initialStateHTML = `
            <div class="initial-state">
                <h2 class="welcome-text">${config.branding.welcomeText}</h2>
                <button class="new-chat-btn">
                    <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                    </svg>
                    Send us a message
                </button>
                <p class="response-text">${config.branding.responseTimeText}</p>
            </div>
        `;

        const chatInterfaceHTML = `
            <div class="chat-interface">
                <div class="brand-header">
                    <img src="${config.branding.logo}" alt="${config.branding.name}">
                    <span>${config.branding.name}</span>
                </div>
                <div class="chat-messages"></div>
                ${config.suggestedQuestions && config.suggestedQuestions.length > 0 ? `<div class="suggested-questions"></div>` : ''}
                <div class="chat-input">
                    <textarea placeholder="Type your message here..." rows="1"></textarea>
                    <button type="submit">Send</button>
                </div>
                <div class="chat-footer">
                    <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
                </div>
            </div>
        `;

        embedContainer.innerHTML = initialStateHTML + chatInterfaceHTML;
        widgetContainer.appendChild(embedContainer);
        // Append the widget to the body, as Framer handles the container size
        document.body.appendChild(widgetContainer);

        const newChatBtn = embedContainer.querySelector('.new-chat-btn');
        const initialState = embedContainer.querySelector('.initial-state');
        const chatInterface = embedContainer.querySelector('.chat-interface');
        const messagesContainer = embedContainer.querySelector('.chat-messages');
        const textarea = embedContainer.querySelector('textarea');
        const sendButton = embedContainer.querySelector('button[type="submit"]');
        const suggestedQuestionsContainer = embedContainer.querySelector('.suggested-questions');
        const brandHeader = embedContainer.querySelector('.brand-header');

         // Helper to scroll to bottom of messages
         const scrollToBottom = () => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        function generateUUID() {
            return crypto.randomUUID();
        }

        // Function to process message content (markdown or plain text)
        function processMessageContent(content, isBot = true) {
            content = (content || '').trim(); // Ensure content is a string and trim
            
            if (!isBot || !config.markdown.enabled || typeof marked === 'undefined' || typeof DOMPurify === 'undefined') {
                return { type: 'text', content: content };
            }

            try {
                let finalHtml = marked.parse(content);
                if (config.markdown.sanitize) {
                    finalHtml = DOMPurify.sanitize(finalHtml);
                }
                
                finalHtml = finalHtml.trim()
                    .replace(/<p>\s*<\/p>\s*$/gi, '')
                    .replace(/<br\s*\/?>\s*$/gi, '');
                
                return { type: 'html', content: finalHtml };
            } catch (error) {
                console.error('Error parsing markdown:', error);
                return { type: 'text', content: content };
            }
        }

        async function startNewConversation() {
            currentSessionId = generateUUID();
            const data = [{
                action: "loadPreviousSession", // Or trigger initial bot message if this is the first interaction
                sessionId: currentSessionId,
                route: config.webhook.route,
                metadata: {
                    userId: ""
                }
            }];

            try {
                // Hide initial state, show chat interface
                initialState.style.display = 'none';
                chatInterface.classList.add('active');

                const response = await fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();
                
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                
                const messageOutput = Array.isArray(responseData) && responseData.length > 0 && responseData[0].output ? responseData[0].output : 'Hello, how can I assist you today?';
                
                const processed = processMessageContent(messageOutput, true);
                
                if (processed.type === 'html') {
                    botMessageDiv.innerHTML = processed.content;
                } else {
                    botMessageDiv.textContent = processed.content;
                }
                
                messagesContainer.appendChild(botMessageDiv);
                scrollToBottom();

                // Render suggested questions if they exist
                renderSuggestedQuestions();

                textarea.focus(); // Focus input after starting chat
            } catch (error) {
                console.error('Error starting new conversation:', error);
                // Optionally show an error message in the chat
                const errorDiv = document.createElement('div');
                errorDiv.className = 'chat-message bot';
                errorDiv.textContent = 'Sorry, I\'m having trouble starting the chat. Please try again later.';
                messagesContainer.appendChild(errorDiv);
                scrollToBottom();
            }
        }

        async function sendMessage(message, isSuggested = false) {
            // Disable send button and textarea
            sendButton.disabled = true;
            textarea.disabled = true;
            sendButton.style.opacity = '0.6';
            sendButton.style.cursor = 'not-allowed';
            
            const originalButtonText = sendButton.innerHTML; // Can use innerHTML for SVG/text if needed
            sendButton.innerHTML = `<svg class="message-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V20M20 12H4"/></svg>`; // Loading spinner or simple arrow
            
            const messageData = {
                action: "sendMessage",
                sessionId: currentSessionId,
                route: config.webhook.route,
                chatInput: message,
                metadata: {
                    userId: ""
                }
            };

            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'chat-message user';
            userMessageDiv.textContent = message;
            messagesContainer.appendChild(userMessageDiv);
            scrollToBottom();

            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            messagesContainer.appendChild(typingIndicator);
            scrollToBottom();

            try {
                const response = await fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                });
                
                const data = await response.json();
                
                typingIndicator.remove(); // Remove typing indicator
                
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                
                const messageOutput = Array.isArray(data) && data.length > 0 && data[0].output ? data[0].output : 'I\'m sorry, I encountered an issue. Can you please rephrase?';
                const processed = processMessageContent(messageOutput, true);
                
                if (processed.type === 'html') {
                    botMessageDiv.innerHTML = processed.content;
                } else {
                    botMessageDiv.textContent = processed.content;
                }
                messagesContainer.appendChild(botMessageDiv);
                scrollToBottom();

            } catch (error) {
                console.error('Error sending message:', error);
                typingIndicator.remove(); // Remove typing indicator
                
                const errorDiv = document.createElement('div');
                errorDiv.className = 'chat-message bot';
                errorDiv.textContent = 'Sorry, there was an error processing your message. Please try again.';
                messagesContainer.appendChild(errorDiv);
                scrollToBottom();
            } finally {
                sendButton.disabled = false;
                textarea.disabled = false;
                sendButton.style.opacity = '1';
                sendButton.style.cursor = 'pointer';
                sendButton.innerHTML = originalButtonText; // Restore original button text/icon
                textarea.focus(); // Return focus to textarea
                 // Clear textarea only if it was not a suggested question (as it auto-clears on send)
                if (!isSuggested) {
                    textarea.value = '';
                    textarea.style.height = 'auto'; // Reset height
                }
            }
        }
        
        function renderSuggestedQuestions() {
            if (!suggestedQuestionsContainer || !config.suggestedQuestions || config.suggestedQuestions.length === 0) {
                return;
            }
            suggestedQuestionsContainer.innerHTML = ''; // Clear previous
            config.suggestedQuestions.forEach((question, index) => {
                const bubble = document.createElement('div');
                bubble.className = 'suggested-question-bubble';
                bubble.textContent = question;
                bubble.dataset.index = index; // Store index to remove later
                bubble.addEventListener('click', () => {
                    sendMessage(question, true);
                    bubble.remove(); // Remove the bubble after it's clicked
                    // Hide the suggested questions container if no bubbles left
                    if (suggestedQuestionsContainer.children.length === 0) {
                         suggestedQuestionsContainer.style.display = 'none';
                         // Optionally remove the top border if all suggestions are gone
                         // suggestedQuestionsContainer.style.borderTop = 'none';
                    }
                });
                suggestedQuestionsContainer.appendChild(bubble);
            });
            suggestedQuestionsContainer.style.display = 'flex'; // Ensure visible if questions are present
        }

        newChatBtn.addEventListener('click', startNewConversation);
        
        sendButton.addEventListener('click', () => {
            const message = textarea.value.trim();
            if (message && currentSessionId) { // Only send if session exists
                sendMessage(message);
                textarea.value = '';
                textarea.style.height = 'auto'; // Reset height after sending
            }
        });
        
        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent new line
                const message = textarea.value.trim();
                if (message && currentSessionId) { // Only send if session exists
                    sendMessage(message);
                    textarea.value = '';
                    textarea.style.height = 'auto'; // Reset height
                }
            }
        });

        // Auto-resize textarea logic
        const adjustTextareaHeight = () => {
            textarea.style.height = 'auto'; // Reset height to recalculate
            textarea.style.height = Math.min(textarea.scrollHeight, parseInt(getComputedStyle(textarea).lineHeight) * 5) + 'px'; // Limit to 5 lines
            scrollToBottom(); // Keep messages visible
        };
        textarea.addEventListener('input', adjustTextareaHeight);
        // Also adjust height on initial load in case of pre-filled text (though unlikely here)
        adjustTextareaHeight();
    }
})();