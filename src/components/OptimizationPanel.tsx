import React from 'react';
import { Settings, Zap, Target, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

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

interface OptimizationPanelProps {
  options: OptimizationOptions;
  onOptionsChange: (options: OptimizationOptions) => void;
  isOptimizing: boolean;
}

export function OptimizationPanel({ options, onOptionsChange, isOptimizing }: OptimizationPanelProps) {
  const presets = {
    basic: {
      icon: Zap,
      title: 'Basic',
      description: 'Safe optimizations that preserve functionality',
      color: 'emerald',
      statusText: 'Using safe optimizations'
    },
    aggressive: {
      icon: Target,
      title: 'Aggressive',
      description: 'Maximum compression with potential visual changes',
      color: 'orange',
      statusText: 'Using maximum compression'
    },
    custom: {
      icon: Wrench,
      title: 'Custom',
      description: 'Fine-tune optimization settings',
      color: 'blue',
      statusText: 'Using custom settings'
    }
  };

  const handlePresetChange = (preset: 'basic' | 'aggressive' | 'custom') => {
    let newOptions = { ...options, preset };

    if (preset === 'basic') {
      newOptions = {
        ...newOptions,
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
        // removeDimensions is kept separate and not changed by presets
      };
    } else if (preset === 'aggressive') {
      newOptions = {
        ...newOptions,
        removeComments: true,
        removeMetadata: true,
        removeTitle: true,
        removeDesc: true,
        removeUselessDefs: true,
        removeEditorsNSData: true,
        removeEmptyAttrs: true,
        removeHiddenElems: true,
        removeEmptyText: true,
        removeEmptyContainers: true,
        minifyStyles: true,
        convertColors: true,
        convertPathData: true,
        convertTransform: true,
        removeUnknownsAndDefaults: true,
        removeUselessStrokeAndFill: true,
        removeViewBox: true,
        cleanupEnableBackground: true,
        mergePaths: true,
        convertShapeToPath: true,
        sortAttrs: true,
        // removeDimensions is kept separate and not changed by presets
      };
    }

    onOptionsChange(newOptions);
  };

  const handleOptionChange = (key: keyof OptimizationOptions, value: boolean) => {
    onOptionsChange({
      ...options,
      preset: 'custom',
      [key]: value
    });
  };

  const handleRemoveDimensionsChange = (value: boolean) => {
    onOptionsChange({
      ...options,
      removeDimensions: value
    });
  };

  const currentPreset = presets[options.preset];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-slate-700" />
        <h3 className="text-lg font-semibold text-slate-900">Optimization Settings</h3>
      </div>

      {/* Active Status Banner */}
      <div className={`mb-6 p-4 rounded-lg border-2 ${
        options.preset === 'basic' ? 'border-emerald-200 bg-emerald-50' :
        options.preset === 'aggressive' ? 'border-orange-200 bg-orange-50' :
        'border-blue-200 bg-blue-50'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            options.preset === 'basic' ? 'bg-emerald-100' :
            options.preset === 'aggressive' ? 'bg-orange-100' :
            'bg-blue-100'
          }`}>
            {React.createElement(currentPreset.icon, {
              className: `w-5 h-5 ${
                options.preset === 'basic' ? 'text-emerald-600' :
                options.preset === 'aggressive' ? 'text-orange-600' :
                'text-blue-600'
              }`
            })}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${
                options.preset === 'basic' ? 'text-emerald-600' :
                options.preset === 'aggressive' ? 'text-orange-600' :
                'text-blue-600'
              }`} />
              <span className={`text-sm font-semibold ${
                options.preset === 'basic' ? 'text-emerald-900' :
                options.preset === 'aggressive' ? 'text-orange-900' :
                'text-blue-900'
              }`}>
                Currently Active: {currentPreset.title}
              </span>
            </div>
            <p className={`text-sm mt-1 ${
              options.preset === 'basic' ? 'text-emerald-700' :
              options.preset === 'aggressive' ? 'text-orange-700' :
              'text-blue-700'
            }`}>
              {currentPreset.statusText}
            </p>
          </div>
          {isOptimizing && (
            <div className="flex items-center space-x-2 text-slate-600">
              <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full"></div>
              <span className="text-xs">Applying...</span>
            </div>
          )}
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-slate-700">Choose Preset</h4>
        {Object.entries(presets).map(([key, preset]) => {
          const Icon = preset.icon;
          const isSelected = options.preset === key;
          
          return (
            <button
              key={key}
              onClick={() => handlePresetChange(key as any)}
              disabled={isOptimizing}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? `border-${preset.color}-500 bg-${preset.color}-50 ring-2 ring-${preset.color}-200`
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              } ${isOptimizing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  isSelected 
                    ? `bg-${preset.color}-100` 
                    : 'bg-slate-100'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    isSelected 
                      ? `text-${preset.color}-600` 
                      : 'text-slate-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-slate-900">{preset.title}</h5>
                    {isSelected && (
                      <CheckCircle className={`w-4 h-4 text-${preset.color}-600`} />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{preset.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Remove Dimensions - Separate Section with Warning */}
      <div className="mb-6 p-4 border border-amber-200 bg-amber-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-amber-900">Advanced Option</h4>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.removeDimensions}
                  onChange={(e) => handleRemoveDimensionsChange(e.target.checked)}
                  disabled={isOptimizing}
                  className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-amber-900">Remove Dimensions</span>
              </label>
            </div>
            <p className="text-sm text-amber-800">
              <strong>Warning:</strong> This removes width and height attributes from the SVG. 
              This may cause the optimized preview to appear blank or not display properly, 
              but the SVG will still be valid and can be used in web pages with CSS sizing.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Options */}
      {options.preset === 'custom' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Wrench className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-medium text-slate-700">Custom Settings</h4>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {[
              { key: 'removeComments', label: 'Remove comments' },
              { key: 'removeMetadata', label: 'Remove metadata' },
              { key: 'removeTitle', label: 'Remove title elements' },
              { key: 'removeDesc', label: 'Remove description elements' },
              { key: 'removeUselessDefs', label: 'Remove useless defs' },
              { key: 'removeEditorsNSData', label: 'Remove editor namespace data' },
              { key: 'removeEmptyAttrs', label: 'Remove empty attributes' },
              { key: 'removeHiddenElems', label: 'Remove hidden elements' },
              { key: 'removeEmptyText', label: 'Remove empty text' },
              { key: 'removeEmptyContainers', label: 'Remove empty containers' },
              { key: 'minifyStyles', label: 'Minify styles' },
              { key: 'convertColors', label: 'Convert colors' },
              { key: 'convertPathData', label: 'Convert path data' },
              { key: 'convertTransform', label: 'Convert transforms' },
              { key: 'removeUnknownsAndDefaults', label: 'Remove unknown and default attrs' },
              { key: 'removeUselessStrokeAndFill', label: 'Remove useless stroke and fill' },
              { key: 'removeViewBox', label: 'Remove viewBox' },
              { key: 'cleanupEnableBackground', label: 'Cleanup enable-background' },
              { key: 'mergePaths', label: 'Merge paths' },
              { key: 'convertShapeToPath', label: 'Convert shapes to paths' },
              { key: 'sortAttrs', label: 'Sort attributes' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[key as keyof OptimizationOptions] as boolean}
                  onChange={(e) => handleOptionChange(key as keyof OptimizationOptions, e.target.checked)}
                  disabled={isOptimizing}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-slate-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}