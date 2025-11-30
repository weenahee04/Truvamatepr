import { GoogleGenAI, Type } from "@google/genai";

export const generateLuckyNumbers = async (
  gameName: string, 
  maxMain: number, 
  limitMain: number, 
  limitSpecial: number
): Promise<{ main: number[], special: number, reason: string }> => {
  
  if (!process.env.API_KEY) {
    // Fallback if API key is missing (for demo purposes)
    const randomMain = Array.from({ length: maxMain }, () => Math.floor(Math.random() * limitMain) + 1);
    const randomSpecial = Math.floor(Math.random() * limitSpecial) + 1;
    return {
      main: randomMain,
      special: randomSpecial,
      reason: "ระบบสุ่มตัวเลข (Demo Mode - No API Key)"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Generate a set of lucky lottery numbers for the game "${gameName}".
      I need ${maxMain} unique numbers between 1 and ${limitMain} for the main set.
      I need 1 special number between 1 and ${limitSpecial}.
      Also provide a very short, mystical 1-sentence reason why these numbers are lucky today based on general astrology.
      Return strictly JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mainNumbers: {
              type: Type.ARRAY,
              items: { type: Type.INTEGER }
            },
            specialNumber: { type: Type.INTEGER },
            reason: { type: Type.STRING }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    
    return {
      main: data.mainNumbers || [],
      special: data.specialNumber || 1,
      reason: data.reason || "โชคชะตาเข้าข้างคุณวันนี้"
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback on error
    const randomMain = Array.from({ length: maxMain }, () => Math.floor(Math.random() * limitMain) + 1);
    const randomSpecial = Math.floor(Math.random() * limitSpecial) + 1;
    return {
      main: randomMain,
      special: randomSpecial,
      reason: "ตัวเลขสุ่มมงคล (System Fallback)"
    };
  }
};
