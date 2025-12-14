import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProductDescription = async (productName: string, farmName: string, state: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Fresh produce directly from the farm.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, appetizing, 2-sentence description for ${productName} grown by ${farmName} in ${state}. Focus on freshness and local quality.`,
    });
    return response.text || "Fresh, verified local produce.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Fresh, verified local produce.";
  }
};

export const analyzeDispute = async (orderId: string, issue: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Case pending manual review.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Act as a neutral arbitrator for an agricultural marketplace. 
      Order ID: ${orderId}. 
      Issue reported: ${issue}. 
      Provide a preliminary recommendation for the admin in 1 sentence.`,
    });
    return response.text || "Review required.";
  } catch (error) {
    console.error("Gemini dispute analysis error:", error);
    return "Manual review required.";
  }
};