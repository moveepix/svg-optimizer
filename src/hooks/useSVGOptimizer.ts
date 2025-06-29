import { useState, useCallback } from 'react';
import { optimize } from 'svgo';

interface OptimizationOptions {
  preset: 'basic' | 'aggressive' | 'custom';
  removeComments: boolean;
  removeMetadata: boolean;
  removeTitle: boolean;
  removeDesc: boolean;
  removeUselessDefs: boolean;
  removeEditorsNSData: boolean;
  removeEmptyAttrs: boolean;
  removeHiddenElems: boolean;
  removeEmptyText: boolean;
  removeEmptyContainers: boolean;
  minifyStyles: boolean;
  convertColors: boolean;
  convertPathData: boolean;
  convertTransform: boolean;
  removeUnknownsAndDefaults: boolean;
  removeUselessStrokeAndFill: boolean;
  removeViewBox: boolean;
  cleanupEnableBackground: boolean;
  mergePaths: boolean;
  convertShapeToPath: boolean;
  sortAttrs: boolean;
  removeDimensions: boolean;
}

interface Stats {
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercent: number;
}

export function useSVGOptimizer() {
  const [originalSVG, setOriginalSVG] = useState<string>('');
  const [optimizedSVG, setOptimizedSVG] = useState<string>('');
  const [filename, setFilename] = useState<string>('optimized.svg');
  const [stats, setStats] = useState<Stats | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [options, setOptions] = useState<OptimizationOptions>({
    preset: 'basic',
    removeComments: true,
    removeMetadata: true,
    removeTitle: false,
    removeDesc: false,
    removeUselessDefs: true,
    removeEditorsNSData: true,
    removeEmptyAttrs: true,
    removeHiddenElems: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    minifyStyles: true,
    convertColors: true,
    convertPathData: false,
    convertTransform: true,
    removeUnknownsAndDefaults: true,
    removeUselessStrokeAndFill: true,
    removeViewBox: false,
    cleanupEnableBackground: true,
    mergePaths: false,
    convertShapeToPath: false,
    sortAttrs: false,
    removeDimensions: false
  });

  const buildSVGOConfig = useCallback((opts: OptimizationOptions) => {
    const plugins = [];

    // Basic cleanup plugins
    if (opts.removeComments) plugins.push('removeComments');
    if (opts.removeMetadata) plugins.push('removeMetadata');
    if (opts.removeEditorsNSData) plugins.push('removeEditorsNSData');
    if (opts.removeEmptyAttrs) plugins.push('removeEmptyAttrs');
    if (opts.removeEmptyText) plugins.push('removeEmptyText');
    if (opts.removeEmptyContainers) plugins.push('removeEmptyContainers');
    if (opts.removeHiddenElems) plugins.push('removeHiddenElems');
    
    // Content removal plugins (be careful with these)
    if (opts.removeTitle) plugins.push('removeTitle');
    if (opts.removeDesc) plugins.push('removeDesc');
    if (opts.removeUselessDefs) plugins.push('removeUselessDefs');
    
    // Style and attribute optimization
    if (opts.minifyStyles) plugins.push('minifyStyles');
    if (opts.convertColors) plugins.push('convertColors');
    if (opts.removeUnknownsAndDefaults) plugins.push('removeUnknownsAndDefaults');
    if (opts.removeUselessStrokeAndFill) plugins.push('removeUselessStrokeAndFill');
    if (opts.cleanupEnableBackground) plugins.push('cleanupEnableBackground');
    if (opts.sortAttrs) plugins.push('sortAttrs');
    
    // Structural optimization (more aggressive)
    if (opts.convertPathData) plugins.push('convertPathData');
    if (opts.convertTransform) plugins.push('convertTransform');
    if (opts.mergePaths) plugins.push('mergePaths');
    if (opts.convertShapeToPath) plugins.push('convertShapeToPath');
    
    // Potentially breaking optimizations
    if (opts.removeViewBox) plugins.push('removeViewBox');
    if (opts.removeDimensions) plugins.push('removeDimensions');

    return { plugins };
  }, []);

  const validateSVG = useCallback((svgString: string): boolean => {
    if (!svgString || svgString.trim().length === 0) return false;
    const trimmed = svgString.trim();
    return trimmed.startsWith('<svg') && trimmed.includes('</svg>') && trimmed.length > 20;
  }, []);

  const optimizeSVG = useCallback(async (svgString: string, opts: OptimizationOptions) => {
    try {
      setIsOptimizing(true);
      
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const config = buildSVGOConfig(opts);
      console.log('SVGO Config:', config); // Debug log
      
      // More robust error handling for SVGO
      let result;
      try {
        result = optimize(svgString, config);
        console.log('Optimization result:', result); // Debug log
        
        // Validate the result
        if (!result.data || !validateSVG(result.data)) {
          throw new Error('Optimization produced invalid SVG');
        }
      } catch (svgoError) {
        console.warn('SVGO optimization failed, trying with safer config:', svgoError);
        
        // Fallback to safer config if full optimization fails
        const safeConfig = { 
          plugins: [
            'removeComments',
            'removeMetadata',
            'removeEditorsNSData',
            'removeEmptyAttrs',
            'removeEmptyText',
            'minifyStyles',
            'convertColors'
          ]
        };
        
        try {
          result = optimize(svgString, safeConfig);
          if (!result.data || !validateSVG(result.data)) {
            throw new Error('Safe optimization also failed');
          }
        } catch (fallbackError) {
          console.warn('Even safe optimization failed:', fallbackError);
          // Last resort: return original SVG
          result = { data: svgString };
        }
      }
      
      const originalSize = new Blob([svgString]).size;
      const optimizedSize = new Blob([result.data]).size;
      const savings = originalSize - optimizedSize;
      const savingsPercent = originalSize > 0 ? (savings / originalSize) * 100 : 0;
      
      setOptimizedSVG(result.data);
      setStats({
        originalSize,
        optimizedSize,
        savings,
        savingsPercent
      });
    } catch (error) {
      console.error('Optimization failed completely:', error);
      // Complete fallback to original SVG
      setOptimizedSVG(svgString);
      const size = new Blob([svgString]).size;
      setStats({
        originalSize: size,
        optimizedSize: size,
        savings: 0,
        savingsPercent: 0
      });
    } finally {
      setIsOptimizing(false);
    }
  }, [buildSVGOConfig, validateSVG]);

  const uploadSVG = useCallback((content: string, name?: string) => {
    // Reset stats when uploading new SVG
    setStats(null);
    setOptimizedSVG('');
    
    setOriginalSVG(content);
    setFilename(name || 'optimized.svg');
    optimizeSVG(content, options);
  }, [options, optimizeSVG]);

  const updateOptions = useCallback((newOptions: OptimizationOptions) => {
    setOptions(newOptions);
    if (originalSVG) {
      optimizeSVG(originalSVG, newOptions);
    }
  }, [originalSVG, optimizeSVG]);

  const downloadOptimized = useCallback(() => {
    if (!optimizedSVG) return;
    
    const blob = new Blob([optimizedSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.svg', '_optimized.svg');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [optimizedSVG, filename]);

  const clearSVG = useCallback(() => {
    setOriginalSVG('');
    setOptimizedSVG('');
    setStats(null);
    setFilename('optimized.svg');
  }, []);

  return {
    originalSVG,
    optimizedSVG,
    stats,
    isOptimizing,
    options,
    uploadSVG,
    updateOptions,
    downloadOptimized,
    clearSVG
  };
}