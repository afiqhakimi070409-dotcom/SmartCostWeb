import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Language, PageId, TRANSLATIONS } from './i18n/translations';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import HelpPage from './components/HelpPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import CostingSimulatorModal from './components/CostingSimulatorModal';

const PAGE_PATHS: Record<PageId, string> = {
  utama: '/',
  perkhidmatan: '/perkhidmatan',
  bantuan: '/bantuan',
  mengenai: '/mengenai',
};

function parsePageFromLocation(): PageId {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace(/^#/, '');
  const candidate = hash || path;

  if (candidate === '/perkhidmatan' || candidate === 'perkhidmatan' || candidate === '/services' || candidate === 'services') {
    return 'perkhidmatan';
  }
  if (candidate === '/bantuan' || candidate === 'bantuan' || candidate === '/help' || candidate === 'help') {
    return 'bantuan';
  }
  if (candidate === '/mengenai' || candidate === 'mengenai' || candidate === '/about' || candidate === 'about') {
    return 'mengenai';
  }
  return 'utama';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() => parsePageFromLocation());
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem('smartcost_lang');
      return saved === 'en' ? 'en' : 'ms';
    } catch {
      return 'ms';
    }
  });
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  useEffect(() => {
    const t = TRANSLATIONS[language];
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.metaDescription);

    try {
      window.localStorage.setItem('smartcost_lang', language);
    } catch {
      // ignore storage errors in restricted environments
    }
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(parsePageFromLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    const targetPath = PAGE_PATHS[page];
    if (window.location.pathname !== targetPath || window.location.hash) {
      try {
        window.history.pushState({ page }, '', targetPath);
      } catch {
        // ignore history errors in sandboxed frames
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white text-[#0F172A] overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#061830] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          {TRANSLATIONS[language].skipToContent}
        </a>

        <Navbar
          activePage={activePage}
          language={language}
          onNavigate={handleNavigate}
          onChangeLanguage={setLanguage}
        />

        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePage}-${language}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {activePage === 'utama' && (
                <HomePage
                  language={language}
                  onNavigate={handleNavigate}
                />
              )}
              {activePage === 'perkhidmatan' && (
                <ServicesPage
                  language={language}
                  onOpenSimulator={() => setSimulatorOpen(true)}
                />
              )}
              {activePage === 'bantuan' && <HelpPage language={language} />}
              {activePage === 'mengenai' && <AboutPage language={language} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          activePage={activePage}
          language={language}
          onNavigate={handleNavigate}
          onChangeLanguage={setLanguage}
        />

        <CostingSimulatorModal
          isOpen={simulatorOpen}
          language={language}
          onClose={() => setSimulatorOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
