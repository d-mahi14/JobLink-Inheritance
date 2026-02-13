import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Send, 
  User,
  PlusCircle,
  Building2 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { isCandidate } = useAuth();

  const candidateLinks = [
    { to: '/candidate/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/candidate/resumes', icon: FileText, label: 'My Resumes' },
    { to: '/candidate/jobs', icon: Briefcase, label: 'Browse Jobs' },
    { to: '/candidate/applications', icon: Send, label: 'Applications' },
    { to: '/candidate/profile', icon: User, label: 'Profile' },
  ];

  const companyLinks = [
    { to: '/company/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/company/jobs', icon: Briefcase, label: 'My Jobs' },
    { to: '/company/create-job', icon: PlusCircle, label: 'Post New Job' },
    { to: '/company/profile', icon: Building2, label: 'Company Profile' },
  ];

  const links = isCandidate ? candidateLinks : companyLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 hidden lg:block">
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;