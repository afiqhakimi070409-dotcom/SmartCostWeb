import { Language, PageId, TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  activePage: PageId;
  language: Language;
  onNavigate: (page: PageId) => void;
  onChangeLanguage: (lang: Language) => void;
}

export default function Footer({
  activePage,
  language,
  onNavigate,
  onChangeLanguage,
}: FooterProps) {
  const tNav = TRANSLATIONS[language].nav;
  const tFooter = TRANSLATIONS[language].footer;

  return (
    <footer className="sc-navy-surface text-white border-t border-[#1B3354] no-print">
      <div
        aria-hidden="true"
        className="sc-accounting-pattern sc-accounting-pattern--subtle"
      />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => onNavigate('utama')}
              className="text-[19px] font-semibold tracking-[0.06em] text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              SMARTCOST
            </button>
            <p className="mt-2.5 max-w-[46ch] text-sm leading-relaxed text-slate-300">
              {tFooter.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav aria-label={tNav.quickAria} className="flex flex-wrap gap-x-7 gap-y-3">
              {tNav.items.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`min-h-[44px] inline-flex items-center text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      isActive
                        ? 'text-white underline underline-offset-4'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="font-medium text-slate-400">{tNav.langLabel}:</span>
              <button
                type="button"
                onClick={() => onChangeLanguage('ms')}
                className={`min-h-[44px] inline-flex items-center cursor-pointer transition-colors duration-150 ${
                  language === 'ms'
                    ? 'font-semibold text-white underline underline-offset-4'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Bahasa Melayu
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => onChangeLanguage('en')}
                className={`min-h-[44px] inline-flex items-center cursor-pointer transition-colors duration-150 ${
                  language === 'en'
                    ? 'font-semibold text-white underline underline-offset-4'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgba(127,162,212,0.18)] pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {tFooter.copyrightSuffix}
          </p>
          <p>{tFooter.subnote}</p>
        </div>
      </div>
    </footer>
  );
}
