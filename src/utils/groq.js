const axios = require("axios");

const endpoint = "https://api.groq.com/openai/v1";
const model = "llama-3.1-8b-instant";

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
