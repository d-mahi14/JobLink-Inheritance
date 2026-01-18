import { Edit, Trash2, Eye, Users, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import Badge from '../shared/Badge';
import { useJobStore } from '../../store/jobStore';
import { useNavigate } from 'react-router-dom';

const JobPostCard = ({ job, applicationsCount = 0 }) => {
  const { deleteJob } = useJobStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      await deleteJob(job.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="card-title">{job.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Posted {formatDate(job.created_at)}
            </p>
          </div>
          <Badge status={job.status} />
        </div>

        <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>

        <div className="flex items-center gap-4 mt-3 text-sm">
          {job.location && (
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-500">
            <Users className="w-4 h-4" />
            {applicationsCount} applications
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => navigate(`/company/applications/${job.id}`)}
            className="btn btn-sm btn-ghost"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => navigate(`/company/edit-job/${job.id}`)}
            className="btn btn-sm btn-info btn-outline"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-sm btn-error btn-outline">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;