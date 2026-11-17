import {
  Scale,
  Receipt,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
  Download,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, SMARTCOST_SYSTEM_URL, TRANSLATIONS } from '../i18n/translations';
import CostBreakdownChart from './CostBreakdownChart';

interface ServicesPageProps {
  language: Language;
  onOpenSimulator: () => void;
}

function ServiceIcon({
  name,
}: {
  name: 'scale' | 'receipt' | 'trending' | 'file';
}) {
  const iconClass = 'h-5 w-5 text-[#061830]';
  switch (name) {
    case 'scale':
      return <Scale className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
    case 'receipt':
      return <Receipt className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
    case 'trending':
      return <TrendingUp className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
    case 'file':
      return (
        <FileSpreadsheet className={iconClass} strokeWidth={1.5} aria-hidden="true" />
      );
  }
}

function downloadSampleCsv(language: Language) {
  const csvContent =
    language === 'ms'
      ? [
          'Item Bahan Mentah,Harga Pukal (RM),Kuantiti Pukal,Unit,Kuantiti Digunakan,Kos Sebenar (RM)',
          'Tepung Gandum,3.80,1000,g,500,1.90',
          'Mentega Tulen,12.50,250,g,200,10.00',
          'Susu Pekat Manis,3.60,500,ml,250,1.80',
          'Serbuk Koko,16.00,500,g,120,3.84',
          'Kos Pembungkusan & Utiliti,-,-,-,-,6.50',
          'Jumlah Kos Pengeluaran (10 Unit),-,-,-,-,24.04',
          'Kos Seunit,-,-,-,-,2.40',
          'Cadangan Harga Jualan (Margin 40%),-,-,-,-,4.00',
        ].join('\n')
      : [
          'Raw Material Item,Bulk Price (RM),Bulk Quantity,Unit,Used Quantity,Actual Cost (RM)',
          'Wheat Flour,3.80,1000,g,500,1.90',
          'Pure Butter,12.50,250,g,200,10.00',
          'Condensed Milk,3.60,500,ml,250,1.80',
          'Cocoa Powder,16.00,500,g,120,3.84',
          'Packaging & Utility Costs,-,-,-,-,6.50',
          'Total Batch Cost (10 Units),-,-,-,-,24.04',
          'Cost Per Unit,-,-,-,-,2.40',
          'Suggested Selling Price (40% Margin),-,-,-,-,4.00',
        ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    language === 'ms'
      ? 'smartcost-contoh-laporan-kos.csv'
      : 'smartcost-sample-cost-report.csv'
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ServicesPage({
  language,
  onOpenSimulator,
}: ServicesPageProps) {
  const t = TRANSLATIONS[language].services;
  const tSim = TRANSLATIONS[language].simulator;

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

      {/* 2x2 Equal-Height Module Cards */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {t.items.map((service, idx) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex h-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 sm:p-8 hover:border-slate-300 transition-colors duration-150"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-[#F4F7FA]">
                      <ServiceIcon name={service.iconName} />
                    </div>
                    <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                      {service.number}
                    </span>
                  </div>

                  <h2 className="sc-h3 mt-5 text-[#0F172A]">{service.title}</h2>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-slate-600">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {service.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                      >
                        <Check
                          className="h-4 w-4 shrink-0 text-[#1E40AF] mt-0.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-slate-100 pt-4">
                  {service.id === 'muat-turun-laporan' ? (
                    <button
                      type="button"
                      onClick={() => downloadSampleCsv(language)}
                      className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#1E40AF] hover:text-[#061830] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
                    >
                      <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      <span>{t.downloadAction}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenSimulator}
                      className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#1E40AF] hover:text-[#061830] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
                    >
                      <span>{t.testAction}</span>
                      <ArrowRight
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Wide Panel: Visualisasi Komposisi Kos (SVG/HTML Chart Preview) */}
          <div className="mt-12 rounded-[10px] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <p className="sc-eyebrow font-mono text-[#1E40AF]">
                    {t.visualizerEyebrow}
                  </p>
                  <h2 className="sc-h2 mt-2 text-[#0F172A]">{t.visualizerTitle}</h2>
                  <p className="mt-3 text-[16px] leading-[1.6] text-slate-600">
                    {t.visualizerBody}
                  </p>
                </div>

                <div className="mt-7">
                  <a
                    href={SMARTCOST_SYSTEM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#061830] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E40AF] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                  >
                    <span>{t.visualizerCta}</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-sm font-semibold text-[#0F172A]">
                    {t.visualizerSampleProduct}
                  </span>
                  <span className="font-mono text-xs font-medium text-slate-500 tabular-nums">
                    RM 4.00 / {t.unitSingular}
                  </span>
                </div>

                <CostBreakdownChart
                  title={tSim.chartTitle}
                  totalPrice={4.0}
                  centerUnitLabel={tSim.chartCenterUnit}
                  segments={[
                    {
                      id: 'mat',
                      label: tSim.legendMaterials,
                      amount: 1.75,
                      color: '#061830',
                    },
                    {
                      id: 'pkg',
                      label: tSim.legendPackaging,
                      amount: 0.45,
                      color: '#1E40AF',
                    },
                    {
                      id: 'util',
                      label: tSim.legendUtility,
                      amount: 0.2,
                      color: '#64748B',
                    },
                    {
                      id: 'prof',
                      label: tSim.legendProfit,
                      amount: 1.6,
                      color: '#059669',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
