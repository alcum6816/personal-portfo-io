import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted mb-4 md:mb-0">
            © {currentYear} Afnan Junjwadkar. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-200"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:contact@afnan.dev"
              className="text-muted hover:text-accent transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;