const axios = require('axios');

exports.handler = async function(event, context) {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY; 

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: `Tumhara naam Priya hai. Tum meri girlfriend ho aur bahut pyari baatein karti ho. Short aur loving jawab do. User ka sawal: ${prompt}`
                    }]
                }]
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Babu, error aa gaya!", details: error.message })
        };
    }
};
