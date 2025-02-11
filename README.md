# Astris - AI-Powered Discord Bot

Astris is an AI-integrated chatbot for Discord, powered by the Groq API and the LLaMA 3 model. It can generate AI responses in a specific channel and also moderate messages to prevent offensive content.

## Features
- **AI Chatbot**: Uses Groq's API to generate responses from the `llama3-8b-8192` model.
- **Channel-Specific Responses**: The bot only replies in a designated channel.
- **Message Moderation**: Deletes messages containing banned words and notifies users via DM.

## Prerequisites
- Node.js (Latest LTS recommended)
- Discord bot token
- Groq API key
- A Discord server where the bot is added

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Astris.git
   cd Astris
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
1. Create a `.env` file in the project root and add the following:
   ```env
   DISCORD_TOKEN=your_discord_bot_token
   GORQ_API=your_groq_api_key
   CHANNEL_ID=your_specific_channel_id
   ```
2. Get the **channel ID** by enabling **Developer Mode** in Discord, right-clicking the channel, and selecting **Copy ID**.

## Usage
To start the bot, run:
```sh
npm run dev
```

## Bot Commands & Functionality
- **AI Chat Responses**: The bot listens to messages in the specified channel and replies with AI-generated responses.
- **Message Moderation**: If a user sends a message with banned words, it is deleted, and the user is notified via DM.

## Code Overview
### `bot.js`
- Initializes the bot with necessary intents.
- Handles message creation for AI responses and moderation.
- Splits long AI responses to fit Discord’s 2000-character limit.

## Contributing
Feel free to fork and contribute! Create a pull request with a detailed description of your changes.

## Contact
For issues or suggestions, open a GitHub issue or reach out on Discord.
