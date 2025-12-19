import { GoogleGenAI, Type } from "@google/genai";
import { AdFormData, AdCopy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdCopies = async (data: AdFormData): Promise<AdCopy[]> => {
  const modelId = "gemini-3-flash-preview";

  const prompt = `
    You are an expert marketing copywriter. Create 3 distinct, high-converting ad copy variations for the following campaign:
    
    Product/Service: ${data.productName}
    Category: ${data.category}
    Target Audience: ${data.audience}
    Platform: ${data.platform}
    Tone: ${data.tone}
    Language: ${data.language}
    
    Requirements:
    - Headlines should be catchy and short.
    - Body text must be persuasive and optimized for ${data.platform} constraints (e.g., shorter for Instagram, character limits for Google Ads if applicable, conversational for WhatsApp).
    - Include a strong Call-to-Action (CTA).
    - Add relevant hashtags if the platform supports them (Instagram, Facebook, YouTube).
    - Ensure content is 100% original and plagiarism-free.
    - If Language is Urdu, ensure high-quality, natural-sounding Urdu script.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING, description: "The main headline of the ad" },
              body: { type: Type.STRING, description: "The main persuasive body text" },
              cta: { type: Type.STRING, description: "The call to action phrase" },
              hashtags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of relevant hashtags (empty if not applicable)"
              }
            },
            required: ["headline", "body", "cta", "hashtags"],
          },
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
        throw new Error("No response text received from Gemini.");
    }

    // Parse the JSON response
    const result = JSON.parse(responseText) as AdCopy[];
    return result;

  } catch (error) {
    console.error("Error generating ad copy:", error);
    throw error;
  }
};
