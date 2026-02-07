import { supabase } from '../lib/supabase.config.js';
import { uploadToSupabase, deleteFromSupabase } from '../lib/supabaseStorage.js';
import { analyzeResume } from '../services/ai.service.js';

console.log('🔍 AI Service loaded:', typeof analyzeResume);

/**
 * Upload resume with AI analysis
 */
export const uploadResume = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const { resumeFile, fileName } = req.body;

    console.log('Upload resume request:', {
      candidateId,
      hasFile: !!resumeFile,
      fileName
    });

    if (!resumeFile) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    /* ------------------------------------
       1️⃣ Upload to Supabase Storage
    ------------------------------------ */
    const uploadResult = await uploadToSupabase(
      resumeFile,
      'resumes',
      `resume_${candidateId}_${Date.now()}`
    );

    /* ------------------------------------
       2️⃣ AI Resume Analysis
    ------------------------------------ */
    let analysisData;

    try {
      analysisData = await analyzeResume(resumeFile, fileName);
    } catch (aiError) {
      console.error('❌ AI analysis failed:', aiError);

      // ✅ SAFE FALLBACK (IMPORTANT)
      analysisData = {
        skills: [],
        score: 0,
        contact: {
          name: '',
          email: '',
          phone: '',
          linkedin: '',
          github: ''
        },
        error: 'AI analysis failed'
      };
    }

    console.log('📋 Final analysis data:', {
      skills: analysisData.skills?.length || 0,
      contact: analysisData.contact,
      score: analysisData.score
    });

    /* ------------------------------------
       3️⃣ Save Resume + Analysis to DB
    ------------------------------------ */
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        candidate_id: candidateId,
        resume_url: uploadResult.publicUrl,
        storage_path: uploadResult.path,
        file_name: fileName || uploadResult.fileName,
        file_size: uploadResult.fileSize,
        analysis_data: analysisData
      })
      .select()
      .single();

    if (error) {
      console.error('❌ DB insert error:', error);
      await deleteFromSupabase(uploadResult.path); // rollback
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(data);

  } catch (error) {
    console.error('❌ uploadResume error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all resumes of logged-in candidate
 */
export const getMyResumes = async (req, res) => {
  try {
    const candidateId = req.user.id;

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('candidate_id', candidateId)
      .order('updated_at', { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get single resume
 */
export const getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', userId)
      .single();

    if (profile?.user_type === 'candidate' && data.candidate_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update resume analysis
 */
export const updateResumeAnalysis = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { analysisData } = req.body;
    const candidateId = req.user.id;

    const { data, error } = await supabase
      .from('resumes')
      .update({ analysis_data: analysisData })
      .eq('id', resumeId)
      .eq('candidate_id', candidateId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete resume
 */
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const candidateId = req.user.id;

    const { data: resume, error } = await supabase
      .from('resumes')
      .select('storage_path')
      .eq('id', resumeId)
      .eq('candidate_id', candidateId)
      .single();

    if (error || !resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('candidate_id', candidateId);

    if (resume.storage_path) {
      await deleteFromSupabase(resume.storage_path);
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
