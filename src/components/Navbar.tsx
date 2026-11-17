import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, PageId, SMARTCOST_SYSTEM_URL, TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  activePage: PageId;
  language: Language;
  onNavigate: (page: PageId) => void;
  onChangeLanguage: (lang: Language) => void;
}

export default function Navbar({
  activePage,
  language,
  onNavigate,
  onChangeLanguage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white no-print">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        {/* Zon 1: Logo di kiri */}
        <button
          type="button"
          onClick={() => handleSelectPage('utama')}
          className="text-[19px] font-semibold tracking-[0.06em] text-[#061830] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] cursor-pointer"
          aria-label={t.homeAria}
        >
          SMARTCOST
        </button>

        {/* Zon 2: Kumpulan kanan (ml-auto) — pautan navigasi, togol BM/EN, butang Cuba Sistem */}
        <div className="ml-auto flex items-center">
          <nav
            aria-label={t.mainAria}
            className="hidden md:flex items-center gap-[30px]"
          >
            {t.items.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPage(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-[15px] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] ${
                    isActive
                      ? 'text-[#061830] font-semibold'
                      : 'text-slate-600 font-medium hover:text-[#0F172A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      aria-hidden="true"
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[#061830]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3.5 md:ml-9 shrink-0">
            <div
              role="group"
              aria-label={t.langLabel}
              className="inline-flex items-center rounded-md border border-slate-200 bg-[#F4F7FA] p-0.5"
            >
              <button
                type="button"
                onClick={() => onChangeLanguage('ms')}
                aria-pressed={language === 'ms'}
                className={`rounded-[4px] px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'ms'
                    ? 'bg-white text-[#061830] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                BM
              </button>
              <button
                type="button"
                onClick={() => onChangeLanguage('en')}
                aria-pressed={language === 'en'}
                className={`rounded-[4px] px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-[#061830] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={SMARTCOST_SYSTEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center min-h-[40px] rounded-md bg-[#061830] px-4 py-2 text-xs font-medium text-white hover:bg-[#1E40AF] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              {t.trySystem}
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex md:hidden items-center justify-center min-w-[44px] min-h-[44px] rounded-md border border-slate-200 text-[#0F172A] hover:bg-[#F4F7FA] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-slate-200 bg-white px-4 py-4 sm:px-6"
          >
            <nav aria-label={t.mobileAria} className="flex flex-col gap-1">
              {t.items.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectPage(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between min-h-[44px] rounded-md px-3 py-2 text-left text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#061830] text-white font-semibold'
                        : 'text-[#0F172A] hover:bg-[#F4F7FA]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-slate-200">
                <a
                  href={SMARTCOST_SYSTEM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full min-h-[44px] items-center justify-center rounded-md bg-[#061830] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1E40AF] transition-colors duration-150"
                >
                  {t.trySystemFull}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
