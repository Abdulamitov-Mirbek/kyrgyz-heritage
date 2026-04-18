const Site = require("../models/Site");

// Initialize Groq ONLY if API key exists
let groq = null;
try {
  if (process.env.GROQ_API_KEY) {
    const Groq = require("groq-sdk");
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    console.log("✅ Groq AI initialized");
  } else {
    console.warn("⚠️ GROQ_API_KEY not found, using fallback responses");
  }
} catch (error) {
  console.warn("⚠️ Groq initialization failed, using fallback");
}

// Sacred heritage context for AI
const SACRED_CONTEXT = `Ты - AI-эксперт платформы "Аманат" по сакральным местам Кыргызстана...`;

// @desc    Ask AI a question using Groq
// @route   POST /api/ai/ask
// @access  Public
const askAI = async (req, res) => {
  try {
    const { question, language = "ru" } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
      });
    }

    console.log(`🤖 AI Question [${language}]:`, question);

    // If Groq is not available, use fallback
    if (!groq) {
      console.log("📝 Using fallback response (no API key)");
      const fallbackAnswer = getFallbackResponse(question, language);
      return res.json({
        success: true,
        answer: fallbackAnswer,
        fallback: true,
      });
    }

    // Fetch relevant sacred places from database
    const dbSites = await Site.find({
      $or: [{ siteType: "sacred" }, { sacredType: { $exists: true } }],
      isVerified: true,
    })
      .select("name description location sacredType spiritualSignificance")
      .limit(5);

    // Build database context
    let dbContext = "";
    if (dbSites.length > 0) {
      dbContext = "\n\nАктуальные сакральные места из базы данных:\n";
      dbSites.forEach((place) => {
        dbContext += `\n- ${place.name} (${place.location?.region || "Кыргызстан"})`;
        if (place.sacredType) dbContext += ` - ${place.sacredType}`;
      });
    }

    const languageNames = { ru: "Русский", kg: "Кыргызский", en: "English" };
    const systemPrompt = `${SACRED_CONTEXT}${dbContext}\n\nОтвечай на ${languageNames[language] || "Русском"} языке.`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 800,
    });

    const answer = completion.choices[0].message.content;
    console.log("✅ AI Response generated");

    res.json({
      success: true,
      answer: answer,
    });
  } catch (error) {
    console.error("❌ AI Error:", error.message);

    const fallbackAnswer = getFallbackResponse(
      req.body.question,
      req.body.language,
    );

    res.json({
      success: true,
      answer: fallbackAnswer,
      fallback: true,
    });
  }
};

// @desc    Get AI suggested questions
// @route   GET /api/ai/suggested
// @access  Public
const getSuggestedQuestions = async (req, res) => {
  const { language = "ru" } = req.query;

  const questions = {
    ru: [
      "Что такое Манас Ордо?",
      "Расскажи о Сулайман-Тоо",
      "Какие святые источники есть в Кыргызстане?",
      'Что означает "Аманат"?',
      "Какие ритуалы соблюдают при посещении мазаров?",
    ],
    kg: [
      "Манас Ордо деген эмне?",
      "Сулайман-Тоо жөнүндө айтып бер",
      "Кыргызстанда кандай ыйык булактар бар?",
      '"Аманат" деген эмнени билдирет?',
    ],
    en: [
      "What is Manas Ordo?",
      "Tell me about Sulayman-Too",
      "What sacred springs are in Kyrgyzstan?",
      'What does "Amanat" mean?',
    ],
  };

  res.json({
    success: true,
    questions: questions[language] || questions.ru,
  });
};

// Fallback responses
const getFallbackResponse = (question, language) => {
  const q = question?.toLowerCase() || "";

  if (language === "ru") {
    if (q.includes("манас")) {
      return "**Манас Ордо** — священный комплекс в Таласской области, связанный с легендарным героем кыргызского эпоса Манасом. Здесь находится мавзолей, музей и священная гора.";
    }
    if (q.includes("сулайман")) {
      return "**Сулайман-Тоо** — священная гора в центре Оша, объект Всемирного наследия ЮНЕСКО. На горе находятся древние петроглифы и места для молитв.";
    }
    if (q.includes("аманат")) {
      return '**Аманат** — в переводе с кыргызского "то, что доверено на хранение" или "наследие".';
    }
    return "Я AI-эксперт платформы Аманат. Спросите меня о сакральных местах Кыргызстана!";
  }

  if (language === "kg") {
    if (q.includes("манас")) {
      return "**Манас Ордо** — Талас облусундагы ыйык комплекс. Бул жерде күмбөз, музей жана ыйык тоо бар.";
    }
    if (q.includes("аманат")) {
      return '**Аманат** — "сактоого ишенип берилген нерсе" же "мурас" дегенди билдирет.';
    }
    return "Мен Аманат платформасынын AI-экспертимин. Кыргызстандын ыйык жерлери жөнүндө сураңыз.";
  }

  // English
  if (q.includes("manas")) {
    return "**Manas Ordo** is a sacred complex in Talas region, connected to the legendary hero Manas.";
  }
  if (q.includes("amanat")) {
    return '**Amanat** means "something entrusted for safekeeping" or "legacy" in Kyrgyz.';
  }
  return "I am the Amanat AI expert. Ask me about sacred places in Kyrgyzstan.";
};

module.exports = {
  askAI,
  getSuggestedQuestions,
};
