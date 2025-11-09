import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@mantine/core';
import { AppShell } from '@mantine/core';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { VideoLibraryPage } from './pages/VideoLibraryPage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const { i18n } = useTranslation();
  const { setDirection } = useDirection();

  // Update text direction based on language
  useEffect(() => {
    const dir = i18n.dir();
    setDirection(dir as 'ltr' | 'rtl');
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language, setDirection, i18n]);

  return (
    <AppShell
      header={{ height: 70 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:quizId?" element={<QuizPage />} />
          <Route path="/assessment/:assessmentId?" element={<AssessmentPage />} />
          <Route path="/videos/:videoId?" element={<VideoLibraryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
