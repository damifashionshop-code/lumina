import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LiquidBackground from './components/LiquidBackground';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Hero from './screens/Hero';
import Consent from './screens/Consent';
import FormScreen from './screens/FormScreen';
import LoadingShow from './screens/LoadingShow';
import ReportScreen from './screens/ReportScreen';
import PairScreen from './screens/PairScreen';
import { Terms, Privacy, Disclaimer, HowItWorks } from './pages/Legal';
import { generateReport } from './lib/report';
import type { Report, UserInput } from './lib/report';

type Step = 'hero' | 'consent' | 'form' | 'loading' | 'report';

function Flow() {
  const [step, setStep] = useState<Step>('hero');
  const [report, setReport] = useState<Report | null>(null);

  const handleSubmit = (data: UserInput) => {
    // All calculations are local — nothing is sent anywhere.
    setReport(generateReport(data));
    setStep('loading');
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {step === 'hero' && <Hero onStart={() => setStep('consent')} />}
      {step === 'consent' && <Consent onAccept={() => setStep('form')} onBack={() => setStep('hero')} />}
      {step === 'form' && <FormScreen onSubmit={handleSubmit} />}
      {step === 'loading' && <LoadingShow onDone={() => setStep('report')} />}
      {step === 'report' && report && (
        <ReportScreen report={report} onRestart={() => { setReport(null); setStep('form'); window.scrollTo({ top: 0 }); }} />
      )}
    </>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <LiquidBackground />
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<Flow />} />
          <Route path="/pair" element={<PairScreen />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
