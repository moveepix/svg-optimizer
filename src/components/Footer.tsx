import React from 'react';
import { Heart, Github, ExternalLink, Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-slate-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and</span>
            <Coffee className="w-4 h-4 text-amber-600 fill-current" />
            <span>by Imagine Odyssey</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/svg/svgo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>SVGO Project</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            
            <a
              href="https://www.imagineodyssey.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <span>Imagine Odyssey</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>This tool runs entirely in your browser. Your SVG files are never uploaded to any server.</p>
        </div>
      </div>
    </footer>
  );
}