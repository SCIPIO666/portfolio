import { useEffect, useRef } from 'react';

const SplashScreen = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    // Animate logo with a bounce effect
    if (logoRef.current) {
      logoRef.current.style.animation = 'bounce 1s ease infinite';
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center">
      <div className="text-center">
        <div ref={logoRef} className="text-8xl mb-8">🚀</div>
        <h1 className="text-5xl font-bold text-white mb-4 animate-pulse">
          Welcome!
        </h1>
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;