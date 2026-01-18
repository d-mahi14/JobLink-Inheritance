import { useEffect, useState } from 'react';
import { Search, Briefcase } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useResumeStore } from '../../store/resumeStore';
import JobCard from '../../components/candidate/JobCard';
import EmptyState from '../../components/shared/EmptyState';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, fetchAllJobs, isLoading, pagination } = useJobStore();
  const { fetchMyResumes } = useResumeStore();

  useEffect(() => {
    fetchMyResumes(); // Need resumes for applying
    fetchAllJobs({ page: currentPage, search: searchTerm });
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAllJobs({ page: 1, search: searchTerm });
  };

  if (isLoading && jobs.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <p className="text-gray-500 mt-1">Find your next opportunity</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <label className="input input-bordered flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 opacity-70" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="grow"
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          description="Try adjusting your search criteria"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="btn btn-sm btn-ghost">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                className="btn btn-sm"
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrowseJobs;
