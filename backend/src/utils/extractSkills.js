// utils/extractSkills.js

import { skillsList } from "./skills.js";


// =========================
// Skill Aliases
// =========================
const aliases = {

    "node.js": "nodejs",
    "node js": "nodejs",

    "react.js": "react",
    "react js": "react",

    "next.js": "nextjs",
    "next js": "nextjs",

    "express.js": "express",
    "express js": "express",

    "mongo db": "mongodb",

    "tailwindcss": "tailwind",

    "socket io": "socket.io",

    "c plus plus": "c++",

    "postgres": "postgresql",

    "google cloud": "gcp",

    "amazon web services": "aws"
};


// =========================
// Normalize Text
// =========================
const normalizeText = (text) => {

    return text
        .toLowerCase()
        .replace(/[^\w\s.+#]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};


// =========================
// Apply Aliases
// =========================
const applyAliases = (text) => {

    let updatedText = text;

    Object.keys(aliases).forEach((key) => {

        const regex = new RegExp(key, "gi");

        updatedText = updatedText.replace(
            regex,
            aliases[key]
        );
    });

    return updatedText;
};


// =========================
// Extract Skills
// =========================
export const extractSkills = (text) => {

    if (!text) return [];

    // normalize
    let normalizedText = normalizeText(text);

    // apply aliases
    normalizedText = applyAliases(normalizedText);

    // match skills
    const extractedSkills = skillsList.filter((skill) => {

        const normalizedSkill = normalizeText(skill);

        return normalizedText.includes(normalizedSkill);
    });

    // remove duplicates
    return [...new Set(extractedSkills)];
};