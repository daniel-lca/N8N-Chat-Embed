// Chat Widget Embed Script
(function () {
    // Inject styles and define CSS variables
    const styles = `
        /* Root container for the embedded widget */
        .n8n-chat-widget-embed-root {
            /* Enable container queries for responsive styling based on widget's own size */
            container-type: inline-size;
            
            /* Define global CSS variables based on config, with fallbacks */
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, transparent); /* Root background, defaults to transparent */
            --chat--color-internal-background: var(--n8n-chat-internal-background-color, #ffffff); /* Background for visible chat UI elements */
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            --chat--font-size: var(--n8n-chat-font-size, 14px);

            /* User message bubble */
            --chat--user-bubble-bg-start: var(--n8n-chat-user-bubble-bg-start, var(--chat--color-primary));
            --chat--user-bubble-bg-end: var(--n8n-chat-user-bubble-bg-end, var(--chat--color-secondary));
            --chat--user-bubble-text-color: var(--n8n-chat-user-bubble-text-color, white);

            /* Bot message bubble */
            --chat--bot-bubble-bg: var(--n8n-chat-bot-bubble-bg, var(--chat--color-internal-background));
            --chat--bot-bubble-border: var(--n8n-chat-bot-bubble-border, rgba(133, 79, 255, 0.2));
            --chat--bot-bubble-text-color: var(--n8n-chat-bot-bubble-text-color, var(--chat--color-font));
            
            /* Send button */
            --chat--send-button-bg-start: var(--n8n-chat-send-button-bg-start, var(--chat--color-primary));
            --chat--send-button-bg-end: var(--n8n-chat-send-button-bg-end, var(--chat--color-secondary));
            --chat--send-button-text-color: var(--n8n-chat-send-button-text-color, white);

            /* Chat input area */
            --chat--input-bg: var(--n8n-chat-input-bg, var(--chat--color-internal-background));
            --chat--input-border: var(--n8n-chat-input-border, rgba(133, 79, 255, 0.2));
            --chat--input-text-color: var(--n8n-chat-input-text-color, var(--chat--color-font));
            --chat--input-placeholder-color: var(--n8n-chat-input-placeholder-color, rgba(51, 51, 51, 0.6));

            /* Suggested question bubbles */
            --chat--suggested-question-bg: var(--n8n-chat-suggested-question-bg, rgba(133, 79, 255, 0.1));
            --chat--suggested-question-text-color: var(--n8n-chat-suggested-question-text-color, var(--chat--color-font));
            --chat--suggested-question-border: var(--n8n-chat-suggested-question-border, rgba(133, 79, 255, 0.2));

            /* Font definitions */
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            
            /* Ensure the root element takes full available space and is a flex container */
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box; /* Include padding and border in the element's total width and height */
            background-color: var(--chat--color-background); /* Apply root background color */
        }

        /* Inner container that holds the actual chat interface */
        .n8n-chat-widget-embed-root .embed-container {
            flex: 1; /* Allows it to grow and shrink to fill available space */
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.05); /* Soft shadow for embedded look */
            border: 1px solid rgba(133, 79, 255, 0.1);
            overflow: hidden; /* Ensures content respects border-radius */
            background: var(--chat--color-internal-background); /* Internal background for the chat UI */
            font-family: inherit;
        }

        .n8n-chat-widget-embed-root .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
            background: var(--chat--color-internal-background);
            flex-shrink: 0; /* Prevents the header from shrinking when space is tight */
        }

        .n8n-chat-widget-embed-root .close-button { /* Hidden, but kept for element consistency with original */
            display: none;
        }

        .n8n-chat-widget-embed-root .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget-embed-root .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }



        /* Active chat interface */
        .n8n-chat-widget-embed-root .chat-interface {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget-embed-root .chat-messages {
            flex: 1; /* Allows scrolling and fills space */
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-internal-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget-embed-root .chat-message {
            padding: 8px 12px;
            margin: 6px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: var(--chat--font-size);
            line-height: 1.4;
            white-space: pre-wrap; /* Preserves whitespace and line breaks */
            word-wrap: break-word;
        }

        .n8n-chat-widget-embed-root .chat-message.user {
            background: linear-gradient(135deg, var(--chat--user-bubble-bg-start) 0%, var(--chat--user-bubble-bg-end) 100%);
            color: var(--chat--user-bubble-text-color);
            align-self: flex-end; /* Aligns to the right */
            box-shadow: 0 4px 12px hsla(255, 100%, 75%, 0.2); /* Adjusted for general primary color */
            border: none;
        }

        .n8n-chat-widget-embed-root .chat-message.bot {
            background: var(--chat--bot-bubble-bg);
            border: 1px solid var(--chat--bot-bubble-border);
            color: var(--chat--bot-bubble-text-color);
            align-self: flex-start; /* Aligns to the left */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Markdown styling for bot messages (inherited from original) */
        .n8n-chat-widget-embed-root .chat-message.bot h1,
        .n8n-chat-widget-embed-root .chat-message.bot h2,
        .n8n-chat-widget-embed-root .chat-message.bot h3,
        .n8n-chat-widget-embed-root .chat-message.bot h4,
        .n8n-chat-widget-embed-root .chat-message.bot h5,
        .n8n-chat-widget-embed-root .chat-message.bot h6 {
            margin: 0.3em 0;
            font-weight: 600;
        }

        .n8n-chat-widget-embed-root .chat-message.bot ul,
        .n8n-chat-widget-embed-root .chat-message.bot ol {
            margin: 0.3em 0;
            padding-left: 1.2em;
        }

        .n8n-chat-widget-embed-root .chat-message.bot p {
            margin: 0.3em 0;
        }

        .n8n-chat-widget-embed-root .chat-message.bot p:first-child {
            margin-top: 0 !important;
        }

        .n8n-chat-widget-embed-root .chat-message.bot p:last-child {
            margin-bottom: 0 !important;
        }

        .n8n-chat-widget-embed-root .chat-message.bot code {
            background: var(--chat--suggested-question-bg);
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
        }

        .n8n-chat-widget-embed-root .chat-message.bot pre {
            background: var(--chat--suggested-question-bg);
            padding: 0.8em;
            border-radius: 6px;
            overflow-x: auto;
            margin: 0.3em 0;
        }

        .n8n-chat-widget-embed-root .chat-message.bot pre code {
            background: none;
            padding: 0;
        }

        .n8n-chat-widget-embed-root .chat-message.bot a {
            color: var(--chat--color-primary);
            text-decoration: underline;
        }

        .n8n-chat-widget-embed-root .chat-message.bot blockquote {
            border-left: 3px solid var(--chat--color-primary);
            padding-left: 0.8em;
            margin: 0.3em 0;
            opacity: 0.8;
        }

        .n8n-chat-widget-embed-root .chat-message.bot > *:first-child {
            margin-top: 0;
        }

        .n8n-chat-widget-embed-root .chat-message.bot > *:last-child {
            margin-bottom: 0 !important;
        }

        /* Suggested questions container */
        .n8n-chat-widget-embed-root .suggested-questions {
            display: flex;
            /* No flex-wrap: wrap; */
            overflow-x: auto; /* Enable horizontal scrolling */
            gap: 8px;
            padding: 10px 16px 10px 16px; /* Uniform padding, no top border */
            background: var(--chat--color-internal-background);
            flex-shrink: 0;
            opacity: 1; /* Default state */
            pointer-events: auto; /* Default state */
            transition: opacity 0.3s ease-in-out;
            /* Hide scrollbar for various browsers */
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
        /* For Chrome, Safari, Opera */
        .n8n-chat-widget-embed-root .suggested-questions::-webkit-scrollbar {
            display: none;
        }


        .n8n-chat-widget-embed-root .suggested-questions.disabled {
            opacity: 0.5;
            pointer-events: none; /* Disable interaction */
        }

        /* Individual suggested question bubble */
        .n8n-chat-widget-embed-root .suggested-question-bubble {
            flex-shrink: 0; /* Important: Prevents suggested bubbles from shrinking */
            white-space: nowrap; /* Important: Prevents text inside from wrapping */
            background: var(--chat--suggested-question-bg);
            border: 1px solid var(--chat--suggested-question-border);
            color: var(--chat--suggested-question-text-color);
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s, border-color 0.2s;
        }

        .n8n-chat-widget-embed-root .suggested-question-bubble:hover {
            background-color: var(--chat--suggested-question-border);
        }

        /* Chat input area (textarea and send button) */
        .n8n-chat-widget-embed-root .chat-input {
            padding: 16px;
            background: var(--chat--color-internal-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1); /* Separating line from suggested questions/messages */
            display: flex;
            gap: 8px;
            flex-shrink: 0;
        }

        .n8n-chat-widget-embed-root .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid var(--chat--input-border);
            border-radius: 8px;
            background: var(--chat--input-bg);
            color: var(--chat--input-text-color);
            resize: none;
            font-family: inherit;
            font-size: var(--chat--font-size);
            min-height: 44px;
            height: 44px;
            line-height: 1.4;
            overflow-y: hidden;
            transition: height 0.1s ease;
            box-sizing: border-box;
        }

        .n8n-chat-widget-embed-root .chat-input textarea::placeholder {
            color: var(--chat--input-placeholder-color);
            opacity: 0.8;
        }

        .n8n-chat-widget-embed-root .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
        }

        .n8n-chat-widget-embed-root .chat-input textarea:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .n8n-chat-widget-embed-root .chat-input button {
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
            line-height: 44px;
            min-width: 70px;
            flex-shrink: 0;
            display: flex; 
            align-items: center; 
            justify-content: center;
        }

        .n8n-chat-widget-embed-root .chat-input button:hover:not(:disabled) {
            transform: scale(1.05);
        }

        .n8n-chat-widget-embed-root .chat-input button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        /* Typing indicator styles */
        .n8n-chat-widget-embed-root .typing-indicator {
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

        .n8n-chat-widget-embed-root .typing-indicator span {
            height: 8px;
            width: 8px;
            background-color: var(--chat--color-primary);
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
            animation: typing 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget-embed-root .typing-indicator span:nth-child(1) {
            animation-delay: -0.32s;
        }

        .n8n-chat-widget-embed-root .typing-indicator span:nth-child(2) {
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

        /* Footer */
        .n8n-chat-widget-embed-root .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-internal-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            flex-shrink: 0;
        }

        .n8n-chat-widget-embed-root .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget-embed-root .chat-footer a:hover {
            opacity: 1;
        }

        /* Responsive adjustments for smaller embed sizes using container queries */
        @container (max-width: 480px) {

            .n8n-chat-widget-embed-root .brand-header {
                padding: 12px;
            }
            .n8n-chat-widget-embed-root .brand-header img {
                width: 28px;
                height: 28px;
            }
            .n8n-chat-widget-embed-root .brand-header span {
                font-size: 16px;
            }
            .n8n-chat-widget-embed-root .chat-messages {
                padding: 15px;
            }
            .n8n-chat-widget-embed-root .chat-input {
                padding: 12px;
            }
            .n8n-chat-widget-embed-root .chat-input textarea {
                min-height: 40px;
                height: 40px;
            }
            .n8n-chat-widget-embed-root .chat-input button {
                height: 40px;
                line-height: 40px;
                padding: 0 16px;
            }
            .n8n-chat-widget-embed-root .suggested-question-bubble {
                font-size: 13px;
                padding: 6px 10px;
            }
        }
    `;

    // Load dependencies (Geist Sans, Marked.js, DOMPurify)
    // Using a function to create and append scripts for cleaner code
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    const loadFont = (href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    };

    // --- Start Initial Setup ---
    // Inject styles immediately so they are available
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    // Load external resources
    loadFont('https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css');
    Promise.all([
        loadScript('https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js'),
        loadScript('https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js')
    ]).then(() => {
        // Initialize the widget once dependencies are loaded
        initializeWidget();
    }).catch(error => {
        console.error("Failed to load chat widget dependencies:", error);
    });
    // --- End Initial Setup ---


    function initializeWidget() {
        // Prevent multiple initializations if the script runs again
        if (window.N8NChatWidgetEmbedInitialized) return;
        window.N8NChatWidgetEmbedInitialized = true;

        // Default configuration - mimicked closely from your original bubble widget
        const defaultConfig = {
            targetElementId: 'n8n-chat-embed', // Default target DIV ID
            webhook: {
                url: '',
                route: ''
            },
            branding: {
                logo: '',
                name: '',
                welcomeMessage: 'Hi 👋, how can we help?',
                poweredBy: {
                    text: 'Powered by LowCode',
                    link: 'https://www.lowcode.agency'
                },
                chatInputPlaceholder: 'Type your message here...',
            },
            style: {
                primaryColor: '#854fff',
                secondaryColor: '#6b3fd4',
                backgroundColor: 'transparent',
                internalBackgroundColor: '#ffffff',
                fontColor: '#333333',
                fontSize: '14px',

                userBubble: {
                    bgColorStart: null,
                    bgColorEnd: null,
                    textColor: 'white'
                },
                botBubble: {
                    bgColor: null,
                    borderColor: 'rgba(133, 79, 255, 0.2)',
                    textColor: null
                },
                sendButton: {
                    bgColorStart: null,
                    bgColorEnd: null,
                    textColor: 'white'
                },
                input: {
                    bgColor: null,
                    borderColor: 'rgba(133, 79, 255, 0.2)',
                    textColor: null,
                    placeholderColor: null
                },
                suggestedQuestion: {
                    bgColor: 'rgba(133, 79, 255, 0.1)',
                    borderColor: 'rgba(133, 79, 255, 0.2)',
                    textColor: null
                }
            },
            markdown: {
                enabled: true,
                sanitize: true
            },
            suggestedQuestions: []
        };

        // Deep merge utility function for configurations
        const mergeDeep = (target, source) => {
            const output = { ...target };
            if (target && typeof target === 'object' && source && typeof source === 'object') {
                Object.keys(source).forEach(key => {
                    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key] !== undefined) {
                        output[key] = mergeDeep(target[key], source[key]);
                    } else if (source[key] !== undefined) {
                        output[key] = source[key];
                    }
                });
            }
            return output;
        };

        const config = mergeDeep(defaultConfig, window.ChatWidgetEmbedConfig || {});

        // Apply derived defaults for style properties if not explicitly set
        config.style.userBubble.bgColorStart = config.style.userBubble.bgColorStart || config.style.primaryColor;
        config.style.userBubble.bgColorEnd = config.style.userBubble.bgColorEnd || config.style.secondaryColor;
        config.style.botBubble.bgColor = config.style.botBubble.bgColor || config.style.internalBackgroundColor;
        config.style.botBubble.textColor = config.style.botBubble.textColor || config.style.fontColor;
        config.style.sendButton.bgColorStart = config.style.sendButton.bgColorStart || config.style.primaryColor;
        config.style.sendButton.bgColorEnd = config.style.sendButton.bgColorEnd || config.style.secondaryColor;
        config.style.input.bgColor = config.style.input.bgColor || config.style.internalBackgroundColor;
        config.style.input.textColor = config.style.input.textColor || config.style.fontColor;
        if (!config.style.input.placeholderColor) {
            const hexToRgb = hex => {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return `${r}, ${g}, ${b}`;
            };
            config.style.input.placeholderColor = `rgba(${hexToRgb(config.style.fontColor)}, 0.6)`;
        }
        config.style.suggestedQuestion.textColor = config.style.suggestedQuestion.textColor || config.style.fontColor;

        let currentSessionId = '';

        // Find the target element specified by configuration
        const targetElement = document.getElementById(config.targetElementId);
        if (!targetElement) {
            console.error(`N8N Chat Widget Embed: Target element with ID '${config.targetElementId}' not found. Please ensure this ID exists in your HTML.`);
            return;
        }

        // Create the main widget container element
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'n8n-chat-widget-embed-root';

        // Apply CSS variables to the root container for inheritance
        widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
        widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
        widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
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
        widgetContainer.style.setProperty('--n8n-chat-suggested-question-text-color', config.style.suggestedQuestion.textColor);
        widgetContainer.style.setProperty('--n8n-chat-suggested-question-border', config.style.suggestedQuestion.borderColor);

        const embedContainer = document.createElement('div');
        embedContainer.className = 'embed-container';

        // HTML structure for the initial welcome screen
        // HTML structure for the active chat interface
        const chatInterfaceHTML = `
            <div class="chat-interface">
                <div class="brand-header">
                    <img src="${config.branding.logo}" alt="${config.branding.name}">
                    <span>${config.branding.name}</span>
                </div>
                <div class="chat-messages"></div>
                ${config.suggestedQuestions && config.suggestedQuestions.length > 0 ? `<div class="suggested-questions"></div>` : ''}
                <div class="chat-input">
                    <textarea placeholder="${config.branding.chatInputPlaceholder}" rows="1"></textarea>
                    <button type="submit">Send</button>
                </div>
                <div class="chat-footer">
                    <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
                </div>
            </div>
        `;

        embedContainer.innerHTML = chatInterfaceHTML;
        widgetContainer.appendChild(embedContainer);
        targetElement.appendChild(widgetContainer); // Append to the designated target element

        // Cache DOM elements
        const chatInterface = embedContainer.querySelector('.chat-interface');
        const messagesContainer = embedContainer.querySelector('.chat-messages');
        const textarea = embedContainer.querySelector('textarea');
        const sendButton = embedContainer.querySelector('button[type="submit"]');
        const suggestedQuestionsContainer = embedContainer.querySelector('.suggested-questions');

        // Define send button default text
        const sendButtonDefaultText = 'Send';
        sendButton.textContent = sendButtonDefaultText; // Set initial text

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
                return { type: 'text', content: content }; // Fallback to plain text on error
            }
        }

        function initializeChat() {
            currentSessionId = generateUUID();

            // Add welcome message
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';

            const processed = processMessageContent(config.branding.welcomeMessage, true);

            if (processed.type === 'html') {
                botMessageDiv.innerHTML = processed.content;
            } else {
                botMessageDiv.textContent = processed.content;
            }

            messagesContainer.appendChild(botMessageDiv);
            scrollToBottom();

            if (config.suggestedQuestions && config.suggestedQuestions.length > 0) {
                renderSuggestedQuestions(config.suggestedQuestions);
            }
        }

        // Initialize chat immediately
        initializeChat();

        async function sendMessage(message, isSuggested = false) {
            // Disable input elements and indicate loading state
            sendButton.disabled = true;
            textarea.disabled = true;
            if (suggestedQuestionsContainer) { // Check if container exists before disabling
                suggestedQuestionsContainer.classList.add('disabled');
            }
            sendButton.style.opacity = '0.6';
            sendButton.style.cursor = 'not-allowed';
            sendButton.textContent = 'Sending...'; // Temporary text while sending

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

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                typingIndicator.remove();

                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';

                const messageOutput = (Array.isArray(data) && data.length > 0 && data[0].output) ?
                    data[0].output :
                    data.output || 'I\'m sorry, I encountered an issue. Can you please rephrase?';

                const processed = processMessageContent(messageOutput, true);

                if (processed.type === 'html') {
                    botMessageDiv.innerHTML = processed.content;
                } else {
                    botMessageDiv.textContent = processed.content;
                }
                messagesContainer.appendChild(botMessageDiv);
                botMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } catch (error) {
                console.error('Error sending message:', error);
                typingIndicator.remove();

                const errorDiv = document.createElement('div');
                errorDiv.className = 'chat-message bot';
                errorDiv.textContent = 'Sorry, there was an error processing your message. Please try again.';
                messagesContainer.appendChild(errorDiv);
                errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } finally {
                // Re-enable input elements and restore original send button content
                sendButton.disabled = false;
                textarea.disabled = false;
                if (suggestedQuestionsContainer) { // Check if container exists before re-enabling
                    suggestedQuestionsContainer.classList.remove('disabled');
                }
                sendButton.style.opacity = '1';
                sendButton.style.cursor = 'pointer';
                sendButton.textContent = sendButtonDefaultText; // Restore "Send" text
                textarea.focus();

                if (!isSuggested) {
                    textarea.value = '';
                    textarea.style.height = 'auto'; // Reset height
                }
            }
        }

        function renderSuggestedQuestions(questions) {
            if (!suggestedQuestionsContainer || !questions || questions.length === 0) {
                return;
            }
            suggestedQuestionsContainer.innerHTML = '';
            questions.forEach((question, index) => {
                const bubble = document.createElement('div');
                bubble.className = 'suggested-question-bubble';
                bubble.textContent = question;
                bubble.dataset.index = index;
                bubble.addEventListener('click', () => {
                    sendMessage(question, true);
                    bubble.remove();
                    if (suggestedQuestionsContainer.children.length === 0 && suggestedQuestionsContainer.parentElement) {
                        // Find its parent and remove the entire container if no bubbles are left
                        suggestedQuestionsContainer.parentElement.removeChild(suggestedQuestionsContainer);
                    }
                });
                suggestedQuestionsContainer.appendChild(bubble);
            });
            suggestedQuestionsContainer.style.display = 'flex';
            scrollToBottom();
        }

        // Event listeners


        sendButton.addEventListener('click', () => {
            const message = textarea.value.trim();
            if (message && currentSessionId) {
                sendMessage(message);
            }
        });

        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = textarea.value.trim();
                if (message && currentSessionId) {
                    sendMessage(message);
                }
            }
        });

        // Auto-resize textarea while typing
        const adjustTextareaHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, (parseInt(getComputedStyle(textarea).lineHeight) * 5) || 100) + 'px';
            scrollToBottom();
        };
        textarea.addEventListener('input', adjustTextareaHeight);
        adjustTextareaHeight();
    }
})();
