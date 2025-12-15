# N8N Chat Embed 💬

A minimal, highly customizable chat widget designed for easy embedding on any website. It connects to your **n8n automation flows** via a webhook, making it simple to build AI-powered conversational experiences.

---

## Quick Usage (CDN)

To add the chat widget to your website, include a container `div`, the configuration `<script>`, and the widget script itself. Place this code snippet anywhere in the `<body>` of your HTML page.

### The Installation Template

Use the following code block in your HTML.

**Remember to replace the placeholders!**

```html
<style>
  html, body {
    height: 100%;
    margin: 0;
    background: transparent;
  }
  #n8n-chat-embed {
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
</style>

<div id="n8n-chat-embed"></div>

<!-- Widget Configuration -->
<script>
  window.ChatWidgetEmbedConfig = {
    targetElementId: 'n8n-chat-embed', // IMPORTANT: Must match the ID of your div
    webhook: {
      url: 'YOUR_N8N_WEBHOOK_URL_HERE',
      route: 'general'
    },
    branding: {
      logo: 'YOUR_LOGO_URL_HERE',
      name: 'YOUR COMPANY NAME',
      welcomeMessage: 'Hi! How can we help you today?',
      chatInputPlaceholder: 'Type your message here...', // Optional
      poweredBy: {
        text: 'Powered by LowCode',
        link: 'https://www.lowcode.agency'
      }
    },
    style: {
      primaryColor: '#854fff',
      secondaryColor: '#6b3fd4',
      backgroundColor: 'transparent', // Root container background
      internalBackgroundColor: '#ffffff', // Chat UI background
      fontColor: '#333333',
      fontSize: '14px',
    }
  };
</script>

<script src="https://cdn.jsdelivr.net/gh/daniel-lca/N8N-Chat-Embed@master/chat-embed.js"></script>
<!-- End Widget Configuration -->
```

## Configuration Reference

The `window.ChatWidgetEmbedConfig` object allows you to customize every aspect of the widget.

### Core Configuration
| Property | Description |
|----------|-------------|
| `targetElementId` | **Required**. The ID of the `div` where the widget will be rendered. |
| `webhook.url` | **Required**. Your n8n production webhook URL. |
| `webhook.route` | Optional. A route identifier to handle different flows in your n8n workflow. |

### Branding
| Property | Description |
|----------|-------------|
| `branding.logo` | URL to your logo image (PNG, SVG, etc.). |
| `branding.name` | Your company or bot name. |
| `branding.welcomeMessage` | The initial message shown by the bot. |
| `branding.chatInputPlaceholder` | Placeholder text for the input field. |
| `branding.poweredBy` | Object with `text` and `link` to customize the footer. |

### Main Styling
| Property | Description |
|----------|-------------|
| `style.primaryColor` | Main accent color (used for user bubbles, send button). |
| `style.secondaryColor` | Secondary accent color for gradients. |
| `style.backgroundColor` | Background of the root container (default: `transparent`). |
| `style.internalBackgroundColor` | Background of the chat interface itself (default: `#ffffff`). |
| `style.fontColor` | Main text color. |
| `style.fontSize` | Base font size (default: `14px`). |

### Component Styling
You can further granularly style specific components. Nested under `style`:

#### User Bubble (`style.userBubble`)
| Property | Description |
|----------|-------------|
| `bgColorStart` | Gradient start color (defaults to `primaryColor`). |
| `bgColorEnd` | Gradient end color (defaults to `secondaryColor`). |
| `textColor` | Text color (defaults to `white`). |

#### Bot Bubble (`style.botBubble`)
| Property | Description |
|----------|-------------|
| `bgColor` | Background color (defaults to `internalBackgroundColor`). |
| `borderColor` | Border color. |
| `textColor` | Text color (defaults to `fontColor`). |

#### Send Button (`style.sendButton`)
| Property | Description |
|----------|-------------|
| `bgColorStart` | Gradient start color (defaults to `primaryColor`). |
| `bgColorEnd` | Gradient end color (defaults to `secondaryColor`). |
| `textColor` | Text color (defaults to `white`). |

#### Input Field (`style.input`)
| Property | Description |
|----------|-------------|
| `bgColor` | Background color. |
| `borderColor` | Border color. |
| `textColor` | Text color. |
| `placeholderColor` | Color of the placeholder text. |

#### Suggested Questions (`style.suggestedQuestion`)
| Property | Description |
|----------|-------------|
| `bgColor` | Background color. |
| `borderColor` | Border color. |
| `textColor` | Text color. |

### Markdown
| Property | Description |
|----------|-------------|
| `markdown.enabled` | Enable/disable markdown rendering (default: `true`). |
| `markdown.sanitize` | Enable/disable HTML sanitization (default: `true`). |

### Suggested Questions
Initialize the chat with quick-reply options.

```javascript
suggestedQuestions: [
  "What is your pricing?",
  "How do I duplicate a template?"
]
```
