import { GoogleGenAI } from "@google/genai";

//GREETING GENERATOR FROM AI

const greetings = [
  "Hello 👋 Welcome to the OIRS AI Assistant. How may I help you today?",

  "Welcome to OIRS 👋 I'm here to assist you with tax-related questions.",

  "Hi there 👋 Need help with taxes, payments, or TCC? I'm here to help.",

  "Welcome 👋 How can I assist you with your OIRS-related inquiry today?",

  "Welcome to the OIRS digital assistant 👋 How may we assist you today?",

  "Hello 👋 Need assistance with revenue services, tax payments, or complaints? We're ready to help.",

  "Welcome 👋 Feel free to ask about tax clearance certificates, payment procedures, or office information.",

  "Hi there 👋 Looking for help with tax services or official OIRS information? We're here for you.",

  "Welcome to OIRS 👋 Please tell us how we can assist you today.",
];

export const generateGreeting = async () => {
  const randomIndex = Math.floor(Math.random() * greetings.length);

  return greetings[randomIndex];
};
