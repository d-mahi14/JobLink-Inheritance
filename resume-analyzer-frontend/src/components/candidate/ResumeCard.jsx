import { FileText, Download, Trash2, Calendar } from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters';
import { useResumeStore } from '../../store/resumeStore';

const ResumeCard = ({ resume }) => {
  const { deleteResume } = useResumeStore();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(resume.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white p-3 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="card-title text-lg">{resume.file_name}</h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(resume.file_size)}
              </p>
            </div>
          </div>
          {resume.analysis_data?.score && (
            <div className="radial-progress text-primary" style={{"--value": resume.analysis_data.score}}>
              {resume.analysis_data.score}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Calendar className="w-4 h-4" />
          <span>Uploaded {formatDate(resume.created_at)}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <a 
            href={resume.resume_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-sm btn-ghost"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
          <button onClick={handleDelete} className="btn btn-sm btn-error btn-outline">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;