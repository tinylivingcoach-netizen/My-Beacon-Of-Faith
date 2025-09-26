import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function findScripture(feeling: string, version: string): Promise<string> {
  if (!feeling.trim()) {
    return "Please enter what you're feeling to receive guidance.";
  }

  const prompt = `You are a compassionate and wise Christian guide. A person has shared their feelings: "${feeling}". 

Your task is to:
1.  Find a single, deeply relevant Bible scripture (including the book, chapter, and verse) from the **${version}** translation.
2.  Provide a thoughtful, empathetic, and encouraging reflection (3-4 sentences long).
3.  Provide a brief, 1-2 sentence context about the scripture (e.g., its author, historical setting, or theological importance).

Format the response *exactly* like this, with each part separated by '::':
SCRIPTURE_REFERENCE :: SCRIPTURE_TEXT :: REFLECTION :: CONTEXT

For example, if the feeling was "I feel so alone and forgotten" and the version was NKJV, a good response might be:
Deuteronomy 31:6 :: Be strong and of good courage, do not fear nor be afraid of them; for the LORD your God, He is the One who goes with you. He will not leave you nor forsake you. :: It sounds incredibly painful to feel alone and forgotten, and your feelings are valid. This promise in Deuteronomy is a powerful reminder that even when human support feels distant, God's presence is constant and unwavering. He is not just a passive observer; He actively goes *with* you into the very heart of your struggle. Hold onto this truth today: you are not forsaken. :: These were Moses' final words of encouragement to the Israelites before they entered the Promised Land, assuring them of God's faithful presence even in the face of great challenges.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I encountered an issue while seeking guidance. Please check your connection or try again later.";
  }
}

export async function getGuidance(question: string): Promise<string> {
  if (!question.trim()) {
    return "Please ask a question to receive guidance.";
  }

  const prompt = `You are a wise and compassionate Christian counselor. A person is seeking guidance on a life challenge. Their question is: "${question}".

Your task is to provide a thoughtful, empathetic, and encouraging response grounded in Christian principles and wisdom. Your answer should be:
1.  **Empathetic:** Acknowledge the person's feelings and the difficulty of their situation.
2.  **Biblically Informed:** Subtly weave in principles or themes from scripture without necessarily quoting specific verses unless it feels natural and powerful. The focus is on the wisdom, not just citation.
3.  **Actionable & Encouraging:** Offer gentle, practical steps or shifts in perspective. End on a note of hope and encouragement.
4.  **Formatted for Readability:** Use paragraph breaks for distinct thoughts. Use markdown \`**\` to bold key phrases or questions to guide the user's reflection.
5.  **Concise:** Keep the response to 2-3 paragraphs.

Do not be preachy. Be personal, warm, and understanding.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I encountered an issue while seeking guidance. Please check your connection or try again later.";
  }
}