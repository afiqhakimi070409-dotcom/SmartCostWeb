import { useState } from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { Language, PageId, SMARTCOST_SYSTEM_URL, TRANSLATIONS } from '../i18n/translations';

interface HomePageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

const advantagesContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const advantageCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HomePage({
  language,
  onNavigate,
}: HomePageProps) {
  const t = TRANSLATIONS[language].home;
  const [heroMargin, setHeroMargin] = useState<number>(40);

  const batchMaterials = 17.5;
  const batchOverhead = 6.5;
  const batchYield = 10;
  const totalUnitCost = (batchMaterials + batchOverhead) / batchYield; // RM 2.40
  const safeMargin = Number.isFinite(heroMargin)
    ? Math.min(90, Math.max(5, heroMargin))
    : 40;
  const marginDenominator = 1 - safeMargin / 100;
  const suggestedPrice =
    marginDenominator > 0 ? totalUnitCost / marginDenominator : totalUnitCost;
  const unitProfit = Math.max(0, suggestedPrice - totalUnitCost);

  return (
    <div>
      {/* 1. Hero Two-Column Section */}
      <section className="sc-navy-surface text-white">
        <div
          aria-hidden="true"
          className="sc-accounting-pattern sc-accounting-pattern--hero"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Headline + 1 Sentence + 2 CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <p className="sc-eyebrow font-mono text-slate-300">{t.kicker}</p>
              <h1 className="sc-h1 mt-4 font-bold text-white">{t.headline}</h1>
              <p className="mt-5 max-w-[60ch] text-[16px] sm:text-[17px] leading-[1.6] text-slate-200">
                {t.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={SMARTCOST_SYSTEM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-[#061830] hover:bg-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('perkhidmatan')}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[rgba(127,162,212,0.28)] bg-[rgba(13,29,52,0.5)] px-5 py-3 text-sm font-medium text-white hover:bg-[rgba(13,29,52,0.9)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t.ctaSecondary}
                </button>
              </div>
            </motion.div>

            {/* Right: Live HTML/CSS Costing Calculator Card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="rounded-[10px] border border-[rgba(127,162,212,0.18)] bg-[rgba(13,29,52,0.85)] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4 border-b border-[rgba(127,162,212,0.18)] pb-4">
                  <div>
                    <p className="sc-eyebrow font-mono text-slate-300">
                      {t.calcCardLabel}
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-white">
                      {t.calcCardTitle}
                    </h2>
                  </div>
                  <span className="font-mono text-xs font-medium text-slate-300 tabular-nums shrink-0">
                    {t.calcCardYield}
                  </span>
                </div>

                {/* Step-by-Step Formula Breakdown */}
                <div className="mt-5 space-y-3">
                  {t.calcSteps.map((row) => (
                    <div
                      key={row.step}
                      className="flex items-center justify-between gap-4 rounded-md border border-[rgba(127,162,212,0.16)] bg-[rgba(6,24,48,0.65)] px-4 py-2.5 text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-xs font-medium text-[#7FA2D4] tabular-nums shrink-0">
                          {row.step}
                        </span>
                        <span className="truncate text-slate-200">{row.label}</span>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-medium text-white tabular-nums shrink-0">
                        {row.formula}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Unit Cost + Interactive Margin Control + Selling Price Output */}
                <div className="mt-5 rounded-md border border-[rgba(127,162,212,0.18)] bg-[rgba(6,24,48,0.72)] p-4 sm:p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{t.calcUnitCostLabel}</span>
                    <span className="font-mono font-semibold text-white tabular-nums">
                      RM {totalUnitCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-[rgba(127,162,212,0.16)] pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <label
                        htmlFor="hero-margin-slider"
                        className="font-medium text-slate-300"
                      >
                        {t.calcMarginLabel}
                      </label>
                      <span className="font-mono font-semibold text-white tabular-nums">
                        {safeMargin}%
                      </span>
                    </div>
                    <input
                      id="hero-margin-slider"
                      type="range"
                      min={5}
                      max={90}
                      step={1}
                      value={safeMargin}
                      aria-valuemin={5}
                      aria-valuemax={90}
                      aria-valuenow={safeMargin}
                      aria-valuetext={`${safeMargin}%`}
                      onChange={(e) => {
                        const parsed = Number(e.target.value);
                        if (Number.isFinite(parsed)) {
                          setHeroMargin(Math.min(90, Math.max(5, parsed)));
                        }
                      }}
                      className="mt-2.5 w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-[rgba(127,162,212,0.16)] pt-4">
                    <div>
                      <p className="text-xs font-medium text-slate-300">
                        {t.calcPriceLabel}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-slate-300 tabular-nums">
                        {t.calcProfitNote}: RM {unitProfit.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-mono text-2xl font-semibold text-white tabular-nums">
                      RM {suggestedPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Slim Proof Bar */}
      <section className="border-b border-slate-200 bg-[#F4F7FA]">
        <div className="mx-auto max-w-[1200px] px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Award
              className="h-4 w-4 shrink-0 text-[#1E40AF]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-[#0F172A]">{t.proofText}</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('mengenai')}
            className="inline-flex items-center gap-1.5 self-start sm:self-center text-xs font-medium text-[#1E40AF] hover:text-[#061830] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
          >
            <span>{t.proofAction}</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* 3. Kelebihan Utama: 3 Items in One Row, Mono 01-03 */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[70ch]">
            <p className="sc-eyebrow font-mono text-[#1E40AF]">
              {t.advantagesEyebrow}
            </p>
            <h2 className="sc-h2 mt-2.5 text-[#0F172A]">{t.advantagesTitle}</h2>
            <p className="mt-3 text-[16px] sm:text-[17px] leading-[1.6] text-slate-600">
              {t.advantagesSubtitle}
            </p>
          </div>

          <motion.div
            variants={advantagesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {t.advantages.map((advantage) => (
              <motion.article
                key={advantage.number}
                variants={advantageCardVariants}
                className="flex h-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 hover:border-slate-300 transition-colors duration-150"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-[#1E40AF] tabular-nums">
                    {advantage.number}
                  </p>
                  <h3 className="sc-h3 mt-3 text-[#0F172A]">{advantage.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-slate-600">
                    {advantage.description}
                  </p>
                </div>
                <p className="mt-6 border-t border-slate-100 pt-4 text-[13px] leading-relaxed text-slate-500">
                  {advantage.detail}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Seni Bina Pengekosan: 3-Step Flow Diagram (HTML/CSS) */}
      <section className="border-t border-slate-200 bg-[#F4F7FA] py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[70ch]">
            <p className="sc-eyebrow font-mono text-[#1E40AF]">
              {t.architectureEyebrow}
            </p>
            <h2 className="sc-h2 mt-2.5 text-[#0F172A]">{t.architectureTitle}</h2>
            <p className="mt-3 text-[16px] sm:text-[17px] leading-[1.6] text-slate-600">
              {t.architectureSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {t.architectureSteps.map((node, index) => (
              <motion.div
                key={node.step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.22,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex h-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-7"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="sc-eyebrow font-mono text-[#1E40AF]">
                      {node.step} · {node.tag}
                    </span>
                    {index < t.architectureSteps.length - 1 && (
                      <ArrowRight
                        className="hidden lg:block h-4 w-4 text-slate-400"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="sc-h3 mt-4 text-[#0F172A]">{node.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-slate-600">
                    {node.description}
                  </p>
                </div>

                <dl className="mt-6 space-y-2 rounded-md border border-slate-200 bg-[#F4F7FA] p-4 text-xs">
                  {node.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between gap-3">
                      <dt className="text-slate-600">{m.label}</dt>
                      <dd className="font-mono font-semibold text-[#0F172A] tabular-nums">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
