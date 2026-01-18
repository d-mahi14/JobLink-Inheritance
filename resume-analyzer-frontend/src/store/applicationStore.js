import { create } from 'zustand';
import { applicationsAPI } from '../api/applications.api';
import toast from 'react-hot-toast';

export const useApplicationStore = create((set, get) => ({
  myApplications: [],
  jobApplications: [],
  currentApplication: null,
  isLoading: false,

  applyForJob: async (jobId, resumeId) => {
    set({ isLoading: true });
    try {
      const application = await applicationsAPI.applyForJob(jobId, resumeId);
      set({ myApplications: [application, ...get().myApplications] });
      toast.success('Application submitted successfully!');
      return application;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Application failed');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMyApplications: async () => {
    set({ isLoading: true });
    try {
      const applications = await applicationsAPI.getMyApplications();
      set({ myApplications: applications });
    } catch (error) {
      toast.error('Failed to fetch applications');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchJobApplications: async (jobId) => {
    set({ isLoading: true });
    try {
      const applications = await applicationsAPI.getJobApplications(jobId);
      set({ jobApplications: applications });
      return applications;
    } catch (error) {
      toast.error('Failed to fetch applications');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchApplicationById: async (applicationId) => {
    set({ isLoading: true });
    try {
      const application = await applicationsAPI.getApplicationById(applicationId);
      set({ currentApplication: application });
      return application;
    } catch (error) {
      toast.error('Failed to fetch application');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateApplicationStatus: async (applicationId, status, matchScore) => {
    try {
      const updated = await applicationsAPI.updateApplicationStatus(
        applicationId,
        status,
        matchScore
      );
      set({
        jobApplications: get().jobApplications
  .     filter(Boolean)
        .map((a) => (a.id === applicationId ? updated : a)),
      });
      toast.success('Application status updated');
      return updated;
    } catch (error) {
      toast.error('Failed to update status');
      throw error;
    }
  },

  withdrawApplication: async (applicationId) => {
  try {
    await applicationsAPI.withdrawApplication(applicationId);
    set({
      myApplications: get().myApplications.filter((a) => a.id !== applicationId),
    });
    toast.success('Application withdrawn');
  } catch (error) {
    // ADD THESE TWO LINES
    console.error("Withdrawal Error Details:", error);
    console.log("Error Response Data:", error.response?.data);
    
    toast.error('Failed to withdraw application');
    throw error;
  }
},
}));