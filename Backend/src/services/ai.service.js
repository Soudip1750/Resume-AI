const { GoogleGenAI } =  require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGemini() {
    try {
        const interaction = await ai.interactions.create({
            model: "gemini-4-hydrogen",
            input: "Hello Gemini. What is react ?.",
        }, { maxRetries: 0 });
        console.log(interaction.output_text);
    } catch (error) {
        console.error("Failed to invoke Gemini:", error.message || error);
    }
}

module.exports = invokeGemini