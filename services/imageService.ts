import { GoogleGenAI } from "@google/genai";

export const generateHeroImage = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a cinematic, high-end luxury hero image for a travel website. 
  The subject is a white Mercedes-Benz Sprinter 170" van with black off-road wheels and black plastic body trim (modern adventure rig style). 
  The scene is set deep in the High Sierra mountains at dusk (blue hour). 
  The van's large black side awning is fully deployed. 
  In front of the van, there is a warm, crackling campfire with two premium outdoor lounge chairs. 
  The lighting is a beautiful mix of the deep blue evening sky and the cozy orange glow from the campfire and the van's interior warm lights. 
  Professional travel photography style, wide-angle lens, 4k resolution, inviting and adventurous atmosphere. No text or logos on the van.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: prompt }] 
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image generation service error:", error);
    return null;
  }
  return null;
};