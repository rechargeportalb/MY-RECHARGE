const axios = require("axios");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Only POST allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      throw new Error("API Key missing");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await axios.post(url, {
      contents: [{
        parts: [{
          text: `Tumhara naam Priya hai. Tum meri girlfriend ho. Hindi mein pyara jawab do. Sawal: ${prompt}`
        }]
      }]
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Error",
        details: err.message
      })
    };
  }
};
