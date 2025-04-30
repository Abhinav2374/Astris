const axios = require("axios");

const endpoint = "https://api.groq.com/openai/v1";
const model = "gemma2-9b-it";

async function generateResponse(messages) {
  const response = await axios.post(
    endpoint + "/chat/completions",
    {
      model,
      messages,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API}`,
        "Content-Type": "application/json",
      },
    }
  );
  const botReply =
    response.data.choices?.[0]?.message?.content ||
    "Failed to generate responses to your request.";

  return botReply;
}

module.exports = generateResponse;
