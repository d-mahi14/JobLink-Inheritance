import { supabase } from '../lib/supabase.config.js';
import cloudinary from '../lib/cloudinary.js';

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeFile, fileName } = req.body;
    const candidateId = req.user.id;

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(resumeFile, {
      resource_type: 'auto',
      folder: 'resumes'
    });

    // Save resume data to Supabase
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert([
        {
          candidate_id: candidateId,
          resume_url: uploadResponse.secure_url,
          file_name: fileName || 'resume.pdf',
          file_size: uploadResponse.bytes
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(resume);
  } catch (error) {
    console.error("Error in uploadResume:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all resumes for current candidate
export const getMyResumes = async (req, res) => {
  try {
    const candidateId = req.user.id;

    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('candidate_id', candidateId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error in getMyResumes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single resume
export const getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const { data: resume, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (error) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Error in getResume:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update resume analysis data
export const updateResumeAnalysis = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { analysisData } = req.body;
    const candidateId = req.user.id;

    // Check if resume belongs to user
    const { data: resume, error: fetchError } = await supabase
      .from('resumes')
      .select('candidate_id')
      .eq('id', resumeId)
      .single();

    if (fetchError || resume.candidate_id !== candidateId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { data: updatedResume, error } = await supabase
      .from('resumes')
      .update({ analysis_data: analysisData })
      .eq('id', resumeId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error in updateResumeAnalysis:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const candidateId = req.user.id;

    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('candidate_id', candidateId);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error in deleteResume:", error);
    res.status(500).json({ message: "Server error" });
  }
};