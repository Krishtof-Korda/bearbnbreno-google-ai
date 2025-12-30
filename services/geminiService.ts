
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const generateItinerary = async (days: number, activity: string, season: string) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Adventure planning is offline.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Plan a ${days}-day High Sierra road trip starting from Reno, NV during the ${season} season, focusing on ${activity}. 
  The traveler is using a luxury Mercedes Sprinter van. 
  Suggest specific spots for overnight van camping, scenic overlooks, and local gems.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                activity: { type: Type.STRING },
                highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["day", "activity", "highlights"]
            }
          },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "days", "tips"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
