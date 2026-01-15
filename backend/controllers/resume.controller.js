import { getUserSupabase } from '../lib/supabase.config.js';
import { uploadToSupabase, deleteFromSupabase } from '../lib/supabaseStorage.js';

/**
 * Upload resume
 */
export const uploadResume = async (req, res) => {
  try {
    const supabase = getUserSupabase(req.supabaseToken);
    const candidateId = req.user.id;
    const { resumeFile, fileName } = req.body;

    if (!resumeFile) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // 1️⃣ Upload to Supabase Storage
    const uploadResult = await uploadToSupabase(
      resumeFile,
      'resumes',
      `resume_${candidateId}_${Date.now()}`
    );

    // 2️⃣ Insert DB row (RLS enforced)
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        candidate_id: candidateId,
        resume_url: uploadResult.publicUrl,
        storage_path: uploadResult.path,
        file_name: fileName || uploadResult.fileName,
        file_size: uploadResult.fileSize
      })
      .select()
      .single();

    if (error) {
      // Rollback file upload if DB insert fails
      await deleteFromSupabase(uploadResult.path);
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('uploadResume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all resumes of logged-in candidate
 */
export const getMyResumes = async (req, res) => {
  try {
    const supabase = getUserSupabase(req.supabaseToken);
    const candidateId = req.user.id;

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('candidate_id', candidateId)
      .order('updated_at', { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('getMyResumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get single resume
 */
export const getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const supabase = getUserSupabase(req.supabaseToken);

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('getResume error:', error);
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
    const supabase = getUserSupabase(req.supabaseToken);

    const { data, error } = await supabase
      .from('resumes')
      .update({ analysis_data: analysisData })
      .eq('id', resumeId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('updateResumeAnalysis error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete resume
 */
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const supabase = getUserSupabase(req.supabaseToken);

    // 1️⃣ Fetch resume
    const { data: resume, error } = await supabase
      .from('resumes')
      .select('storage_path')
      .eq('id', resumeId)
      .single();

    if (error || !resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // 2️⃣ Delete DB row (RLS enforced)
    const { error: deleteError } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId);

    if (deleteError) {
      return res.status(400).json({ message: deleteError.message });
    }

    // 3️⃣ Delete storage file
    if (resume.storage_path) {
      await deleteFromSupabase(resume.storage_path);
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('deleteResume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
