import React from 'react';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/io.png" 
              alt="Imagine Odyssey Logo" 
              className="w-10 h-10 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">SVG Optimizer</h1>
              <p className="text-sm text-slate-600">Optimize your SVG files instantly</p>
            </div>
          </div>
          
          <a
            href="https://github.com/svg/svgo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">Powered by SVGO</span>
          </a>
        </div>
      </div>
    </header>
  );
}