import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Activity, Bell, Users } from 'lucide-react';
import CapsuleAnimation from '../components/CapsuleAnimation';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Activity,
      title: 'Real-time Diagnostics',
      description: 'Monitor patient vitals and diagnostic data in real-time with advanced analytics.'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Receive intelligent notifications based on patient conditions and thresholds.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'HIPAA-compliant platform ensuring the highest standards of data security.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Enable seamless collaboration between healthcare professionals.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <CapsuleAnimation size="small" />
              <span className="text-2xl font-bold text-gray-900">Meditrek</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>