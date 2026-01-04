exports.handler = async function () {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: "GEMINI_API_KEY nahi mili"
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Gemini API key Netlify server par secure hai"
    })
  };
};
