# N8N-Chat-Embed 💬

Embed a fully functional, customizable chat widget powered by **n8n** into any website.

---

## 🚀 Quick Start: Embedding the Widget

To embed the chat widget, you need to include a container `div`, the configuration `<script>`, and the widget script itself. Place this code snippet anywhere in the `<body>` of your HTML page.

### HTML Snippet

```html
<style>
  html, body {
    height: 100%;
    margin: 0;
    background: transparent;
  }
  #my-chat-embed-area {
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
</style>

<div id="my-chat-embed-area"></div>

<!-- Widget Configuration -->
<script>
  window.ChatWidgetEmbedConfig = {
    // IMPORTANT: This ID must match the ID of the div where the widget should be placed
    targetElementId: 'my-chat-embed-area', 
    webhook: {
      url: '[YOUR N8N WEBHOOK URL]',
      route: 'general'
    },
    branding: {
      logo: '[YOUR LOGO URL]',
      name: 'YOUR COMPANY NAME',
      welcomeText: 'Hi! How can we help you today?',
      responseTimeText: 'We tipically answer right away',
    },
    style: {
      primaryColor: '#4E76CC', // Main accent color
      secondaryColor: '#1E50BD', // Secondary accent color for gradients
      backgroundColor: 'transparent', // Determines the background of the *#my-chat-embed-area* div (the root container)
                                     // Set to 'transparent' to blend with Framer's background.
                                     // Change to a color like '#f5f5f5' if you want the whole embedded area to have a distinct background.
      internalBackgroundColor: 'transparent', // Determines the background of the *internal chat UI* (header, message area, input)
      fontColor: '#333333', // Default text color
      fontSize: '16px', // Base font size for messages and other text

      userBubble: {
        bgColorStart: null, // If null, will use primaryColor
        bgColorEnd: null,   // If null, will use secondaryColor
        textColor: 'white'  // Color of text in user bubbles
      },
      botBubble: {
        bgColor: '#f0f2f5',      // Custom background color for bot bubbles
        borderColor: '#e0e2e5',  // Custom border color for bot bubbles
        textColor: '#333333'     // Color of text in bot bubbles
      },
      sendButton: {
        bgColorStart: null, // If null, will use primaryColor
        bgColorEnd: null,   // If null, will use secondaryColor
        textColor: 'white'  // Color of text/icon in send button
      },
      input: {
        bgColor: null,      // If null, will use internalBackgroundColor
        borderColor: '#d0d2d5',  // Border color for the text input field
        textColor: null,    // If null, will use fontColor
        placeholderColor: null // If null, will derive from fontColor with opacity
      },
      suggestedQuestion: {
        bgColor: '#e6f0ff',      // Background color for suggested question bubbles
        borderColor: '#cce0ff',  // Border color for suggested question bubbles
        textColor: '#1E50BD'     // Color of text in suggested question bubbles
      }
    },
    markdown: {
      enabled: true,
      sanitize: true
    },
    suggestedQuestions: [
      "[SUGGESTED QUESTION 1]",
      "[SUGGESTED QUESTION 2]"
    ]
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Embed@master/chat-embed.js"></script>
<!-- End Widget Configuration -->
