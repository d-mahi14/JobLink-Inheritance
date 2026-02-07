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
  const { fetchMyResumes, resumes } = useResumeStore();

  useEffect(() => {
    fetchMyResumes();
    fetchAllJobs({ page: currentPage, search: searchTerm });
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAllJobs({ page: 1, search: searchTerm });
  };

  if (isLoading && jobs.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h1 className="display-5 fw-bold text-gradient mb-2">Browse Jobs</h1>
              <p className="text-muted lead">Find your next opportunity from {pagination.total} active listings</p>
            </div>
            {resumes.length === 0 && (
              <div className="alert alert-warning mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Upload a resume to apply for jobs
              </div>
            )}
          </div>

          {/* Search Only - Filters Removed */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-white">
                        <Search size={20} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by job title "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        <Search size={18} className="me-2" />
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          description="Try adjusting your search criteria or check back later for new opportunities"
        />
      ) : (
        <>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-muted mb-0">
                  Showing <strong>{jobs.length}</strong> of <strong>{pagination.total}</strong> jobs
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {jobs.map((job) => (
              <div key={job.id} className="col-lg-4 col-md-6">
                <JobCard job={job} />
              </div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <nav className="mt-5">
              <ul className="pagination pagination-lg justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default BrowseJobs;