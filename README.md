# Z-API — WhatsApp Integration Examples for Node.js

Connect your Node.js application to WhatsApp with Z-API. Explore practical examples through an interactive command-line menu, or use the service functions as a starting point for your own integration.

## Prerequisites

- Node.js and npm installed.
- A [Z-API account](https://z-api.io).
- A Z-API instance connected to your WhatsApp account.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Z-API/whatsapp-api-nodejs.git
cd whatsapp-api-nodejs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your instance

Open `index.js` and set `INSTANCE_API` to your instance's API URL:

```javascript
const INSTANCE_API = 'YOUR_INSTANCE_API_URL'
```

If you haven't set up an instance yet, create an account at [z-api.io](https://z-api.io), connect your WhatsApp account, and copy your instance's API URL.

### 4. Run the examples

```bash
npm start
```

Follow the prompts in your terminal to explore the available examples.

## Explore the Code

- **`index.js`** — Configures your instance and starts the application.
- **`prompt/`** — Handles the interactive command-line menu.
- **`services/`** — Contains the integration functions you can call directly or adapt for your own application.

## Build Your Integration

Use these examples to understand how Z-API requests work and bring WhatsApp connectivity into your application.

Ready to get started? Visit [z-api.io](https://z-api.io).
