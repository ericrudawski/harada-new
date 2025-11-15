
import { GoogleGenAI } from "@google/genai";

export const getAIFeedbackForOpenWindow = async (grid: (string | undefined)[][]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key is not configured. Please set up your environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const centralGoal = grid[4][4];
    const coreThemes = [
      grid[3][3], grid[3][4], grid[3][5],
      grid[4][3],             grid[4][5],
      grid[5][3], grid[5][4], grid[5][5]
    ].filter(Boolean).join(', ');

    let detailedActions = '';
    const outerGrids = [
      { r: 0, c: 0 }, { r: 0, c: 3 }, { r: 0, c: 6 },
      { r: 3, c: 0 },             { r: 3, c: 6 },
      { r: 6, c: 0 }, { r: 6, c: 3 }, { r: 6, c: 6 },
    ];

    outerGrids.forEach((start, index) => {
        const theme = grid[start.r + 1][start.c + 1];
        if (theme) {
            detailedActions += `\nFor the theme "${theme}":\n`;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (i === 1 && j === 1) continue;
                    const action = grid[start.r + i][start.c + j];
                    if (action) {
                        detailedActions += `- ${action}\n`;
                    }
                }
            }
        }
    });

    const prompt = `
      Analyze the following goal breakdown, which was created using the Harada Method's Open Window 64 (Mandala Chart).

      **Central Goal:** ${centralGoal}

      **Core Themes:** ${coreThemes}

      **Detailed Actions and Ideas:**
      ${detailedActions}

      Based on this information, please provide:
      1.  **Constructive Feedback:** Offer insights on the goal's clarity, the alignment of themes, and the actionability of the detailed steps.
      2.  **Potential Blind Spots:** Identify any potential challenges, missing elements, or areas that might require more attention.
      3.  **Actionable Suggestions:** Recommend 3-5 specific, concrete actions or routines the user could incorporate to maximize their chances of success.

      Format your response in clear, encouraging, and well-structured markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while generating feedback: ${error.message}`;
    }
    return "An unknown error occurred while generating feedback.";
  }
};
