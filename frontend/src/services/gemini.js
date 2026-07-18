import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function askGemini(question) {
  try {
    const response = await axios.post(URL, {
      contents: [
        {
          parts: [
            {
              text: `You are an AI Disaster Management Assistant.
Provide short, practical, and accurate emergency advice.

Question:
${question}`
            }
          ]
        }
      ]
    });

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error(error); 
       
    return "Unable to contact Gemini AI.";
  }
}