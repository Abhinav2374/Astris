[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)  
[![forthebadge](https://forthebadge.com/images/badges/license-mit.svg)](https://forthebadge.com)

# Astris - AI-Powered Discord Bot

Astris is an AI-integrated chatbot for Discord, powered by the Groq API and Google's Gemma 2  model. It can generate AI responses in a specific channel and also moderate messages to prevent offensive content, and even host a text-based battle game for users to enjoy.

## Features
- **AI Chatbot**: Uses Groq's API to generate responses from the `gemma2-9b-it` model.
- **Channel-Specific Responses**: The bot only replies in a designated channel.
- **Message Moderation**: Deletes messages containing banned words and notifies users via DM.
- **Text-Based Battle Game**: Players can spawn enemies, attack them, and battle in real-time with a simple `!battle` and `attack` command system.

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
   GROQ_API=your_groq_api_key
   CHANNEL_ID=your_specific_channel_id
   ```
2. Get the **channel ID** by enabling **Developer Mode** in Discord, right-clicking the channel, and selecting **Copy ID**.

## Usage
To start the bot:

-For **production**(stable run):
```sh
npm start
```
For **development** (with live reload if using nodemon):
```sh
npm run dev
```

## Bot Commands & Functionality
- **AI Chat Responses**: The bot listens to messages in the specified channel and replies with AI-generated responses.
- **Message Moderation**: If a user sends a message with banned words, it is deleted, and the user is notified via DM.
- **Battle System**:
     - Use `!battle` to spawn a random enemy.
     - Use `attack` to fight the enemy.
     - Enemies will attack back with unique stats like health, attack, defense, and speed.
     - The game supports multiple players in the same battle.

## Code Overview
### `bot.js`
- Initializes the bot with necessary intents.
- Handles message creation for AI responses and moderation.
- Splits long AI responses to fit Discord’s 2000-character limit.

## Contributing
Feel free to fork and contribute! Create a pull request with a detailed description of your changes.

## Contact
For issues or suggestions, open a GitHub issue or reach out on Discord: `abhinav_2374`.

## License
This project is released under the [MIT License](LICENSE), making it free for personal and commercial use.
