import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import { useFileUpload } from '../../hooks/useFileUpload';
import { validateFile } from '../../utils/validators';
import toast from 'react-hot-toast';

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadResume } = useResumeStore();
  const { uploadFile, isUploading } = useFileUpload();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const errors = validateFile(file);
    if (errors.length > 0) {
      toast.error(errors.join(', '));
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    try {
      await uploadFile(selectedFile, async (base64) => {
        await uploadResume(base64, selectedFile.name);
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Upload New Resume</h2>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Select Resume File (PDF, DOC, DOCX - Max 5MB)</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
          />
        </label>

        {selectedFile && (
          <div className="alert alert-info mt-4">
            <FileText className="w-5 h-5" />
            <span>Selected: {selectedFile.name}</span>
          </div>
        )}

        <div className="card-actions justify-end mt-4">
          <button
            onClick={handleUpload}
            className="btn btn-primary"
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;