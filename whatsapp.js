import qrcode from 'qrcode-terminal';

import { Client } from 'whatsapp-web.js';
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage("FMG9d5avWGj62YIPjfiwGp"+"@g.us", "Hi")
});

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    
    await chat.sendMessage(`Hello @${contact.id.user}`, {
        mentions: [contact]
    });
});
client.chat


client.initialize();