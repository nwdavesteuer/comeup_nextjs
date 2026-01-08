'use client';

import { useState } from 'react';
import { OnboardingForm } from '@/components/artist/OnboardingForm';
import { ResultsDisplay } from '@/components/artist/ResultsDisplay';
import type { ArtistOnboardingData, ContentGenerationResponse } from '@/types';

export default function Home() {
  const [results, setResults] = useState<ContentGenerationResponse | null>(null);

  const handleSuccess = (data: ArtistOnboardingData, results: ContentGenerationResponse) => {
    setResults(results);
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (results) {
    return (
      <main className="flex min-h-screen flex-col items-start p-8">
        <ResultsDisplay results={results} onReset={() => setResults(null)} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Artist Content Platform
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered content generation for music artists
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Generate 15-20 promotional posts tailored to your release cycle
          </p>
        </div>
        <OnboardingForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
}
