# N8N-Chat-Embed 💬

Embed a fully functional, customizable chat widget powered by **n8n** into any website.

---

## 🚀 Quick Start: Embedding the Widget

To embed the chat widget, you need to include a container `div`, the configuration `<script>`, and the widget script itself. Place this code snippet anywhere in the `<body>` of your HTML page.

### HTML Snippet

```html
<div id="my-chat-widget-container" style="width: 100%; height: 600px; border-radius: 12px; overflow: hidden;">
    </div>

<script>
    window.ChatWidgetEmbedConfig = {
        targetElementId: 'my-chat-widget-container', // IMPORTANT: This ID must match the div above
        webhook: {
            url: '[https://primary-production-6de0c.up.railway.app/webhook/5eb97006-28d8-4035-9620-736fe8b97f3f/chat](https://primary-production-6de0c.up.railway.app/webhook/5eb97006-28d8-4035-9620-736fe8b97f3f/chat)',
            route: 'general'
        },
        branding: {
            logo: '[https://framerusercontent.com/images/GmjRK7jMHs05UBCDEmSdnK58.png?lossless=1&width=64&height=64](https://framerusercontent.com/images/GmjRK7jMHs05UBCDEmSdnK58.png?lossless=1&width=64&height=64)',
            name: 'Mexico EOR Specialist',
            welcomeText: '¡Hola! ¿En qué puedo ayudarte hoy?',
            responseTimeText: 'Normalmente respondemos de inmediato',
            poweredBy: {
                text: 'Desarrollado por LowCode',
                link: '[https://www.lowcode.agency](https://www.lowcode.agency)'
            }
        },
        style: {
            primaryColor: '#4E76CC',
            secondaryColor: '#1E50BD',
            backgroundColor: 'transparent', // Background of the ROOT container
            internalBackgroundColor: '#ffffff', // Background for the internal chat interface
            fontColor: '#333333',
            fontSize: '16px',

            userBubble: {
                bgColorStart: '#4E76CC',
                bgColorEnd: '#1E50BD',
                textColor: 'white'
            },
            botBubble: {
                bgColor: '#f0f2f5',
                borderColor: '#e0e2e5',
                textColor: '#333333'
            },
            sendButton: {
                bgColorStart: '#4E76CC',
                bgColorEnd: '#1E50BD',
                textColor: 'white'
            },
            input: {
                bgColor: '#ffffff',
                borderColor: '#d0d2d5',
                textColor: '#333333',
                placeholderColor: '#888888'
            },
            suggestedQuestion: {
                bgColor: '#e6f0ff',
                borderColor: '#cce0ff',
                textColor: '#1E50BD'
            }
        },
        markdown: {
            enabled: true,
            sanitize: true
        },
        suggestedQuestions: [
            "¿Cuáles son los beneficios de tener un EOR?",
            "¿Cómo funciona la nómina internacional?",
            "¿Qué países admite su servicio?",
            "¿Cuánto tiempo tarda la configuración?"
        ]
    };
</script>
<script src="[https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Widget@master/chat-widget-embed.js](https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Widget@master/chat-widget-embed.js)"></script>
