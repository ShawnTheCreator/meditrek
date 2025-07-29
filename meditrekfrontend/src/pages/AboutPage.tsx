import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Award, CheckCircle } from 'lucide-react';
import CapsuleAnimation from '../components/CapsuleAnimation';

const AboutPage: React.FC = () => {
  const features = [
    'Popi Compliant Infrastructure',
    'Real-time Monitoring Systems',
    'Advanced Analytics Engine',
    'Secure Data Encryption',
    '24/7 System Availability',
    'Multi-device Compatibility'
  ];

const team = [
  {
    name: 'Shawn Peter Chareka',
    role: 'Software Engineer',
    bio: 'A computer science student with experience in software engineering.',
  },
  {
    name: 'Leon Qhoba',
    role: 'Frontend Developer',
    bio: 'Physics and computer science student who is into frontend development.',
  },
  {
    name: 'Tshegofatso Mkhabela',
    role: 'Machine Learning Enthusiast',
    bio: 'A computer science student that’s a fan of Python and machine learning.',
  },
  {
    name: 'Ngonidzashe Mwelo',
    role: 'Frontend Developer',
    bio: 'IT student passionate about frontend development.',
  },
  
  {
    name: 'Sakhile Ndlazi',
    role: 'Backend Developer',
    bio: 'Aspiring software engineering student passionate about using technology to solve real-world problems. With a background as a professional pilot and flight instructor, brings a unique perspective to the work.',
  },
];


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <CapsuleAnimation size="small" />
              <span className="text-2xl font-bold text-gray-900">Meditrek</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <CapsuleAnimation size="large" color="blue" />
              <CapsuleAnimation size="medium" color="mint" className="absolute -right-8 top-4" floating />
              <CapsuleAnimation size="small" color="purple" className="absolute -left-6 top-8" floating />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Revolutionizing Healthcare
            <span className="text-blue-600"> Technology</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Meditrek is at the forefront of medical diagnostics innovation, providing healthcare 
            professionals with the tools they need to deliver exceptional patient care through 
            cutting-edge technology and real-time insights.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that technology should enhance human healthcare, not complicate it. 
                Our mission is to empower healthcare professionals with intelligent, intuitive 
                tools that improve patient outcomes while streamlining clinical workflows.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since our founding in 2020, we've been dedicated to bridging the gap between 
                advanced medical technology and everyday clinical practice, making sophisticated 
                diagnostic tools accessible to healthcare providers of all sizes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-600">Healthcare Professionals</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Hospitals Served</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Diagnostics Processed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Built for Healthcare Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines regulatory compliance with cutting-edge technology 
              to deliver the most advanced medical diagnostics solution available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="font-medium text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines deep medical expertise with world-class technology 
              experience to drive innovation in healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Regulatory Compliance & Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We maintain the highest standards of data security and regulatory compliance 
              to protect patient information and ensure healthcare organizations can trust our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">HIPAA Compliant</h3>
              <p className="text-gray-300">
                Full compliance with Health Insurance Portability and Accountability Act requirements 
                for handling protected health information.
              </p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">GDPR Ready</h3>
              <p className="text-gray-300">
                Built-in data protection and privacy controls that meet General Data Protection 
                Regulation standards for international compliance.
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">SOC 2 Certified</h3>
              <p className="text-gray-300">
                Independently audited security controls and procedures that meet the American 
                Institute of CPAs' Service Organization Control 2 framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the thousands of healthcare professionals who trust Meditrek 
            for their diagnostic and monitoring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CapsuleAnimation size="small" />
              <span className="text-xl font-bold">Meditrek</span>
            </div>
            <p className="text-gray-400 mb-6">
              Advanced medical diagnostics platform for healthcare professionals.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
              <p>&copy; 2025 Meditrek. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;