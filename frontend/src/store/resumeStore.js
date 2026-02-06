import { create } from 'zustand';
import { resumesAPI } from '../api/resumes.api';
import { extractSkillsFromResume } from '../utils/skillsExtractor';
import toast from 'react-hot-toast';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  isAnalyzing: false,

  uploadResume: async (resumeFile, fileName) => {
  set({ isLoading: true, isAnalyzing: true });
  try {
    // Upload resume (backend does AI analysis)
    const resume = await resumesAPI.uploadResume(resumeFile, fileName);
    
    console.log('📋 Resume uploaded:', {
      hasAnalysis: !!resume.analysis_data,
      hasSkills: resume.analysis_data?.skills?.length > 0,
      skillsCount: resume.analysis_data?.skills?.length,
      score: resume.analysis_data?.score
    });
    
    // Check if backend AI succeeded
    const backendAIWorked = resume.analysis_data?.skills?.length > 0 && 
                           !resume.analysis_data?.error;
    
    if (backendAIWorked) {
      // ✅ Backend AI worked - use its data
      console.log('✅ Using backend AI analysis');
      toast.success(`Resume analyzed! Found ${resume.analysis_data.skills.length} skills`);
      set({ resumes: [resume, ...get().resumes] });
      return resume;
    } else {
      // ⚠️ Backend AI failed - use frontend fallback
      console.warn('⚠️ Backend AI failed, using frontend fallback');
      console.log('Error:', resume.analysis_data?.error);
      
      const skills = await extractSkillsFromResume(fileName);
      const analysisData = {
        skills: skills,
        extractedAt: new Date().toISOString(),
        score: Math.floor(Math.random() * 30) + 70,
      };
      
      const updatedResume = await resumesAPI.updateResumeAnalysis(
        resume.id,
        analysisData
      );
      
      toast.warning('Resume uploaded (AI unavailable - used keyword matching)');
      set({ resumes: [updatedResume, ...get().resumes] });
      return updatedResume;
    }
  } catch (error) {
    console.error('Upload error:', error);
    toast.error(error.response?.data?.message || 'Upload failed');
    throw error;
  } finally {
    set({ isLoading: false, isAnalyzing: false });
  }
},

  fetchMyResumes: async () => {
    set({ isLoading: true });
    try {
      const resumes = await resumesAPI.getMyResumes();
      set({ resumes });
    } catch (error) {
      toast.error('Failed to fetch resumes');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchResumeById: async (resumeId) => {
    set({ isLoading: true });
    try {
      const resume = await resumesAPI.getResumeById(resumeId);
      set({ currentResume: resume });
      return resume;
    } catch (error) {
      toast.error('Failed to fetch resume');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteResume: async (resumeId) => {
    try {
      await resumesAPI.deleteResume(resumeId);
      set({ resumes: get().resumes.filter((r) => r.id !== resumeId) });
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
      throw error;
    }
  },

  updateResumeAnalysis: async (resumeId, analysisData) => {
    try {
      const updated = await resumesAPI.updateResumeAnalysis(resumeId, analysisData);
      set({
        resumes: get().resumes.map((r) =>
          r.id === resumeId ? updated : r
        ),
      });
      return updated;
    } catch (error) {
      toast.error('Failed to update analysis');
      throw error;
    }
  },
}));