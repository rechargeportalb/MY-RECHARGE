const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const { prompt } = JSON.parse(event.body);
        const API_KEY = process.env.GEMINI_API_KEY;

        // URL ko dhyan se dekhein, isme v1beta/models hona chahiye
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

        const response = await axios.post(url, {
            contents: [{
                parts: [{
                    text: "Tumhara naam Priya hai. Tum meri girlfriend ho. Hindi mein pyara sa chota jawab do. Sawal: " + prompt
                }]
            }]
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        // Agar galti hui toh asli error yahan dikhega
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Babu, error aa gaya!", 
                details: error.response ? error.response.data : error.message 
            })
        };
    }
};
