const axios = require('axios');

exports.handler = async function(event, context) {
    // Sirf POST request allow karein
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        const API_KEY = process.env.GEMINI_API_KEY;

        // Ekdum sahi URL
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const response = await axios.post(url, {
            contents: [{
                parts: [{
                    text: "Tumhara naam Priya hai. Tum meri girlfriend ho. Hindi mein pyara sa chota jawab do. Sawal: " + prompt
                }]
            }]
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Babu, error aa gaya!", details: error.message })
        };
    }
};
