import React, { useEffect, useState } from 'react';

interface CapsuleAnimationProps {
  size?: 'small' | 'medium' | 'large';
  floating?: boolean;
  color?: 'blue' | 'mint' | 'purple';
  className?: string;
}

const CapsuleAnimation: React.FC<CapsuleAnimationProps> = ({
  size = 'medium',
  floating = false,
  color = 'blue',
  className = ''
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sizeClasses = {
    small: 'w-8 h-16',
    medium: 'w-12 h-24',
    large: 'w-16 h-32'
  };

  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    mint: 'from-emerald-400 to-emerald-600',
    purple: 'from-purple-400 to-purple-600'
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{
        transform: floating 
          ? `translateY(${Math.sin(Date.now() * 0.001) * 10}px) rotate(${scrollY * 0.1}deg)`
          : `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`
      }}
    >
      <div className={`w-full h-full bg-gradient-to-b ${colorClasses[color]} rounded-full opacity-80 shadow-lg animate-pulse`}>
        <div className="absolute inset-2 bg-white bg-opacity-30 rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-white bg-opacity-50 rounded-full blur-sm"></div>
      </div>
    </div>
  );
};

export default CapsuleAnimation;