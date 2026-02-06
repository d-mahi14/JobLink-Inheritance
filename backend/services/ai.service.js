import Groq from "groq-sdk";
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// Initialize Groq client
let groq;
try {
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY is not set in .env file!');
    console.error('📝 Get FREE key from: https://console.groq.com/keys');
    console.error('🆓 Groq is 100% FREE - no billing required!');
  } else {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    console.log('✅ Groq client initialized successfully (FREE API)');
  }
} catch (error) {
  console.error('❌ Failed to initialize Groq client:', error.message);
}

/**
 * Convert base64 to buffer for parsing
 */
const base64ToBuffer = (base64String) => {
  const base64Data = base64String.includes(',') 
    ? base64String.split(',')[1] 
    : base64String;
  return Buffer.from(base64Data, 'base64');
};

/**
 * Extract text from PDF file
 */
const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Extract text from DOCX file
 */
const extractTextFromDOCX = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX');
  }
};

/**
 * Extract text from resume based on file type
 */
const extractResumeText = async (base64File, fileName) => {
  const buffer = base64ToBuffer(base64File);
  const extension = fileName.split('.').pop().toLowerCase();

  if (extension === 'pdf') {
    return await extractTextFromPDF(buffer);
  } else if (extension === 'docx' || extension === 'doc') {
    return await extractTextFromDOCX(buffer);
  } else {
    throw new Error('Unsupported file format');
  }
};

/**
 * Analyze resume using Groq AI (FREE!)
 */
export const analyzeResume = async (base64File, fileName) => {
  try {
    console.log('═══════════════════════════════════════════════');
    console.log('🔍 Starting resume analysis for:', fileName);

    // Step 1: Extract text from resume
    console.log('📄 Extracting text from file...');
    const resumeText = await extractResumeText(base64File, fileName);
    
    if (!resumeText || resumeText.trim().length < 100) {
      throw new Error('Resume text is too short or empty');
    }

    console.log('✅ Resume text extracted, length:', resumeText.length);
    console.log('First 200 chars:', resumeText.substring(0, 200));

    // Check if Groq is available
    if (!groq || !process.env.GROQ_API_KEY) {
      console.warn('⚠️  Groq not configured - using fallback skill extraction');
      const fallbackSkills = extractSkillsFallback(resumeText);
      return {
        skills: fallbackSkills,
        experience: [],
        education: [],
        contact: {},
        summary: "AI analysis unavailable - using keyword matching",
        score: 65
      };
    }

    // Step 2: Analyze with Groq (UPDATED MODEL!)
    console.log('🤖 Calling Groq API (FREE)...');
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",  // ✅ FIXED: Updated model name
      messages: [
        {
          role: "system",
          content: `You are an expert resume analyzer. Extract structured information from resumes and return ONLY valid JSON.

Your response MUST be a valid JSON object with this exact structure:
{
  "skills": ["skill1", "skill2", ...],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Duration",
      "description": "Brief description"
    }
  ],
  "education": [
    {
      "degree": "Degree",
      "institution": "Institution",
      "year": "Year"
    }
  ],
  "contact": {
    "email": "email if found",
    "phone": "phone if found",
    "linkedin": "linkedin if found",
    "location": "location if found"
  },
  "summary": "Brief professional summary",
  "score": 85
}

CRITICAL RULES:
- Extract ONLY skills that are EXPLICITLY mentioned in the resume
- DO NOT add skills that are implied or assumed
- Include technical skills: programming languages, frameworks, tools
- Include soft skills: communication, leadership, teamwork
- Minimum 3 skills, maximum 15 skills
- Score should be 1-100 based on resume quality
- Return ONLY the JSON object, no markdown, no explanation`
        },
        {
          role: "user",
          content: `Analyze this resume and extract information:\n\n${resumeText.substring(0, 4000)}`
        }
      ],
      temperature: 0.2,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content.trim();
    console.log('✅ Groq Response received, length:', responseText.length);
    console.log('Raw response:', responseText.substring(0, 200));

    // Step 3: Parse the JSON response
    let analysisData;
    try {
      const jsonText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      analysisData = JSON.parse(jsonText);
      console.log('✅ JSON parsed successfully');
      console.log('Extracted skills:', analysisData.skills);
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError.message);
      console.error('Response was:', responseText.substring(0, 500));
      console.warn('⚠️  Falling back to keyword matching');
      
      analysisData = {
        skills: extractSkillsFallback(resumeText),
        experience: [],
        education: [],
        contact: {},
        summary: "Could not extract full analysis - using fallback",
        score: 70
      };
    }

    // Validate and ensure minimum data
    if (!analysisData.skills || analysisData.skills.length === 0) {
      console.warn('⚠️  No skills extracted by AI, using fallback');
      analysisData.skills = extractSkillsFallback(resumeText);
    }

    if (!analysisData.score || analysisData.score < 1) {
      analysisData.score = 75;
    }

    console.log('✅ Resume analysis completed successfully!');
    console.log('📊 Results:', {
      skillsCount: analysisData.skills.length,
      skills: analysisData.skills.slice(0, 5),
      score: analysisData.score
    });
    console.log('═══════════════════════════════════════════════');

    return analysisData;

  } catch (error) {
    console.error('❌ Resume analysis error:', error.message);
    console.error('Stack:', error.stack);
    
    // Return error details for debugging
    throw new Error(`AI Analysis failed: ${error.message}`);
  }
};

/**
 * Improved fallback skill extraction
 */
const extractSkillsFallback = (text) => {
  const textLower = text.toLowerCase();
  
  const skillCategories = {
    programming: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'TypeScript', 'Rust', 'Scala'],
    frontend: ['React', 'Angular', 'Vue', 'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'Next.js', 'Svelte', 'Redux'],
    backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'FastAPI'],
    databases: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Oracle', 'SQLite'],
    cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform'],
    tools: ['Git', 'GitHub', 'GitLab', 'JIRA', 'Postman', 'VS Code', 'Linux', 'Vim'],
    concepts: ['REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'DevOps', 'TDD', 'OOP'],
    soft: ['Problem Solving', 'Team Collaboration', 'Communication', 'Leadership', 'Time Management']
  };

  const allSkills = Object.values(skillCategories).flat();
  
  const foundSkills = allSkills.filter(skill => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(text);
  });

  console.log('Fallback extraction found:', foundSkills.length, 'skills');
  return foundSkills.length > 0 ? foundSkills.slice(0, 12) : ['General Skills'];
};

/**
 * Calculate match score using Groq AI
 */
export const calculateMatchScore = async (resumeAnalysisData, jobPosting) => {
  try {
    console.log('═══════════════════════════════════════════════');
    console.log('🎯 Calculating match score for job:', jobPosting.title);

    if (!resumeAnalysisData || !resumeAnalysisData.skills) {
      throw new Error('Resume analysis data is missing');
    }

    const resumeSummary = {
      skills: resumeAnalysisData.skills || [],
      experience: resumeAnalysisData.experience || [],
      education: resumeAnalysisData.education || [],
      summary: resumeAnalysisData.summary || ''
    };

    const jobRequirements = {
      title: jobPosting.title,
      description: jobPosting.description,
      requirements: jobPosting.requirements || []
    };

    // Check if Groq is available
    if (!groq || !process.env.GROQ_API_KEY) {
      console.warn('⚠️  Groq not configured - using fallback');
      return calculateMatchScoreFallback(resumeSummary, jobRequirements);
    }

    console.log('🤖 Calling Groq API for match score (FREE)...');
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",  // ✅ FIXED: Updated model name
      messages: [
        {
          role: "system",
          content: `You are an expert job matching AI. Return ONLY valid JSON.

Structure:
{
  "matchScore": 85,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3"],
  "strengths": ["strength1"],
  "weaknesses": ["weakness1"],
  "recommendation": "Brief text"
}

Scoring (0-100):
0-40: Poor match
41-60: Fair match
61-75: Good match
76-90: Excellent match
91-100: Perfect match`
        },
        {
          role: "user",
          content: `Match score for:\n\nRESUME:\n${JSON.stringify(resumeSummary, null, 2)}\n\nJOB:\n${JSON.stringify(jobRequirements, null, 2)}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0].message.content.trim();
    console.log('✅ Match score response received');

    let matchData;
    try {
      const jsonText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      matchData = JSON.parse(jsonText);
    } catch (parseError) {
      console.warn('⚠️  Parse error, using fallback');
      matchData = calculateMatchScoreFallback(resumeSummary, jobRequirements);
    }

    matchData.matchScore = Math.max(0, Math.min(100, matchData.matchScore));

    console.log('✅ Match score:', matchData.matchScore);
    console.log('═══════════════════════════════════════════════');

    return matchData;

  } catch (error) {
    console.error('❌ Match score error:', error.message);
    return calculateMatchScoreFallback(
      { skills: resumeAnalysisData?.skills || [] },
      { requirements: jobPosting.requirements || [] }
    );
  }
};

/**
 * Fallback match score calculation
 */
const calculateMatchScoreFallback = (resume, job) => {
  const resumeSkills = resume.skills.map(s => s.toLowerCase());
  const jobText = (job.requirements || []).join(' ').toLowerCase() + ' ' + (job.description || '').toLowerCase();
  
  const matchedSkills = resumeSkills.filter(skill => jobText.includes(skill.toLowerCase()));
  const matchScore = Math.max(30, Math.round((matchedSkills.length / (resumeSkills.length || 1)) * 100));

  return {
    matchScore,
    matchedSkills,
    missingSkills: [],
    strengths: matchedSkills.length > 0 ? [`Has ${matchedSkills.length} relevant skills`] : ['Basic qualifications'],
    weaknesses: matchedSkills.length < resumeSkills.length / 2 ? ['Missing key skills'] : ['Some gaps'],
    recommendation: matchScore >= 70 ? 'Review application' : matchScore >= 50 ? 'Possible fit' : 'May not meet requirements'
  };
};

export default {
  analyzeResume,
  calculateMatchScore
};