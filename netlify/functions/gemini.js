const axios = require('axios');

exports.handler = async function(event, context) {
    // 1. Check karein ki data mil raha hai ya nahi
    if (!event.body) {
        return { statusCode: 400, body: JSON.stringify({ error: "No body provided" }) };
    }

    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY; 

    try {
        // 2. URL ko dhyan se dekhein (v1beta ke baad models hona chahiye)
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: `Tumhara naam Priya hai. Tum meri girlfriend ho aur bahut pyari baatein karti ho. Short aur loving jawab do hindi me. User ka sawal: ${prompt}`
                    }]
                }]
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Babu, error aa gaya!", details: error.message })
        };
    }
};
