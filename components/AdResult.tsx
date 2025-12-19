import React, { useState } from 'react';
import { AdCopy, Platform } from '../types';
import { Copy, Check, Download, Share2, Hash } from 'lucide-react';

interface AdResultProps {
  results: AdCopy[];
  platform: Platform;
}

export const AdResult: React.FC<AdResultProps> = ({ results, platform }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = () => {
    const textContent = results.map((ad, i) => `
Option ${i + 1}:
Headline: ${ad.headline}
Body: ${ad.body}
CTA: ${ad.cta}
Hashtags: ${ad.hashtags.join(' ')}
-----------------------------------
`).join('\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ad-copies-${platform.toLowerCase().replace(/\s/g, '-')}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Generated Variations</h2>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
        >
          <Download size={16} />
          Download All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((ad, index) => {
          const fullText = `${ad.headline}\n\n${ad.body}\n\n${ad.cta}\n\n${ad.hashtags.join(' ')}`;
          
          return (
            <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
                  Variation #{index + 1}
                </span>
                <div className="flex gap-2">
                   <button 
                    onClick={() => handleCopy(fullText, index)}
                    className={`p-2 rounded-lg transition-all ${
                      copiedIndex === index 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'
                    }`}
                    title="Copy to clipboard"
                  >
                    {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                    {ad.headline}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed" dir="auto">
                    {ad.body}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
                    <div className="flex flex-col">
                         <span className="text-xs font-semibold text-gray-400 uppercase mb-1">Call to Action</span>
                        <span className="text-indigo-600 font-bold">{ad.cta}</span>
                    </div>
                </div>

                {ad.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {ad.hashtags.map((tag, i) => (
                      <span key={i} className="flex items-center text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
                        <Hash size={10} className="mr-1" />
                        {tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
