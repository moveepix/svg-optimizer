import React from 'react';
import { Header } from './components/Header';
import { DropZone } from './components/DropZone';
import { OptimizationPanel } from './components/OptimizationPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { Footer } from './components/Footer';
import { useSVGOptimizer } from './hooks/useSVGOptimizer';

function App() {
  const {
    originalSVG,
    optimizedSVG,
    stats,
    isOptimizing,
    options,
    uploadSVG,
    updateOptions,
    downloadOptimized,
    clearSVG
  } = useSVGOptimizer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1">
        {!originalSVG ? (
          <DropZone onUpload={uploadSVG} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ResultsPanel
                originalSVG={originalSVG}
                optimizedSVG={optimizedSVG}
                stats={stats}
                isOptimizing={isOptimizing}
                onDownload={downloadOptimized}
                onClear={clearSVG}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OptimizationPanel
                options={options}
                onOptionsChange={updateOptions}
                isOptimizing={isOptimizing}
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;