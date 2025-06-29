import React, { useRef } from 'react';
import { Upload, FileText, Clipboard, AlertCircle } from 'lucide-react';

interface DropZoneProps {
  onUpload: (content: string, filename?: string) => void;
}

export function DropZone({ onUpload }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [pasteError, setPasteError] = React.useState<string>('');

  const validateSVG = (content: string): boolean => {
    const trimmed = content.trim();
    return trimmed.startsWith('<svg') && trimmed.includes('</svg>');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const svgFile = files.find(file => file.type === 'image/svg+xml' || file.name.endsWith('.svg'));
    
    if (svgFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (validateSVG(content)) {
          onUpload(content, svgFile.name);
        }
      };
      reader.readAsText(svgFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (validateSVG(content)) {
          onUpload(content, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handlePaste = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any parent click handlers
    setPasteError('');
    try {
      const text = await navigator.clipboard.readText();
      if (validateSVG(text)) {
        onUpload(text, 'pasted.svg');
      } else {
        setPasteError('The clipboard content is not a valid SVG. Please copy a valid SVG code.');
      }
    } catch (err) {
      setPasteError('Failed to read clipboard. Please make sure you have copied SVG content and granted clipboard permissions.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div
        className={`relative w-full max-w-2xl p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg,image/svg+xml"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload SVG file"
        />
        
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Upload your SVG file
          </h2>
          
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Drop your SVG file here, or click to browse. We'll optimize it instantly while keeping the visual quality intact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleChooseFile}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <FileText className="w-5 h-5" />
              <span>Choose File</span>
            </button>
            
            <button
              onClick={handlePaste}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium"
            >
              <Clipboard className="w-5 h-5" />
              <span>Paste SVG</span>
            </button>
          </div>
          
          {pasteError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{pasteError}</p>
            </div>
          )}
          
          <p className="text-sm text-slate-500 mt-6">
            Supports SVG files up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}