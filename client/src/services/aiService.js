import api from "../utils/api";

export const askAI = async (question, language = "ru") => {
  try {
    const response = await api.post("/ai/ask", {
      question,
      language,
    });

    return {
      success: true,
      answer: response.data.answer,
      relatedPlaces: response.data.relatedPlaces || [],
    };
  } catch (error) {
    console.error("AI Service error:", error);
    return {
      success: false,
      answer: getFallbackResponse(question, language),
    };
  }
};

export const getSuggestedQuestions = async (language = "ru") => {
  try {
    const response = await api.get("/ai/suggested", {
      params: { language },
    });
    return response.data.questions;
  } catch (error) {
    console.error("Failed to get suggested questions:", error);
    // Fallback questions
    return [
      "Что такое Манас Ордо?",
      "Расскажи о Сулайман-Тоо",
      "Какие есть святые источники?",
      'Что означает "Аманат"?',
    ];
  }
};

export const getAIStats = async () => {
  try {
    const response = await api.get("/ai/stats");
    return response.data.stats;
  } catch (error) {
    console.error("Failed to get AI stats:", error);
    return null;
  }
};

// Fallback responses
const getFallbackResponse = (question, language) => {
  const lowerQuestion = question?.toLowerCase() || "";

  if (language === "ru") {
    if (lowerQuestion.includes("манас")) {
      return "Манас Ордо — священный комплекс в Таласской области. Здесь находится мавзолей, музей и священная гора, связанные с легендарным героем Манасом.";
    }
    if (lowerQuestion.includes("аманат")) {
      return 'Аманат — в переводе с кыргызского "то, что доверено на хранение" или "наследие". Это платформа для сохранения сакрального наследия Кыргызстана.';
    }
    return "Я AI-эксперт платформы Аманат. Спросите меня о сакральных местах Кыргызстана!";
  }

  if (language === "kg") {
    if (lowerQuestion.includes("манас")) {
      return "Манас Ордо — Талас облусундагы ыйык комплекс. Бул жерде күмбөз, музей жана ыйык тоо бар.";
    }
    return "Мен Аманат платформасынын AI-экспертимин. Кыргызстандын ыйык жерлери жөнүндө сураңыз.";
  }

  if (lowerQuestion.includes("manas")) {
    return "Manas Ordo is a sacred complex in Talas region, connected to the legendary hero Manas.";
  }
  return "I am the Amanat AI expert. Ask me about sacred places in Kyrgyzstan.";
};
