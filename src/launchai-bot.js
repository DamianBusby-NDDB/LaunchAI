require('dotenv').config();

const { Client, Intents, MessageEmbed } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });
const PREFIX = "la!";

bot.once('ready', () => {
    console.log(`${bot.user.username} has logged in.`);
});

bot.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    const welcomeEmbed = new MessageEmbed()
        .setColor('#03038C')
        .setTitle('Congratulations Recruit!')
        .setThumbnail('https://cdn.discordapp.com/attachments/547250406070157320/875860415731609641/nuclear_wolves_server_icon_v3.jpg')
        .setDescription(`Recruit ${member.user.tag}\n\nYou have been officially recruited into the Nuclear Wolves Division!\n\nUpon being recruited all of your other servers will be instantly nuked by order of the Alpha Commander!`)
        .addField('\u200B', 'Head over to #laws for briefing before introducing yourself to the other members!')
        .setImage('https://cdn.discordapp.com/attachments/547250406070157320/875875257616064572/nuke.gif');
    member.guild.channels.cache.get('875859071121620992').send({ embeds: [welcomeEmbed] });
    console.log("Member Joined!");
})

bot.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(" ");
        console.log(CMD_NAME);
        console.log(args);
        message.reply('You used a command called ', CMD_NAME, " which does not exist.");
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);

