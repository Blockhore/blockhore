import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Globe, 
  Twitter, 
  MessageCircle, 
  Github, 
  Linkedin,
  Instagram,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

interface AboutPageProps {
  isDark: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isDark }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    {
      icon: BookOpen,
      title: 'beginner friendly',
      description: 'We believe that everyone deserves to understand Web3, regardless of their technical background.'
    },
    {
      icon: Users,
      title: 'based research',
      description: 'Our content is backed by in depth research and objective analysis to provide quality insights.'
    },
    {
      icon: Globe,
      title: 'open to all',
      description: 'An inclusive community that welcomes diverse perspectives and encourages global collaboration.'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Founder & Lead Developer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      social: {
        twitter: '#',
        telegram: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      id: 2,
      name: 'Sarah Kim',
      role: 'Content Strategist',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      social: {
        twitter: '#',
        telegram: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      role: 'Community Manager',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      social: {
        twitter: '#',
        telegram: '#',
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      id: 4,
      name: 'Emma Thompson',
      role: 'Research Analyst',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
      social: {
        twitter: '#',
        telegram: '#',
        linkedin: '#',
        instagram: '#'
      }
    }
  ];

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

      {/* Hero / Manifesto Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up">
            <h1 className={`text-4xl md:text-6xl font-bold mb-8 font-mono terminal-glow ${
              isDark ? 'text-amber-400' : 'text-purple-600'
            }`}>
              We're Not Just Watching the Future, We're Building It.
            </h1>
            
            <h2 className={`text-xl md:text-2xl mb-8 ${
              isDark ? 'text-white/90' : 'text-black/90'
            }`}>
              Blockhore is a Web3 community orbiting around shared knowledge, curiosity, and innovation.
            </h2>
            
            <div className={`max-w-3xl mx-auto text-lg leading-relaxed ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}>
              <p className="mb-6">
                We believe the future of decentralized technology isn't just about code—it's about people. 
                Blockhore exists as both a growing community and an educational platform that simplifies 
                Web3 through research-based content, inclusive discourse, and collaborative learning.
              </p>
              <p>
                Our mission is to bridge the gap between complex blockchain concepts and everyday understanding, 
                creating a space where curiosity thrives and innovation becomes accessible to everyone, 
                regardless of their technical background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Our.Values()</h2>
            <div className={`text-sm ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              Core principles that guide our orbital mission...
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`group relative p-8 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
                    : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
                } backdrop-blur-sm`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-amber-400/10 to-amber-400/5' 
                    : 'bg-gradient-to-br from-purple-600/10 to-purple-600/5'
                } blur-xl`} />
                
                <div className="relative">
                  <div className={`mb-6 ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    <value.icon className="w-12 h-12 group-hover:animate-pulse" />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-4 font-mono ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {value.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Meet.Team()</h2>
            <div className={`text-sm ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              The humans behind the orbital mission...
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
                    : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
                } backdrop-blur-sm text-center`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-amber-400/10 to-amber-400/5' 
                    : 'bg-gradient-to-br from-purple-600/10 to-purple-600/5'
                } blur-xl`} />
                
                <div className="relative">
                  {/* Avatar */}
                  <div className="mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Name */}
                  <h3 className={`text-lg font-bold mb-2 font-mono ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {member.name}
                  </h3>
                  
                  {/* Role */}
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    {member.role}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {[
                      { icon: Twitter, key: 'twitter' },
                      { icon: MessageCircle, key: 'telegram' },
                      { icon: Instagram, key: 'instagram' },
                      { icon: Linkedin, key: 'linkedin' }
                    ].map(({ icon: Icon, key }) => (
                      <a
                        key={key}
                        href={member.social[key as keyof typeof member.social]}
                        className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${
                          isDark 
                            ? 'border-amber-400/20 hover:border-amber-400 hover:bg-amber-400/10' 
                            : 'border-purple-600/20 hover:border-purple-600 hover:bg-purple-600/10'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${
                          isDark ? 'text-amber-400' : 'text-purple-600'
                        }`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`mb-8 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
              Want to Help Shape the Future of Web3?
            </h2>
          </div>
          
          <p className={`text-lg mb-8 leading-relaxed ${
            isDark ? 'text-white/80' : 'text-black/80'
          }`}>
            We believe the future of Web3 is built on collaboration. If you share our energy, 
            values, and vision, we want to meet you. Join our orbital mission and help us 
            democratize blockchain education for everyone.
          </p>
          
          <a
            href="https://forms.google.com/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-lg transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-amber-400 text-black hover:bg-amber-400/90 shadow-lg shadow-amber-400/30' 
                : 'bg-purple-600 text-white hover:bg-purple-600/90 shadow-lg shadow-purple-600/30'
            } terminal-glow animate-pulse`}
            style={{ animationDuration: '2s' }}
          >
            <span>{'>'} join.team()</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 ${
            isDark 
              ? 'bg-black/80 border-amber-400 text-amber-400 hover:bg-amber-400/10' 
              : 'bg-white/80 border-purple-600 text-purple-600 hover:bg-purple-600/10'
          } backdrop-blur-sm transition-all duration-300 flex items-center justify-center hover:scale-110 z-40`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
