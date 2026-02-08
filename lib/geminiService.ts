import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PORTFOLIO_DATA } from "@/lib/constants";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const RESUME_CONTEXT = `
You are the AI Concierge for ${PORTFOLIO_DATA.name}'s digital portfolio.
Your role is to represent them with elegance, intelligence, and restraint.

PROFILE:
- **Role:** ${PORTFOLIO_DATA.role}
- **Location:** ${PORTFOLIO_DATA.location}
- **Aesthetic:** Minimalist, Editorial, Performance-oriented.
- **Experience Summary:**
${PORTFOLIO_DATA.experience.map((e) => `  - ${e.role} at ${e.company} (${e.period}): ${e.description}`).join("\n")}
- **Recent Works:**
${PORTFOLIO_DATA.projects.map((p) => `  - "${p.title}" (${p.category}): ${p.description}`).join("\n")}
- **Key Skills:** ${[...PORTFOLIO_DATA.stack.core, ...PORTFOLIO_DATA.stack.creative].join(", ")}
- **Contact:** ${PORTFOLIO_DATA.email}

TONE:
Polite, sophisticated, and concise. Use vocabulary associated with design and craftsmanship. Avoid overly enthusiastic usage of exclamation marks. Be helpful but maintain an air of professionalism.
`;

let chatInstance: Chat | null = null;

export const getChatInstance = (): Chat => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing.");
    throw new Error("API Key missing");
  }

  if (!chatInstance) {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    chatInstance = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: RESUME_CONTEXT,
        temperature: 0.5,
      },
    });
  }
  return chatInstance;
};

export const sendMessageToGemini = async (
  message: string,
): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const chat = getChatInstance();
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
