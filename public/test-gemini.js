const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require('dotenv').config();

// Use key from ai-config.js (hardcoded for test)
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyB6JD17T1pk7EaH6QKzf9si7nqctVuJJxA';

async function run() {
    console.log("Testing Gemini API...");
    const genAI = new GoogleGenerativeAI(API_KEY);

    // List models
    /*
    const modelResponse = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    */
    // Wait, getGenerativeModel doesn't fetch. It just configures.
    // I need to find a way to list models via REST or check docs.
    // Standard names: "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"

    // Try vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Read PDF
    const pdfPath = './documentos/convenios/convenio_alcobendas_2024-2027.pdf';
    console.log("Reading PDF:", pdfPath);

    if (!fs.existsSync(pdfPath)) {
        console.error("PDF not found!");
        return;
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString('base64');
    const pdfPart = {
        inlineData: {
            data: pdfBase64,
            mimeType: "application/pdf",
        },
    };

    const prompt = "Please analyze this document. What is it about? Does it mention 'vacaciones'?";

    try {
        const result = await model.generateContent([prompt, pdfPart]);
        const response = await result.response;
        const text = response.text();
        console.log("Response:", text);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

run();
