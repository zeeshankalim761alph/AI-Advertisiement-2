import React, { useState } from 'react';
import { AdForm } from './components/AdForm';
import { AdResult } from './components/AdResult';
import { AdFormData, AdCopy, Platform, Tone, Language } from './types';
import { generateAdCopies } from './services/geminiService';
import { Sparkles, Zap, LayoutTemplate } from 'lucide-react';

const DEFAULT_FORM_DATA: AdFormData = {
  productName: "Lumina Glow Serum",
  category: "Beauty & Skincare",
  audience: "Women aged 25-45 looking for anti-aging solutions",
  platform: Platform.Instagram,
  tone: Tone.Luxury,
  language: Language.English
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<AdFormData>(DEFAULT_FORM_DATA);
  const [results, setResults] = useState<AdCopy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    
    try {
      const generatedCopies = await generateAdCopies(formData);
      setResults(generatedCopies);
    } catch (err) {
      setError("Failed to generate ad copies. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg text-white">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                AdCraft AI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-500 text-sm font-medium">
               <div className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                 <LayoutTemplate size={16} /> Templates
               </div>
               <div className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                 <Sparkles size={16} /> AI Tools
               </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Create <span className="text-indigo-600">Viral Ad Copy</span> in Seconds
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leverage the power of Gemini AI to generate persuasive, platform-optimized marketing content for your brand.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <AdForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleSubmit} 
              isLoading={loading} 
            />
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Pro Tip</h4>
              <p className="text-xs text-blue-600">
                Be specific with your "Target Audience" to get more personalized results. Mentioning pain points often yields higher conversion copy.
              </p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 xl:col-span-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 animate-fade-in">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!loading && results.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Sparkles size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-medium text-gray-500">Ready to Create Magic?</h3>
                <p className="text-gray-400 mt-2 text-center max-w-xs">
                  Fill out the campaign details on the left and hit "Generate Ad Copy" to see results here.
                </p>
              </div>
            )}

            {results.length > 0 && (
               <AdResult results={results} platform={formData.platform} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
