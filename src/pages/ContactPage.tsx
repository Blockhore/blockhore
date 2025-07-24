import React, { useState, useEffect } from 'react';
import { 
  Linkedin,
  Instagram,
  MessageCircle, 
  Twitter, 
  Github,
  Mail,
  Send, 
  User, 
  AtSign,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  Users,
  Zap
} from 'lucide-react';

interface ContactPageProps {
  isDark: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission (replace with actual Formspree endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Scroll to form
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to FAQ
  const scrollToFaq = () => {
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactChannels = [
    {
      icon: Mail,
      label: 'Email',
      handle: 'contact@blockhore.xyz',
      href: 'mailto:contact@blockhore.xyz',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageCircle,
      label: 'Telegram',
      handle: '@blockhore',
      href: 'https://t.me/blockhore',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      handle: '@blockhore',
      href: 'https://twitter.com/blockhore',
      color: 'from-sky-400 to-blue-500'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      handle: '@blockhore.xyz',
      href: 'https://instagram.com/blockhore.xyz',
      color: 'from-pink-500 to-purple-600'
    }
  ];

  const faqs = [
    {
      question: 'Can I contribute an article to Blockhore?',
      answer: 'Yes! We welcome insightful contributions from community members. Whether you\'re sharing research, tutorials, or industry insights, we\'d love to hear from you. Reach out through the form above with your article idea and we\'ll get back to you with our submission guidelines.'
    },
    {
      question: 'Is Blockhore open for partnerships?',
      answer: 'Absolutely! We\'re always looking to collaborate with like-minded projects, educators, and organizations in the Web3 space. Whether it\'s content partnerships, educational initiatives, or community collaborations, let\'s explore innovative ideas together.'
    },
    {
      question: 'Is Blockhore beginner-friendly?',
      answer: '100%! Our content is designed to be accessible to everyone, regardless of their technical background. We offer everything from Web3 basics and fundamental concepts to in-depth technical analyses. Our community is welcoming and supportive of learners at all levels.'
    },
    {
      question: 'How can I join the Blockhore community?',
      answer: 'Joining our community is easy! You can connect with us through any of our social channels listed above. Our Discord and Telegram are particularly active for real-time discussions, while our Twitter keeps you updated with the latest content and announcements.'
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="animate-fade-up">
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 font-mono terminal-glow ${
                isDark ? 'text-amber-400' : 'text-purple-600'
              }`}>
                Let's Connect & Collaborate
              </h1>
              
              <h2 className={`text-xl md:text-2xl mb-8 ${
                isDark ? 'text-white/90' : 'text-black/90'
              }`}>
                We're open to partnerships, collaborations, and hearing from you.
              </h2>
              
              <div className={`max-w-lg text-lg leading-relaxed mb-8 ${
                isDark ? 'text-white/80' : 'text-black/80'
              }`}>
                <p className="mb-4">
                  Whether you're looking to contribute content, explore partnerships, 
                  or simply want to connect with our community, we'd love to hear from you.
                </p>
                <p>
                  Scroll down to send us a message or reach out through any of our 
                  community channels below.
                </p>
              </div>
              
              <button
                onClick={scrollToForm}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-lg transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-amber-400 text-black hover:bg-amber-400/90 shadow-lg shadow-amber-400/30' 
                    : 'bg-purple-600 text-white hover:bg-purple-600/90 shadow-lg shadow-purple-600/30'
                } terminal-glow animate-pulse`}
                style={{ animationDuration: '2s' }}
              >
                <span>{'>'} send.message()</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
                        {/* Right Illustration */}
            <div className="relative">
              <div className={`w-80 h-80 mx-auto rounded-full border-4 ${
                isDark 
                  ? 'border-amber-400 bg-gradient-to-br from-amber-400/20 to-amber-400/5' 
                  : 'border-purple-600 bg-gradient-to-br from-purple-600/20 to-purple-600/5'
              } backdrop-blur-sm flex items-center justify-center animate-pulse`}>
                <MessageSquare className={`w-20 h-20 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`} />
              </div>
              
              {/* Orbital rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-96 h-96 border ${
                  isDark ? 'border-amber-400/20' : 'border-purple-600/20'
                } rounded-full animate-spin`} style={{ animationDuration: '20s' }} />
                <div className={`absolute w-[28rem] h-[28rem] border ${
                  isDark ? 'border-amber-400/10' : 'border-purple-600/10'
                } rounded-full animate-spin`} style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-12">
          
          <div>
            
            {/* Contact Form Section */}
            <section id="contact-form" className="py-20">
              <div className="max-w-2xl mx-auto">
                <div className={`text-center mb-12 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Send.Message()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Drop us a line and we'll get back to you soon...
                  </div>
                </div>
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className={`mb-6 p-4 rounded-lg border-2 ${
                    isDark 
                      ? 'bg-green-400/10 border-green-400/50 text-green-400' 
                      : 'bg-green-600/10 border-green-600/50 text-green-600'
                  } text-center font-mono`}>
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className={`block text-sm font-mono mb-2 ${
                      isDark ? 'text-white/80' : 'text-black/80'
                    }`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-amber-400/60' : 'text-purple-600/60'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 rounded-lg border-2 font-mono transition-all duration-300 ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : isDark 
                              ? 'bg-black/60 border-amber-400/20 text-white placeholder-white/50 focus:border-amber-400 focus:bg-amber-400/5' 
                              : 'bg-white/60 border-purple-600/20 text-black placeholder-black/50 focus:border-purple-600 focus:bg-purple-600/5'
                        } backdrop-blur-sm focus:outline-none focus:shadow-lg ${
                          isDark ? 'focus:shadow-amber-400/20' : 'focus:shadow-purple-600/20'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 font-mono">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className={`block text-sm font-mono mb-2 ${
                      isDark ? 'text-white/80' : 'text-black/80'
                    }`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <AtSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-amber-400/60' : 'text-purple-600/60'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 rounded-lg border-2 font-mono transition-all duration-300 ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : isDark 
                              ? 'bg-black/60 border-amber-400/20 text-white placeholder-white/50 focus:border-amber-400 focus:bg-amber-400/5' 
                              : 'bg-white/60 border-purple-600/20 text-black placeholder-black/50 focus:border-purple-600 focus:bg-purple-600/5'
                        } backdrop-blur-sm focus:outline-none focus:shadow-lg ${
                          isDark ? 'focus:shadow-amber-400/20' : 'focus:shadow-purple-600/20'
                        }`}
                        placeholder="your.email@domain.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 font-mono">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className={`block text-sm font-mono mb-2 ${
                      isDark ? 'text-white/80' : 'text-black/80'
                    }`}>
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-3 top-4 w-5 h-5 ${
                        isDark ? 'text-amber-400/60' : 'text-purple-600/60'
                      }`} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full pl-12 pr-4 py-4 rounded-lg border-2 font-mono transition-all duration-300 resize-none ${
                          errors.message
                            ? 'border-red-500 focus:border-red-500'
                            : isDark 
                              ? 'bg-black/60 border-amber-400/20 text-white placeholder-white/50 focus:border-amber-400 focus:bg-amber-400/5' 
                              : 'bg-white/60 border-purple-600/20 text-black placeholder-black/50 focus:border-purple-600 focus:bg-purple-600/5'
                        } backdrop-blur-sm focus:outline-none focus:shadow-lg ${
                          isDark ? 'focus:shadow-amber-400/20' : 'focus:shadow-purple-600/20'
                        }`}
                        placeholder="Tell us about your project, idea, or how we can collaborate..."
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-mono text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark 
                        ? 'bg-amber-400 text-black hover:bg-amber-400/90 shadow-lg shadow-amber-400/30' 
                        : 'bg-purple-600 text-white hover:bg-purple-600/90 shadow-lg shadow-purple-600/30'
                    } terminal-glow`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>{'>'} submit.message()</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </section>

            {/* Community Contact Section */}
            <section className="py-20">
              <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-12 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">Community.Channels()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Connect with us through your preferred platform...
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {contactChannels.map((channel, index) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                        isDark 
                          ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
                          : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
                      } backdrop-blur-sm text-center`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${channel.color} opacity-10 blur-xl`} />
                      
                      <div className="relative">
                        <div className="mb-4">
                          <channel.icon className={`w-8 h-8 mx-auto ${
                            isDark ? 'text-amber-400' : 'text-purple-600'
                          } group-hover:animate-pulse`} />
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-2 font-mono ${
                          isDark ? 'text-white' : 'text-black'
                        }`}>
                          {channel.label}
                        </h3>
                        
                        <p className={`text-sm ${
                          isDark ? 'text-amber-400' : 'text-purple-600'
                        }`}>
                          {channel.handle}
                        </p>
                        
                        <ExternalLink className={`w-4 h-4 mx-auto mt-3 ${
                          isDark ? 'text-white/30' : 'text-black/30'
                        } group-hover:${isDark ? 'text-amber-400' : 'text-purple-600'} transition-colors`} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq-section" className="py-20">
              <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-12 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">FAQ.Query()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Frequently asked questions about Blockhore...
                  </div>
                </div>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border-2 ${
                        isDark 
                          ? 'border-amber-400/20 bg-black/40' 
                          : 'border-purple-600/20 bg-white/40'
                      } backdrop-blur-sm overflow-hidden`}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 ${
                          isDark ? 'hover:bg-amber-400/5' : 'hover:bg-purple-600/5'
                        }`}
                      >
                        <h3 className={`text-lg font-bold font-mono ${
                          isDark ? 'text-white' : 'text-black'
                        }`}>
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <ChevronUp className={`w-5 h-5 ${
                            isDark ? 'text-amber-400' : 'text-purple-600'
                          }`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${
                            isDark ? 'text-amber-400' : 'text-purple-600'
                          }`} />
                        )}
                      </button>
                      
                      {expandedFaq === index && (
                        <div className={`px-6 pb-6 ${
                          isDark ? 'text-white/80' : 'text-black/80'
                        } leading-relaxed animate-fade-up`}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>



        </div>
      </div>


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
