import { create } from 'zustand';
import { resumesAPI } from '../api/resumes.api';
import toast from 'react-hot-toast';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,

  uploadResume: async (resumeFile, fileName) => {
    set({ isLoading: true });
    try {
      const resume = await resumesAPI.uploadResume(resumeFile, fileName);
      set({ resumes: [resume, ...get().resumes] });
      toast.success('Resume uploaded successfully!');
      return resume;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
      throw error;
    } finally {
      set({ isLoading: false });
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
      toast.success('Analysis updated');
      return updated;
    } catch (error) {
      toast.error('Failed to update analysis');
      throw error;
    }
  },
}));