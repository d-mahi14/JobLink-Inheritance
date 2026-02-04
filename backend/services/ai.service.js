import OpenAI from 'openai';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
 * Analyze resume using OpenAI GPT
 * Extracts: skills, experience, education, contact info, summary
 */
export const analyzeResume = async (base64File, fileName) => {
  try {
    console.log('Starting resume analysis for:', fileName);

    // Step 1: Extract text from resume
    const resumeText = await extractResumeText(base64File, fileName);
    
    if (!resumeText || resumeText.trim().length < 100) {
      throw new Error('Resume text is too short or empty');
    }

    console.log('Resume text extracted, length:', resumeText.length);

    // Step 2: Analyze with GPT
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective and fast
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

Rules:
- Extract ALL technical and soft skills (minimum 5, maximum 20)
- Include programming languages, frameworks, tools, methodologies
- Score should be 1-100 based on resume quality
- Return ONLY the JSON object, no other text
- If information is missing, use empty string "" or empty array []`
        },
        {
          role: "user",
          content: `Analyze this resume and extract information:\n\n${resumeText.substring(0, 4000)}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content.trim();
    console.log('GPT Response received:', responseText.substring(0, 200));

    // Step 3: Parse the JSON response
    let analysisData;
    try {
      // Remove markdown code blocks if present
      const jsonText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      analysisData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Response text:', responseText);
      
      // Fallback: extract basic skills using regex
      analysisData = {
        skills: extractSkillsFallback(resumeText),
        experience: [],
        education: [],
        contact: {},
        summary: "Could not extract full analysis",
        score: 70
      };
    }

    // Validate and ensure minimum data
    if (!analysisData.skills || analysisData.skills.length === 0) {
      analysisData.skills = extractSkillsFallback(resumeText);
    }

    if (!analysisData.score || analysisData.score < 1) {
      analysisData.score = 75;
    }

    console.log('Resume analysis completed:', {
      skillsCount: analysisData.skills.length,
      score: analysisData.score
    });

    return analysisData;

  } catch (error) {
    console.error('Resume analysis error:', error);
    throw error;
  }
};

/**
 * Fallback skill extraction using keyword matching
 */
const extractSkillsFallback = (text) => {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular',
    'Vue', 'TypeScript', 'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL',
    'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'REST API',
    'GraphQL', 'Agile', 'Scrum', 'Problem Solving', 'Team Collaboration',
    'Communication', 'Leadership', 'Project Management'
  ];

  const foundSkills = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return foundSkills.length > 0 ? foundSkills : ['General Skills'];
};

/**
 * Calculate match score between resume and job description
 */
export const calculateMatchScore = async (resumeAnalysisData, jobPosting) => {
  try {
    console.log('Calculating match score for job:', jobPosting.title);

    // Prepare resume summary
    const resumeSummary = {
      skills: resumeAnalysisData.skills || [],
      experience: resumeAnalysisData.experience || [],
      education: resumeAnalysisData.education || [],
      summary: resumeAnalysisData.summary || ''
    };

    // Prepare job requirements
    const jobRequirements = {
      title: jobPosting.title,
      description: jobPosting.description,
      requirements: jobPosting.requirements || [],
      location: jobPosting.location || '',
      salary_range: jobPosting.salary_range || ''
    };

    // Call GPT to calculate match
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert job matching AI. Compare candidate resume with job requirements and return ONLY valid JSON.

Your response MUST be a valid JSON object with this structure:
{
  "matchScore": 85,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "recommendation": "Brief recommendation"
}

Scoring criteria (0-100):
- 0-40: Poor match - candidate lacks most required skills
- 41-60: Fair match - candidate has some relevant skills but missing key ones
- 61-75: Good match - candidate meets most requirements
- 76-90: Excellent match - candidate exceeds most requirements
- 91-100: Perfect match - candidate exceeds all requirements

Return ONLY the JSON object, no other text.`
        },
        {
          role: "user",
          content: `Calculate match score between:

CANDIDATE RESUME:
${JSON.stringify(resumeSummary, null, 2)}

JOB REQUIREMENTS:
${JSON.stringify(jobRequirements, null, 2)}

Provide detailed analysis with match score.`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0].message.content.trim();
    console.log('Match score response:', responseText.substring(0, 200));

    // Parse JSON response
    let matchData;
    try {
      const jsonText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      matchData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Match score JSON parsing error:', parseError);
      
      // Fallback calculation
      matchData = calculateMatchScoreFallback(resumeSummary, jobRequirements);
    }

    // Ensure score is within range
    if (matchData.matchScore < 0) matchData.matchScore = 0;
    if (matchData.matchScore > 100) matchData.matchScore = 100;

    console.log('Match score calculated:', matchData.matchScore);

    return matchData;

  } catch (error) {
    console.error('Match score calculation error:', error);
    throw error;
  }
};

/**
 * Fallback match score calculation
 */
const calculateMatchScoreFallback = (resume, job) => {
  const resumeSkills = resume.skills.map(s => s.toLowerCase());
  const jobReqs = job.requirements.join(' ').toLowerCase();
  
  let matchedCount = 0;
  resumeSkills.forEach(skill => {
    if (jobReqs.includes(skill)) {
      matchedCount++;
    }
  });

  const matchScore = resumeSkills.length > 0 
    ? Math.round((matchedCount / resumeSkills.length) * 100)
    : 50;

  return {
    matchScore,
    matchedSkills: resumeSkills.filter(s => jobReqs.includes(s)),
    missingSkills: [],
    strengths: ['Basic skills match'],
    weaknesses: ['Detailed analysis unavailable'],
    recommendation: 'Review application manually'
  };
};

export default {
  analyzeResume,
  calculateMatchScore
};