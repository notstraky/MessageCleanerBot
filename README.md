# MessageCleaner Bot

A Discord bot that automatically deletes messages in specified channels to keep your server clean.

## Features
- Automatically removes messages based on defined criteria.
- Customizable settings for different channels.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/notstraky/MessageCleaner.git
   cd MessageCleaner
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```bash
   DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
   CLIENT_ID=YOUR_CLIENT_ID

   ```
4. Run the bot:
   ```bash
   node index.js
   ```

## Usage

Once the bot is added to your server, it will start monitoring the specified channels for messages to delete based on the configured rules. You can configure the channels and the criteria for deletion in the bot's settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
