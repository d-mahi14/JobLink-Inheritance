<h1 align="center"> JobLink - AI-Powered Job Matching Platform </h1>

<div align="center">
  
  <img src="frontend/public/logo1.png" alt="JobLink Logo" width="200"/>
  
  **Connect talented professionals with leading companies through intelligent resume analysis and job matching**

  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-orange.svg)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

JobLink is a modern job matching platform that leverages AI technology to streamline the recruitment process. It provides:

- **For Job Seekers**: AI-powered resume analysis, personalized job recommendations, and application tracking
- **For Employers**: Easy job posting, AI-matched candidate screening, and application management

The platform uses intelligent algorithms to extract skills from resumes, match candidates with relevant positions, and provide insights to both parties for better hiring decisions.

---

## ✨ Features

### For Candidates
- 📄 **Resume Upload & Analysis**: AI-powered extraction of skills, contact information, and qualifications
- 🔍 **Smart Job Search**: Search and filter jobs by title, location, and requirements
- 📊 **Application Tracking**: Monitor application status in real-time
- 🎯 **Match Scoring**: See how well your skills match job requirements
- 👤 **Profile Management**: Update profile information and profile pictures

### For Employers
- 📝 **Job Posting**: Create and manage job listings with detailed requirements
- 👥 **Candidate Review**: Review applications with AI-generated match scores
- 📈 **Analytics Dashboard**: Track job posting performance and applications
- ✅ **Application Management**: Update candidate status (pending, reviewed, shortlisted, rejected, accepted)
- 🏢 **Company Profile**: Manage company information and branding

### General Features
- 🔐 **Secure Authentication**: Email/password and Google OAuth support (ready for integration)
- 📱 **Responsive Design**: Fully responsive UI that works on all devices
- 🎨 **Professional UI**: LinkedIn-inspired design with DaisyUI components
- ⚡ **Real-time Updates**: Instant feedback and state management with Zustand
- 🔔 **Toast Notifications**: User-friendly notifications for all actions

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router DOM 6.22** - Client-side routing
- **Zustand 4.5** - State management
- **Axios 1.6.7** - HTTP client
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **DaisyUI 4.12.24** - Component library
- **Lucide React 0.344** - Icon library
- **React Hot Toast 2.4.1** - Notifications
- **Bootstrap 5.3.8** - Additional UI components
- **Vite 5.1.4** - Build tool and dev server

### Backend (Expected)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **AI/ML Services** - Resume parsing and skill extraction

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
JobLink/
├── frontend/
│   ├── public/
│   │   ├── logo1.png
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/                    # API service layer
│   │   │   ├── applications.api.js
│   │   │   ├── auth.api.js
│   │   │   ├── axios.js
│   │   │   ├── jobs.api.js
│   │   │   └── resumes.api.js
│   │   ├── components/             # Reusable components
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── candidate/
│   │   │   │   ├── ApplicationCard.jsx
│   │   │   │   ├── ContactInfo.jsx
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── ResumeCard.jsx
│   │   │   │   ├── ResumeUpload.jsx
│   │   │   │   └── SkillsDisplay.jsx
│   │   │   ├── company/
│   │   │   │   ├── ApplicationReviewCard.jsx
│   │   │   │   ├── JobPostCard.jsx
│   │   │   │   └── JobPostForm.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── shared/
│   │   │       ├── Badge.jsx
│   │   │       ├── EmptyState.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── StatCard.jsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useFileUpload.js
│   │   ├── pages/                  # Page components
│   │   │   ├── candidate/
│   │   │   │   ├── BrowseJobs.jsx
│   │   │   │   ├── CandidateDashboard.jsx
│   │   │   │   ├── CandidateProfile.jsx
│   │   │   │   ├── MyApplications.jsx
│   │   │   │   └── MyResumes.jsx
│   │   │   ├── company/
│   │   │   │   ├── CompanyDashboard.jsx
│   │   │   │   ├── CompanyProfile.jsx
│   │   │   │   ├── CreateJob.jsx
│   │   │   │   ├── EditJob.jsx
│   │   │   │   ├── MyJobPostings.jsx
│   │   │   │   └── ViewApplications.jsx
│   │   │   └── public/
│   │   │       ├── LandingPage.jsx
│   │   │       ├── LoginPage.jsx
│   │   │       └── SignupPage.jsx
│   │   ├── store/                  # Zustand state management
│   │   │   ├── applicationStore.js
│   │   │   ├── authStore.js
│   │   │   ├── jobStore.js
│   │   │   └── resumeStore.js
│   │   ├── utils/                  # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   ├── skillsExtractor.js
│   │   │   └── validators.js
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # App entry point
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/                        # (Backend implementation)
    └── (Your backend structure)
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase Account** (for database)

### Clone Repository

```bash
git clone https://github.com/d-mahi14/JobLink-Inheritance.git
cd JobLink-Inheritance
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup (if applicable)

```bash
cd backend
npm install
```

---

## ⚙️ Configuration

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# For production
# VITE_API_URL=https://your-api-domain.com/api
```

### Supabase Configuration (if using Supabase directly)

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Backend Environment Variables (Example)

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/joblink

# JWT
JWT_SECRET=your-jwt-secret-key

# Server
PORT=5000
NODE_ENV=development

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## 🏃 Running the Application

### Development Mode

**Frontend:**
```bash
cd frontend
npm run dev
```
The app will run at `http://localhost:3000`

**Backend:**
```bash
cd backend
npm run dev
```
The API will run at `http://localhost:5000`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user (candidate or company)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "userType": "candidate" // or "company"
}
```

#### POST `/api/auth/login`
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "session": {
    "access_token": "jwt-token"
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "profile": {
    "user_type": "candidate",
    "full_name": "John Doe"
  }
}
```

### Resume Endpoints

#### POST `/api/resumes`
Upload and analyze resume

**Request Body:**
```json
{
  "resumeFile": "base64-encoded-file",
  "fileName": "resume.pdf"
}
```

#### GET `/api/resumes`
Get user's resumes

#### DELETE `/api/resumes/:id`
Delete a resume

### Job Endpoints

#### GET `/api/jobs`
Get all jobs (with optional filters)

**Query Parameters:**
- `page`: Page number
- `search`: Search term
- `location`: Location filter

#### POST `/api/jobs`
Create job posting (Company only)

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "description": "Job description...",
  "requirements": ["React", "Node.js"],
  "location": "Remote",
  "salaryRange": "₹80k - ₹120k",
  "status": "active"
}
```

#### PUT `/api/jobs/:id`
Update job posting

#### DELETE `/api/jobs/:id`
Delete job posting

### Application Endpoints

#### POST `/api/applications`
Apply for a job

**Request Body:**
```json
{
  "jobId": "uuid",
  "resumeId": "uuid"
}
```

#### GET `/api/applications/my-applications`
Get candidate's applications

#### GET `/api/applications/job/:jobId`
Get applications for a job (Company only)

#### PUT `/api/applications/:id/status`
Update application status

**Request Body:**
```json
{
  "status": "shortlisted",
  "matchScore": 85
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255), -- nullable for OAuth users
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  full_name TEXT NOT NULL,
  user_type VARCHAR(50) CHECK (user_type IN ('candidate', 'company')),
  profile_pic TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Resumes Table
```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  file_name TEXT NOT NULL,
  file_size INTEGER,
  resume_url TEXT NOT NULL,
  analysis_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Job Postings Table
```sql
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  location TEXT,
  salary_range TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Applications Table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES job_postings(id),
  candidate_id UUID REFERENCES users(id),
  resume_id UUID REFERENCES resumes(id),
  status VARCHAR(50) DEFAULT 'pending',
  match_score INTEGER,
  match_details JSONB,
  applied_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Authentication

JobLink supports two authentication methods:

### 1. Email/Password Authentication
- Users sign up with email and password
- Passwords are hashed and stored securely
- JWT tokens are used for session management

### 2. Google OAuth (Ready for Integration)
- Google Sign-In/Sign-Up buttons are implemented
- OAuth flow components are ready
- Requires backend OAuth setup (see Supabase setup files)

**To enable Google OAuth:**
1. Follow `SUPABASE_SETUP_GUIDE.md` (provided separately)
2. Configure Google OAuth in Supabase Dashboard
3. Update environment variables
4. Uncomment OAuth routes in backend

---

## 👥 User Roles

### Candidate
- Upload and manage resumes
- Browse and search jobs
- Apply for positions
- Track application status
- View match scores

### Company
- Post and manage jobs
- Review applications
- Update candidate status
- Assign match scores
- Manage company profile

---

## 🎨 UI/UX Features

- **LinkedIn-Inspired Design**: Professional and familiar interface
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **DaisyUI Components**: Pre-built, customizable components
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Spinners and skeleton screens for better UX
- **Empty States**: Helpful messages when no data is available
- **Form Validation**: Client-side validation for all forms

---

## 🧪 Testing

```bash
# Run frontend tests (if configured)
cd frontend
npm test

# Run backend tests (if configured)
cd backend
npm test
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

3. Set environment variables in hosting dashboard

### Backend Deployment (Heroku/Railway/Render)

1. Push code to Git repository
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

### Database (Supabase)

1. Create Supabase project
2. Run migrations
3. Configure authentication providers
4. Update connection strings

---

## 🛣️ Roadmap

- [ ] Enhanced AI matching algorithm
- [ ] Video interview integration
- [ ] Chat/messaging system
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Resume builder
- [ ] Company verification system
- [ ] Payment integration for premium features
- [ ] Multi-language support

---

## 🐛 Known Issues

- AI resume parsing may require backend service configuration
- Google OAuth requires additional setup (guide provided)
- File upload size limited to 5MB

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Mahi Desai** - [GitHub](https://github.com/d-mahi14)
- **Mokshi Shah** - [GitHub](https://github.com/Mokshii46)
- **Gaurang Upadhyay** - [GitHub](https://github.com/gaurang-2305)
- **Akshat Chauhan** - [GitHub](https://github.com/akshat280706)

---

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- UI Components by [DaisyUI](https://daisyui.com/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Database by [Supabase](https://supabase.com/)

---

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **API Docs**: [Coming Soon]
- **GitHub**: https://github.com/d-mahi14/JobLink-Inheritance.git

---

<div align="center">
  Made with ❤️ by the JobLink Team
  
  ⭐ Star this repo if you find it helpful!
</div>
