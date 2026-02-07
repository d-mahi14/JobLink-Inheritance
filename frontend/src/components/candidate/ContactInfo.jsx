import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';

const ContactInfo = ({ resume }) => {
  const contact = resume.analysis_data?.contact || {};
  
  if (!contact.email && !contact.phone && !contact.github && !contact.linkedin && !contact.location) {
    return null;
  }

  return (
    <div className="border rounded p-3 bg-light mb-3">
      <h6 className="mb-3 fw-bold">
        <Mail size={18} className="me-2 text-primary" />
        Contact Information
      </h6>
      
      <div className="d-flex flex-column gap-2">
        {contact.email && (
          <div className="d-flex align-items-center">
            <Mail size={16} className="me-2 text-muted" />
            <a href={`mailto:${contact.email}`} className="text-decoration-none">
              {contact.email}
            </a>
          </div>
        )}
        
        {contact.phone && (
          <div className="d-flex align-items-center">
            <Phone size={16} className="me-2 text-muted" />
            <a href={`tel:${contact.phone}`} className="text-decoration-none">
              {contact.phone}
            </a>
          </div>
        )}
        
        {contact.github && (
          <div className="d-flex align-items-center">
            <Github size={16} className="me-2 text-muted" />
            <a 
              href={contact.github.startsWith('http') ? contact.github : `https:/${contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              {contact.github}
            </a>
          </div>
        )}
        
        {contact.linkedin && (
          <div className="d-flex align-items-center">
            <Linkedin size={16} className="me-2 text-muted" />
            <a 
              href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              {contact.linkedin}
            </a>
          </div>
        )}
        
        {contact.location && (
          <div className="d-flex align-items-center">
            <MapPin size={16} className="me-2 text-muted" />
            <span>{contact.location}</span>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <small className="text-muted">
          <i className="bi bi-info-circle me-1"></i>
          Contact information extracted from resume
        </small>
      </div>
    </div>
  );
};

export default ContactInfo;