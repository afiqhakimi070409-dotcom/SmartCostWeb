import { useState } from 'react';
import { Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AboutPageProps {
  language: Language;
}

export default function AboutPage({ language }: AboutPageProps) {
  const t = TRANSLATIONS[language].about;
  const [teamPhotoError, setTeamPhotoError] = useState(false);

  return (
    <div className="bg-white">
      {/* Compact Inner Hero (<= 220px) */}
      <section className="sc-navy-surface border-b border-[#1B3354] text-white">
        <div
          aria-hidden="true"
          className="sc-accounting-pattern sc-accounting-pattern--subtle"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-10 sm:px-6 md:py-12 lg:px-8">
          <p className="sc-eyebrow font-mono text-slate-300">{t.breadcrumb}</p>
          <h1 className="sc-h1 mt-2 font-bold text-white">{t.title}</h1>
          <p className="mt-3 max-w-[65ch] text-[16px] leading-[1.6] text-slate-200">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Equal-Height Two-Column Grid: Matlamat & Pasukan Kami */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
            {/* Left Card: Matlamat (p-8 = 32px, details pinned at bottom with mt-auto) */}
            <motion.article
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex h-full flex-col rounded-lg border border-slate-200 bg-white p-8"
            >
              <div>
                <p className="sc-eyebrow font-mono text-[#1E40AF]">{t.goalEyebrow}</p>
                <h2 className="sc-h2 mt-3 text-[#0F172A]">{t.goalTitle}</h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-slate-600">
                  {t.goalBody}
                </p>
              </div>

              <dl className="mt-auto pt-6 border-t border-slate-200 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">{t.focusLabel}</dt>
                  <dd className="font-semibold text-[#0F172A] text-right">
                    {t.focusValue}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
                  <dt className="text-slate-500">{t.audienceLabel}</dt>
                  <dd className="font-semibold text-[#0F172A] text-right">
                    {t.audienceValue}
                  </dd>
                </div>
              </dl>
            </motion.article>

            {/* Right Card: Pasukan Kami (56% text left / 44% 4:3 photo right, vertically centered) */}
            <motion.article
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 flex h-full flex-col justify-between gap-6 rounded-lg border border-slate-200 bg-white p-8 md:flex-row md:items-stretch"
            >
              {/* Text Column (~56%) */}
              <div className="flex flex-1 flex-col justify-between md:w-[56%]">
                <div>
                  <p className="sc-eyebrow font-mono text-[#1E40AF]">{t.teamEyebrow}</p>
                  <h2 className="sc-h2 mt-3 text-[#0F172A]">{t.teamTitle}</h2>
                  <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-slate-600">
                    {t.teamBody}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-xs font-medium text-slate-500">
                    {t.teamRoleLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                    {t.teamRoleValue}
                  </p>
                </div>
              </div>

              {/* Photo Container (~44%, 4:3 aspect, max 480x360 desktop, max-h 280px mobile, vertically centered) */}
              <div className="w-full shrink-0 md:w-[44%] md:max-w-[480px] md:self-center">
                <div className="relative aspect-[4/3] w-full max-h-[280px] md:max-h-[360px] overflow-hidden rounded-[10px] border border-slate-200 bg-[#061830]">
                  {teamPhotoError ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#061830] p-6 text-center text-white">
                      <Users
                        className="h-7 w-7 text-slate-300"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <p className="text-xs font-semibold">{t.teamTitle}</p>
                      <p className="text-[11px] text-slate-300">{t.teamRoleValue}</p>
                    </div>
                  ) : (
                    <img
                      src="/assets/aistudio/image_f954451a.png"
                      alt={t.teamPhotoAlt}
                      width={908}
                      height={839}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setTeamPhotoError(true)}
                      className="h-full w-full object-cover object-[center_10%]"
                    />
                  )}
                </div>
              </div>
            </motion.article>
          </div>

          {/* Prinsip Kejuruteraan: Three Columns with Crisp Hairline Dividers */}
          <div className="mt-16 border-t border-slate-200 pt-16">
            <div className="max-w-[70ch]">
              <p className="sc-eyebrow font-mono text-[#1E40AF]">
                {t.principlesEyebrow}
              </p>
              <h2 className="sc-h2 mt-2 text-[#0F172A]">{t.principlesTitle}</h2>
            </div>

            <div className="mt-10 grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-y-0 md:divide-x rounded-lg border border-slate-200 bg-white">
              {t.principles.map((p) => (
                <div key={p.code} className="p-8">
                  <p className="font-mono text-xs font-semibold text-[#1E40AF] tabular-nums">
                    {p.code}
                  </p>
                  <h3 className="sc-h3 mt-3 text-[#0F172A]">{p.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-slate-600">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
