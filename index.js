// Importar las clases necesarias de discord.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');

// Reemplaza 'TU_TOKEN_AQUÍ' y 'TU_CLIENT_ID_AQUÍ' con las variables de entorno
const TOKEN = process.env.DISCORD_TOKEN; 
const CLIENT_ID = process.env.CLIENT_ID;

// Crear una nueva instancia del cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Permite que el bot se conecte a los servidores
        GatewayIntentBits.GuildMessages, // Permite que el bot lea mensajes en los canales
        GatewayIntentBits.MessageContent // Permite que el bot acceda al contenido de los mensajes
    ]
});

// Definir los comandos
const commands = [
    {
        name: 'deleteall',
        description: 'Elimina todos los mensajes en el canal actual'
    }
];

// Registrar los comandos en Discord
const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Iniciando la actualización de comandos de slash...');

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });

        console.log('Comandos de slash actualizados correctamente.');
    } catch (error) {
        console.error(error);
    }
})();

// Evento que se activa cuando el bot se conecta
client.once(Events.ClientReady, () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// Evento que se activa cuando se usa un comando de interacción
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'deleteall') {
        const channel = interaction.channel;

        try {
            const messages = await channel.messages.fetch({ limit: 100 });
            await channel.bulkDelete(messages);
            await interaction.reply(`Eliminados ${messages.size} mensajes.`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Ocurrió un error al intentar eliminar los mensajes.');
        }
    }
});

// Evento que se activa al recibir un mensaje
client.on(Events.MessageCreate, async message => {
    // Verifica si el mensaje comienza con "!deleteall" y si el autor no es el bot
    if (message.content.startsWith('!deleteall') && !message.author.bot) {
        const channel = message.channel;

        try {
            const messages = await channel.messages.fetch({ limit: 100 });
            await channel.bulkDelete(messages);
            await message.channel.send(`Eliminados ${messages.size} mensajes.`);
        } catch (error) {
            console.error(error);
            await message.channel.send('Ocurrió un error al intentar eliminar los mensajes.');
        }
    }
});

// Iniciar sesión en Discord con el token del bot
client.login(TOKEN);
