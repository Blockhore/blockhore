import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Zap } from 'lucide-react';

interface NotFoundPageProps {
  isDark: boolean;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ isDark }) => {
  return (
    <div className={`min-h-screen pt-20 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${
              isDark ? 'bg-amber-400' : 'bg-purple-600'
            } rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* 404 Icon */}
          <div className="mb-8">
            <div className={`inline-flex items-center gap-3 p-6 rounded-lg ${
              isDark 
                ? 'bg-amber-400/20 text-amber-400' 
                : 'bg-purple-600/20 text-purple-600'
            } animate-pulse`}>
              <Zap className="w-12 h-12" />
              <span className="text-4xl font-bold font-mono">404</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="animate-fade-up">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 font-mono terminal-glow ${
              isDark ? 'text-amber-400' : 'text-purple-600'
            }`}>
              Page.NotFound()
            </h1>
            
            <h2 className={`text-xl md:text-2xl mb-8 ${
              isDark ? 'text-white/90' : 'text-black/90'
            }`}>
              The orbital coordinates you're looking for don't exist in our system.
            </h2>
            
            <div className={`max-w-lg mx-auto text-lg leading-relaxed mb-8 ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}>
              <p className="mb-4">
                It seems you've drifted into uncharted space. The page you're looking for 
                might have been moved, deleted, or never existed in the Blockhore orbit.
              </p>
              <p>
                Let's get you back to familiar territory.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-lg transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-amber-400 text-black hover:bg-amber-400/90 shadow-lg shadow-amber-400/30' 
                    : 'bg-purple-600 text-white hover:bg-purple-600/90 shadow-lg shadow-purple-600/30'
                } terminal-glow`}
              >
                <Home className="w-5 h-5" />
                <span>{'>'} return.home()</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg border-2 font-mono text-lg transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'border-amber-400/30 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
                    : 'border-purple-600/30 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{'>'} go.back()</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-12">
            <div className={`text-sm mb-4 font-mono ${
              isDark ? 'text-amber-400' : 'text-purple-600'
            }`}>
              quick.navigation()
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Blog', path: '/blog' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded border transition-all duration-200 hover:scale-105 ${
                    isDark 
                      ? 'border-amber-400/30 text-white/70 hover:border-amber-400 hover:bg-amber-400/10' 
                      : 'border-purple-600/30 text-black/70 hover:border-purple-600 hover:bg-purple-600/10'
                  }`}
                >
                  /{item.label.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
