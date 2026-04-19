// server/seedSacredSites.js
require("dotenv").config();
const mongoose = require("mongoose");

const Site = require("./src/models/Site");
const User = require("./src/models/User");

const sacredSites = [
  {
    name: "Сулайман-Тоо",
    description:
      "Священная гора, объект Всемирного наследия ЮНЕСКО. Место паломничества с древнейших времен (III тыс. до н.э.). На горе есть несколько «целебных» камней. Самый известный — Бел-Таш (спина-камень): считается, что если скатиться по нему три раза, пройдут боли в спине. Женщины приходят к пещере Чакка-Тамар, чтобы просить о материнстве. На вершине находится мечеть «Тахты Сулайман» (Домик Бабура).",
    location: {
      type: "Point",
      coordinates: [72.789, 40.528],
      address: "г. Ош, центр города",
      region: "Ошская область",
      country: "Кыргызстан",
    },
    culturalPeriod: "Ancient",
    heritageStatus: "UNESCO",
    siteType: "sacred",
    sacredType: "mountain",
    spiritualSignificance:
      "Главная святыня юга Кыргызстана, место силы и исцеления",
    pilgrimageInfo: {
      bestTime: "Круглый год, лучше весной и осенью",
      rituals: [
        "Скатывание по камню Бел-Таш три раза для исцеления спины",
        "Молитвы в пещере Чакка-Тамар о материнстве",
        "Посещение мечети Тахты Сулайман",
      ],
      offerings: ["Молитвы", "Завязывание ленточек"],
      taboos: ["Нельзя шуметь", "Неуважительное поведение"],
    },
    legends: [
      {
        title: "Легенда о Бел-Таш",
        story:
          "Камень исцеляет болезни спины. Нужно скатиться по нему три раза с молитвой.",
        source: "Местные предания",
      },
      {
        title: "Домик Бабура",
        story:
          "На вершине горы находится маленькая мечеть, построенная великим правителем Бабуром.",
        source: "Исторические хроники",
      },
    ],
    healingProperties:
      "Исцеление болезней спины, помощь при бесплодии, духовное очищение",
    tags: ["гора", "исцеление", "ЮНЕСКО", "пещера", "паломничество", "Ош"],
    accessibility: "Public",
    visitingHours: "Круглосуточно",
    isVerified: true,
    verificationStatus: "approved",
    photoUrls: [],
    mainPhoto: "",
  },
  {
    name: "Манас-Ордо",
    description:
      "Национальный комплекс, место упокоения легендарного героя эпоса Манаса. Люди приезжают, чтобы почтить память великого предка и получить его благословение (бата). Здесь часто проводят жертвоприношения (толоо) и читают молитвы за благополучие семьи и страны.",
    location: {
      type: "Point",
      coordinates: [72.25, 42.52],
      address: "Таласская область, село Таш-Арык",
      region: "Таласская область",
      country: "Кыргызстан",
    },
    culturalPeriod: "Medieval",
    heritageStatus: "National",
    siteType: "sacred",
    sacredType: "mazar",
    spiritualSignificance:
      "Духовный центр кыргызского народа, связанный с эпосом Манас",
    pilgrimageInfo: {
      bestTime: "Лето, особенно во время празднования Дня Манаса",
      rituals: [
        "Жертвоприношения (толоо)",
        "Чтение молитв за благополучие семьи",
        "Обход мавзолея (таваф)",
      ],
      offerings: [
        "Жертвенные животные",
        "Молитвы",
        "Деньги на благотворительность",
      ],
      taboos: ["Нельзя фотографировать внутри мавзолея"],
    },
    legends: [
      {
        title: "Манас Великодушный",
        story:
          "Великий герой Манас объединил кыргызские племена и защитил родную землю от захватчиков.",
        source: "Эпос Манас",
      },
    ],
    healingProperties: "Духовное очищение, благословение предков",
    tags: ["Манас", "эпос", "мавзолей", "история", "духовность", "Талас"],
    accessibility: "Public",
    visitingHours: "9:00 - 18:00",
    isVerified: true,
    verificationStatus: "approved",
    photoUrls: [],
    mainPhoto: "",
  },
  {
    name: "Саймалуу-Таш",
    description:
      "«Расшитый камень» — огромная галерея петроглифов (II тыс. до н.э. — VIII в. н.э.). В урочище находится более 10 000 петроглифов. В древности это было святилище, где жрецы проводили обряды.",
    location: {
      type: "Point",
      coordinates: [73.5, 41.2],
      address: "Джалал-Абадская область, восточный склон Ферганского хребта",
      region: "Джалал-Абадская область",
      country: "Кыргызстан",
    },
    culturalPeriod: "Prehistoric",
    heritageStatus: "National",
    siteType: "petroglyph",
    sacredType: "petroglyph",
    spiritualSignificance:
      "Древнее святилище, место силы и космической энергии",
    pilgrimageInfo: {
      bestTime: "Июль-Август",
      rituals: ["Медитации у древних рисунков", "Изучение петроглифов"],
      offerings: ["Камни", "Монеты"],
      taboos: ["Нельзя трогать петроглифы руками"],
    },
    legends: [
      {
        title: "Природная обсерватория",
        story:
          "Древние жрецы использовали это место для наблюдения за звездами и проведения ритуалов.",
        source: "Археологические исследования",
      },
    ],
    healingProperties: "Энергетическое очищение, просветление",
    tags: ["петроглифы", "древность", "медитация", "святилище", "Джалал-Абад"],
    accessibility: "Restricted",
    visitingHours: "Только в светлое время суток",
    isVerified: true,
    verificationStatus: "approved",
    photoUrls: [],
    mainPhoto: "",
  },
  {
    name: "Манжылы-Ата",
    description:
      "Долина священных родников на южном берегу Иссык-Куля. Здесь бьют десятки ключей, каждый помогает при определенных недугах. Особый источник «Илим» дарует мудрость и знания. Место считается лабиринтом очищения.",
    location: {
      type: "Point",
      coordinates: [77.0, 42.1],
      address: "Иссык-Кульская область, между селами Каджи-Сай и Тон",
      region: "Иссык-Кульская область",
      country: "Кыргызстан",
    },
    culturalPeriod: "Unknown",
    heritageStatus: "Regional",
    siteType: "sacred",
    sacredType: "spring",
    spiritualSignificance:
      "Комплекс целебных источников, место очищения и исцеления",
    pilgrimageInfo: {
      bestTime: "Май-Сентябрь",
      rituals: [
        "Прохождение по лабиринту",
        "Омовение в источниках",
        "Молитвы у каждого родника",
      ],
      offerings: ["Ленточки на деревья", "Монеты"],
      taboos: ["Нельзя загрязнять источники"],
    },
    legends: [
      {
        title: "Семь святых источников",
        story:
          "Каждый источник обладает особыми свойствами: Илим дает мудрость, Бала помогает забеременеть, Бугу Энэ защищает детей.",
        source: "Местные легенды",
      },
    ],
    healingProperties:
      "Лечение различных болезней, помощь при бесплодии, получение мудрости",
    tags: ["источники", "исцеление", "лабиринт", "Иссык-Куль"],
    accessibility: "Public",
    visitingHours: "Круглосуточно",
    isVerified: true,
    verificationStatus: "approved",
    photoUrls: [],
    mainPhoto: "",
  },
  {
    name: "Башня Бурана",
    description:
      "Минарет X века, часть древнего городища Баласагун на Великом Шелковом пути. Рядом с башней находится сад камней с древними балбалами.",
    location: {
      type: "Point",
      coordinates: [75.25, 42.75],
      address: "Чуйская область, 12 км к югу от г. Токмок",
      region: "Чуйская область",
      country: "Кыргызстан",
    },
    culturalPeriod: "Medieval",
    heritageStatus: "National",
    siteType: "archaeological",
    sacredType: "other",
    spiritualSignificance: "Символ былого величия, связь с тюркскими корнями",
    pilgrimageInfo: {
      bestTime: "Апрель-Октябрь",
      rituals: ["Восхождение на башню", "Осмотр балбалов", "Посещение музея"],
      offerings: ["Пожертвования на сохранение памятника"],
      taboos: ["Нельзя забираться на балбалы"],
    },
    tags: ["башня", "история", "Шелковый путь", "балбалы", "Чуй"],
    accessibility: "Public",
    visitingHours: "9:00 - 17:00",
    isVerified: true,
    verificationStatus: "approved",
    photoUrls: [],
    mainPhoto: "",
  },
  {
    name: "Абшир-Ата",
    description:
      "Уникальный водопад, где вода вырывается прямо из отвесной скалы через круглое отверстие.",
    location: {
      type: "Point",
      coordinates: [72.6, 40.3],
      address: "Ошская область, Ноокатский район, ущелье реки Абшир-Сай",
      region: "Ошская область",
      country: "Кыргызстан",
    },
    culturalPeriod: "Unknown",
    heritageStatus: "Regional",
    siteType: "natural",
    sacredType: "spring",
    spiritualSignificance: "Святой источник, место исполнения желаний",
    pilgrimageInfo: {
      bestTime: "Май-Сентябрь",
      rituals: [
        "Питье святой воды",
        "Омовение в водопаде",
        "Загадывание желаний",
      ],
      offerings: ["Ленточки", "Молитвы"],
      taboos: ["Нельзя загрязнять воду"],
    },
    legends: [
      {
        title: "Молочный водопад",
        story:
          "Святой Абшир-Ата ударил посохом по скале, и из неё потекло молоко.",
        source: "Местные предания",
      },
    ],
    healingProperties: "Очищение организма, укрепление духа",
    tags: ["водопад", "источник", "исцеление", "Ош"],
    accessibility: "Public",
    visitingHours: "Круглосуточно",
    isVerified: true,
    verificationStatus: "approved",
    photoUrls: [],
    mainPhoto: "",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create an admin user with all required fields
    let adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      adminUser = await User.create({
        username: "admin",
        email: "admin@amanat.kg",
        password: "Admin123!",
        role: "admin",
        isVerified: true,
      });
      console.log("✅ Created admin user:", adminUser.username);
    } else {
      console.log("✅ Found existing admin user:", adminUser.username);
    }

    // Add createdBy to all sites
    const sitesWithUser = sacredSites.map((site) => ({
      ...site,
      createdBy: adminUser._id,
    }));

    // Clear existing sites of these types
    await Site.deleteMany({
      siteType: { $in: ["sacred", "petroglyph", "natural", "archaeological"] },
    });
    console.log("🗑️ Cleared existing sites");

    // Insert new sites
    const inserted = await Site.insertMany(sitesWithUser);
    console.log(`✅ Successfully inserted ${inserted.length} sacred sites`);

    // Create indexes
    await Site.collection.createIndex({ location: "2dsphere" });
    console.log("📍 Created geospatial index");

    console.log("\n📊 Import Summary:");
    console.log(`- Total sites: ${inserted.length}`);
    inserted.forEach((site, i) => {
      console.log(`  ${i + 1}. ${site.name} (${site.location.region})`);
    });

    console.log("\n📸 Photo fields ready for URLs:");
    console.log("  - mainPhoto: Primary image URL");
    console.log("  - photoUrls: Array of additional images");
    console.log(
      "\n✨ You can now add photos through admin panel or MongoDB Compass!",
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        console.error(`  - ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
}

seedDatabase();
