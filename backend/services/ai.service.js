import Groq from "groq-sdk";
import pdf from "pdf-parse";
import mammoth from "mammoth";

/* =====================================================
   GROQ CLIENT
===================================================== */

let groq = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  console.log("✅ Groq initialized");
} else {
  console.warn("⚠️ GROQ_API_KEY missing – AI disabled");
}

/* =====================================================
   FILE HELPERS
===================================================== */

const base64ToBuffer = (base64) => {
  const data = base64.includes(",") ? base64.split(",")[1] : base64;
  return Buffer.from(data, "base64");
};

const extractTextFromPDF = async (buffer) => {
  const data = await pdf(buffer);
  return data.text;
};

const extractTextFromDOCX = async (buffer) => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};

const extractResumeText = async (base64File, fileName) => {
  const buffer = base64ToBuffer(base64File);
  const ext = fileName.split(".").pop().toLowerCase();

  if (ext === "pdf") return extractTextFromPDF(buffer);
  if (ext === "doc" || ext === "docx") return extractTextFromDOCX(buffer);

  throw new Error("Unsupported file type");
};

/* =====================================================
   CONTACT FALLBACK (REGEX)
===================================================== */

const extractContactFallback = (text) => {
  const email = text.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || null;
  const phone = text.match(/(\+?\d{1,3}[-\s]?)?\d{10}/)?.[0] || null;
  const github = text.match(/github\.com\/[\w-]+/i)?.[0] || null;
  const linkedin = text.match(/linkedin\.com\/in\/[\w-]+/i)?.[0] || null;

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
  ];
  const location = cities.find((c) => text.includes(c)) || null;

  return { email, phone, github, linkedin, location };
};

const escapeRegex = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


/* =====================================================
   SKILL FALLBACK (UNCHANGED)
===================================================== */

const extractSkillsFallback = (text) => {
  const skills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "HTML",
    "CSS",
    "TypeScript",
    "Flask",
    "Django",
    "FastAPI",
  ];

  return [
    ...new Set(
      skills.filter((s) => {
        const safeSkill = escapeRegex(s);
        return new RegExp(`\\b${safeSkill}\\b`, "i").test(text);
      })
    ),
  ];
};

/* =====================================================
   RESUME ANALYSIS (CONTACT FIXED)
===================================================== */

export const analyzeResume = async (base64File, fileName) => {
  const resumeText = await extractResumeText(base64File, fileName);

  if (!resumeText || resumeText.length < 100) {
    throw new Error("Resume text too short");
  }

  if (!groq) {
    return fallbackAnalysis(resumeText);
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    max_tokens: 2000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
Return ONLY valid JSON.
ALL contact fields MUST exist (use null if missing).

{
  "skills": [],
  "contact": {
    "email": null,
    "phone": null,
    "github": null,
    "linkedin": null,
    "location": null
  },
  "experience": [],
  "education": [],
  "summary": ""
}
`,
      },
      {
        role: "user",
        content: resumeText.slice(0, 3500),
      },
    ],
  });

  let analysis;
  try {
    analysis = JSON.parse(completion.choices[0].message.content);
  } catch {
    return fallbackAnalysis(resumeText);
  }

  const regexContact = extractContactFallback(resumeText);
  const aiContact = analysis.contact || {};

  analysis.contact = {
    email: aiContact.email || regexContact.email || null,
    phone: aiContact.phone || regexContact.phone || null,
    github: aiContact.github || regexContact.github || null,
    linkedin: aiContact.linkedin || regexContact.linkedin || null,
    location: aiContact.location || regexContact.location || null,
  };

  if (!analysis.skills || analysis.skills.length === 0) {
    analysis.skills = extractSkillsFallback(resumeText);
  }

  return {
    ...analysis,
    score: calculateResumeScore(analysis),
  };
};

/* =====================================================
   MATCH SCORE (UNCHANGED, RE-EXPORTED ✅)
===================================================== */

export const calculateMatchScore = async (resumeAnalysisData, jobPosting) => {
  if (!resumeAnalysisData?.skills?.length) {
    return calculateMatchScoreFallback(resumeAnalysisData, jobPosting);
  }

  if (!groq) {
    return calculateMatchScoreFallback(resumeAnalysisData, jobPosting);
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: `
Return ONLY valid JSON.

{
  "matchScore": 85,
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "recommendation": ""
}
`,
      },
      {
        role: "user",
        content: `
RESUME:
${JSON.stringify(resumeAnalysisData)}

JOB:
${JSON.stringify(jobPosting)}
`,
      },
    ],
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch {
    return calculateMatchScoreFallback(resumeAnalysisData, jobPosting);
  }
};

/* =====================================================
   FALLBACKS
===================================================== */

const fallbackAnalysis = (text) => ({
  skills: extractSkillsFallback(text),
  contact: extractContactFallback(text),
  experience: [],
  education: [],
  summary: "Fallback parsing used",
  score: 65,
});

const calculateMatchScoreFallback = (resume, job) => {
  const resumeSkills = (resume.skills || []).map((s) => s.toLowerCase());
  const jobText =
    (job.description || "").toLowerCase() +
    " " +
    (job.requirements || []).join(" ").toLowerCase();

  const matchedSkills = resumeSkills.filter((s) =>
    jobText.includes(s)
  );

  const matchScore = Math.max(
    30,
    Math.round((matchedSkills.length / (resumeSkills.length || 1)) * 100)
  );

  return {
    matchScore,
    matchedSkills,
    missingSkills: [],
    strengths: matchedSkills.length
      ? [`Has ${matchedSkills.length} relevant skills`]
      : ["Basic match"],
    weaknesses: matchedSkills.length < resumeSkills.length / 2
      ? ["Missing some skills"]
      : [],
    recommendation:
      matchScore >= 70 ? "Strong fit" : matchScore >= 50 ? "Possible fit" : "Weak fit",
  };
};

const calculateResumeScore = (data) => {
  let score = 50;
  if (data.skills?.length >= 3) score += 15;
  if (data.skills?.length >= 6) score += 10;
  if (data.experience?.length) score += 10;
  if (data.education?.length) score += 5;
  if (data.contact?.email) score += 5;
  if (data.contact?.phone) score += 5;
  return Math.min(score, 100);
};

/* =====================================================
   DEFAULT EXPORT (OPTIONAL)
===================================================== */

export default {
  analyzeResume,
  calculateMatchScore,
};
