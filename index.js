const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === 'coba') {
        msg.reply('BOT PJI SIAP MELAYANI # fulsenyum');
    }
    if (text === 'inpo') {
        msg.reply('coba = menampilkan awal ');
        msg.reply('edit_bg/warna = mengubah beground ');
        msg.reply(' cb/pertanyaan = mencari jawaban di chat gpt ');
    }

    
    if (text.includes("edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    
    if (text.includes("cb/")) {
        await ChatAIHandler(text, msg);
    }

});

client.initialize();



