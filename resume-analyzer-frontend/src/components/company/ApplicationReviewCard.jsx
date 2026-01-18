import { User, FileText, Calendar, Download } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import Badge from '../shared/Badge';
import { useApplicationStore } from '../../store/applicationStore';
import { useState } from 'react';

const ApplicationReviewCard = ({ application }) => {
  const [status, setStatus] = useState(application.status);
  const [matchScore, setMatchScore] = useState(application.match_score || '');
  const { updateApplicationStatus } = useApplicationStore();

  const handleUpdateStatus = async () => {
  try {
    await updateApplicationStatus(application.id, status, matchScore);
  } catch (error) {
    console.error('Update status failed:', error);
  }
};


  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-white rounded-full w-12">
                {application.profiles?.profile_pic ? (
                  <img src={application.profiles.profile_pic} alt="Candidate" />
                ) : (
                  <span>{application.profiles?.full_name?.charAt(0)}</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-bold">{application.profiles?.full_name}</h3>
              <p className="text-sm text-gray-500">{application.profiles?.email}</p>
            </div>
          </div>
          <Badge status={application.status} />
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Applied {formatDate(application.applied_at)}
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            {application.resumes?.file_name}
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered select-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Match Score (0-100)</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              className="input input-bordered input-sm"
              value={matchScore}
              onChange={(e) => setMatchScore(e.target.value)}
              placeholder="Enter score"
            />
          </div>
        </div>

        <div className="card-actions justify-between mt-4">
          <a
            href={application.resumes?.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-ghost"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
          <button onClick={handleUpdateStatus} className="btn btn-sm btn-primary">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReviewCard;
