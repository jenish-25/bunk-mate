
import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BunkMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
