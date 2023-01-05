const axios = require('axios');
const { API_KEY_OPEN_AI } = require('../config');

const ChatAIHandler = async (text, msg) => {

    const cmd = text.split('/');

    if (cmd.length < 2) {
        return msg.reply('Tulisan mu salah. ketik *#cb barkui pertanyaan*');
    }

    msg.reply('Sabar Otw IKI ');

    const question = cmd[1];
    const response = await ChatGPTRequest(question)

    if (!response.success) {
        return msg.reply('Inpo ini Eror maseh');
    }

    return msg.reply(response.data);
}


const ChatGPTRequest = async (text) => {

    const result = {
        success: false,
        data: null,
        message: "",
    }

    return await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        data: {
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 1000,
            temperature: 0
        },
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "in-ID",
            "Authorization": `Bearer ${API_KEY_OPEN_AI}`,
        },
    })
        .then((response) => {
            if (response.status == 200) {
                result.success = true;
                result.data = response?.data?.choices?.[0].text || 'KHAMU NANYA';
            } else {
                result.message = "Failed response";
            }

            return result;
        })
        .catch((error) => {
            result.message = "Error : " + error.message;
            return result;
        });
}

module.exports = {
    ChatAIHandler
}