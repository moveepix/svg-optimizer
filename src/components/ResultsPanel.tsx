import React, { useState } from 'react';
import { Download, X, Eye, Code, TrendingDown, FileText, Clock, Palette } from 'lucide-react';

interface Stats {
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercent: number;
}

interface ResultsPanelProps {
  originalSVG: string;
  optimizedSVG: string;
  stats: Stats | null;
  isOptimizing: boolean;
  onDownload: () => void;
  onClear: () => void;
}

export function ResultsPanel({ originalSVG, optimizedSVG, stats, isOptimizing, onDownload, onClear }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [backgroundColor, setBackgroundColor] = useState('#f8fafc'); // Default slate-50

  const backgroundOptions = [
    { name: 'Light Gray', value: '#f8fafc', class: 'bg-slate-50' },
    { name: 'White', value: '#ffffff', class: 'bg-white' },
    { name: 'Dark Gray', value: '#374151', class: 'bg-gray-700' },
    { name: 'Black', value: '#000000', class: 'bg-black' },
    { name: 'Light Blue', value: '#dbeafe', class: 'bg-blue-100' },
    { name: 'Light Green', value: '#dcfce7', class: 'bg-green-100' },
    { name: 'Light Red', value: '#fee2e2', class: 'bg-red-100' },
    { name: 'Light Yellow', value: '#fefce8', class: 'bg-yellow-100' },
  ];

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCodeStats = () => {
    const originalChars = originalSVG.length;
    const optimizedChars = optimizedSVG.length;
    const charsSaved = originalChars - optimizedChars;
    const charsReduction = originalChars > 0 ? (charsSaved / originalChars) * 100 : 0;
    
    return {
      originalChars,
      optimizedChars,
      charsSaved,
      charsReduction
    };
  };

  const codeStats = getCodeStats();

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Original</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">{formatBytes(stats.originalSize)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-slate-600">Optimized</span>
            </div>
            <p className="text-xl font-semibold text-emerald-600">{formatBytes(stats.optimizedSize)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">Saved</span>
            </div>
            <p className="text-xl font-semibold text-blue-600">{formatBytes(stats.savings)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-slate-600">Reduction</span>
            </div>
            <p className="text-xl font-semibold text-orange-600">{stats.savingsPercent.toFixed(1)}%</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === 'code'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code
            </button>
          </div>

          {/* Background Color Picker - Only show in preview mode */}
          {activeTab === 'preview' && (
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-slate-600" />
              <select
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="text-sm border border-slate-300 rounded-md px-2 py-1 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {backgroundOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {isOptimizing && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock className="w-4 h-4 animate-spin" />
              <span className="text-sm">Optimizing...</span>
            </div>
          )}
          
          <button
            onClick={onDownload}
            disabled={isOptimizing}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={onClear}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {activeTab === 'preview' ? (
          <div className="space-y-4">
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-sm font-medium text-slate-700 mb-4">Original</h4>
              <div 
                className="flex items-center justify-center min-h-[300px] rounded-lg p-4 border border-slate-200"
                style={{ backgroundColor }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: originalSVG }}
                  className="max-w-full max-h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:h-auto [&>svg]:w-auto"
                />
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-sm font-medium text-slate-700 mb-4">Optimized</h4>
              <div 
                className="flex items-center justify-center min-h-[300px] rounded-lg p-4 border border-slate-200"
                style={{ backgroundColor }}
              >
                {isOptimizing ? (
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>Optimizing...</span>
                  </div>
                ) : optimizedSVG ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: optimizedSVG }}
                    className="max-w-full max-h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:h-auto [&>svg]:w-auto"
                  />
                ) : (
                  <div className="text-slate-500 text-sm">No optimized SVG available</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Code Stats */}
            <div className="p-6 border-b border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-slate-600">Original Characters</p>
                  <p className="text-lg font-semibold text-slate-900">{codeStats.originalChars.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600">Optimized Characters</p>
                  <p className="text-lg font-semibold text-emerald-600">{codeStats.optimizedChars.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600">Characters Saved</p>
                  <p className="text-lg font-semibold text-blue-600">{codeStats.charsSaved.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600">Code Reduction</p>
                  <p className="text-lg font-semibold text-orange-600">{codeStats.charsReduction.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            
            {/* Code Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              <div className="p-6">
                <h4 className="text-sm font-medium text-slate-700 mb-4">Original Code</h4>
                <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-auto">
                  <pre className="text-xs text-slate-700 whitespace-pre-wrap">
                    {originalSVG}
                  </pre>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-medium text-slate-700 mb-4">Optimized Code</h4>
                <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-auto">
                  {isOptimizing ? (
                    <div className="flex items-center justify-center py-8 text-slate-500">
                      <Clock className="w-5 h-5 animate-spin mr-2" />
                      <span>Optimizing...</span>
                    </div>
                  ) : (
                    <pre className="text-xs text-slate-700 whitespace-pre-wrap">
                      {optimizedSVG}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}