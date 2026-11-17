import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HelpPageProps {
  language: Language;
}

interface FieldErrors {
  nama?: string;
  hubungan?: string;
  mesej?: string;
}

function sanitizeInput(value: string): string {
  return value.replace(/[<>]/g, '').replace(/[\u0000-\u001F\u007F]/g, '');
}

const RATE_LIMIT_MS = 15000;

export default function HelpPage({ language }: HelpPageProps) {
  const t = TRANSLATIONS[language].help;
  const [openFaqId, setOpenFaqId] = useState<string | null>(t.faqs[0].id);

  // Contact form state
  const [nama, setNama] = useState('');
  const [hubungan, setHubungan] = useState('');
  const [mesej, setMesej] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const contactInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const lastSubmitAtRef = useRef<number>(0);
  const submitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Silent honeypot check for automated spam bots
    if (honeypot.trim().length > 0) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAtRef.current < RATE_LIMIT_MS) {
      setFormError(t.errCooldown);
      return;
    }

    const sanitizedNama = sanitizeInput(nama).trim();
    const sanitizedHubungan = sanitizeInput(hubungan).trim();
    const sanitizedMesej = sanitizeInput(mesej).trim();

    const errors: FieldErrors = {};

    if (!sanitizedNama) {
      errors.nama = t.errNameRequired;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneDigits = sanitizedHubungan.replace(/[\s\-()]/g, '');
    const isPhoneValid = /^\+?\d{9,15}$/.test(phoneDigits);
    const isEmailValid = emailRegex.test(sanitizedHubungan);

    if (!sanitizedHubungan || (!isEmailValid && !isPhoneValid)) {
      errors.hubungan = t.errInvalidContact;
    }

    if (sanitizedMesej.length < 10) {
      errors.mesej = t.errMessageMin;
    }

    if (errors.nama || errors.hubungan || errors.mesej) {
      setFieldErrors(errors);
      setFormError('');
      if (errors.nama) {
        nameInputRef.current?.focus();
      } else if (errors.hubungan) {
        contactInputRef.current?.focus();
      } else if (errors.mesej) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setFieldErrors({});
    setFormError('');
    setIsSubmitting(true);
    lastSubmitAtRef.current = now;

    // Keep sanitized values while preserving user input on failure
    setNama(sanitizedNama);
    setHubungan(sanitizedHubungan);
    setMesej(sanitizedMesej);

    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      // No backend/email endpoint is configured in this project; never fake success
      setFormError(t.errBackendUnavailable);
    }, 350);
  };

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

      {/* Horizontal Numbered Timeline: 3 Langkah Mudah */}
      <section className="border-b border-slate-200 bg-[#F4F7FA] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <p className="sc-eyebrow font-mono text-[#1E40AF]">{t.stepsEyebrow}</p>
          <h2 className="sc-h2 mt-2 text-[#0F172A]">{t.stepsTitle}</h2>

          <div className="relative mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Horizontal connecting line on desktop */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-8 left-12 right-12 h-px bg-slate-300"
            />
            {t.steps.map((item, idx) => (
              <motion.div
                key={item.stepLabel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex h-full flex-col rounded-lg border border-slate-200 bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-8 items-center rounded border border-slate-200 bg-[#F4F7FA] px-2.5 font-mono text-xs font-semibold text-[#061830] tabular-nums">
                    {item.stepLabel}
                  </span>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    0{idx + 1} / 03
                  </span>
                </div>
                <h3 className="sc-h3 mt-5 text-[#0F172A]">{item.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Column FAQ Accordion & Contact Form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: FAQ Accordion */}
            <div className="lg:col-span-7">
              <p className="sc-eyebrow font-mono text-[#1E40AF]">{t.faqEyebrow}</p>
              <h2 className="sc-h2 mt-2 text-[#0F172A]">{t.faqTitle}</h2>

              <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                {t.faqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id}>
                      <button
                        id={`${faq.id}-button`}
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${faq.id}-panel`}
                        className="flex w-full min-h-[56px] items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[#F4F7FA] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E40AF]"
                      >
                        <span className="text-base font-semibold text-[#0F172A]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#061830]' : ''
                          }`}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`${faq.id}-panel`}
                            role="region"
                            aria-labelledby={`${faq.id}-button`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-1 text-[16px] leading-[1.6] text-slate-600">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-slate-200 bg-[#F4F7FA] p-6 sm:p-8">
                <h2 className="sc-h3 text-[#0F172A]">{t.contactTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.contactSubtitle}
                </p>

                <form onSubmit={handleContactSubmit} noValidate className="mt-6 space-y-4">
                  {/* Honeypot field for bot filtering */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="contact-website">{t.honeypotLabel}</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-medium leading-relaxed text-red-800"
                    >
                      <AlertCircle
                        className="h-4 w-4 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-nama"
                      className="block text-xs font-medium text-[#0F172A]"
                    >
                      {t.fieldName}
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-nama"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.nama)}
                      aria-describedby={fieldErrors.nama ? 'contact-nama-err' : undefined}
                      value={nama}
                      onChange={(e) => {
                        setNama(e.target.value);
                        if (fieldErrors.nama) {
                          setFieldErrors((prev) => ({ ...prev, nama: undefined }));
                        }
                      }}
                      placeholder={t.fieldNamePlaceholder}
                      className={`mt-1.5 min-h-[44px] w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                        fieldErrors.nama
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:border-[#061830] focus:ring-[#061830]'
                      }`}
                    />
                    {fieldErrors.nama && (
                      <p id="contact-nama-err" className="mt-1.5 text-xs font-medium text-red-700">
                        {fieldErrors.nama}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-hubungan"
                      className="block text-xs font-medium text-[#0F172A]"
                    >
                      {t.fieldContact}
                    </label>
                    <input
                      ref={contactInputRef}
                      id="contact-hubungan"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.hubungan)}
                      aria-describedby={fieldErrors.hubungan ? 'contact-hubungan-err' : undefined}
                      value={hubungan}
                      onChange={(e) => {
                        setHubungan(e.target.value);
                        if (fieldErrors.hubungan) {
                          setFieldErrors((prev) => ({ ...prev, hubungan: undefined }));
                        }
                      }}
                      placeholder={t.fieldContactPlaceholder}
                      className={`mt-1.5 min-h-[44px] w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                        fieldErrors.hubungan
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:border-[#061830] focus:ring-[#061830]'
                      }`}
                    />
                    {fieldErrors.hubungan && (
                      <p id="contact-hubungan-err" className="mt-1.5 text-xs font-medium text-red-700">
                        {fieldErrors.hubungan}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-mesej"
                      className="block text-xs font-medium text-[#0F172A]"
                    >
                      {t.fieldMessage}
                    </label>
                    <textarea
                      ref={messageInputRef}
                      id="contact-mesej"
                      rows={4}
                      required
                      minLength={10}
                      aria-invalid={Boolean(fieldErrors.mesej)}
                      aria-describedby={fieldErrors.mesej ? 'contact-mesej-err' : undefined}
                      value={mesej}
                      onChange={(e) => {
                        setMesej(e.target.value);
                        if (fieldErrors.mesej) {
                          setFieldErrors((prev) => ({ ...prev, mesej: undefined }));
                        }
                      }}
                      placeholder={t.fieldMessagePlaceholder}
                      className={`mt-1.5 w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                        fieldErrors.mesej
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:border-[#061830] focus:ring-[#061830]'
                      }`}
                    />
                    {fieldErrors.mesej && (
                      <p id="contact-mesej-err" className="mt-1.5 text-xs font-medium text-red-700">
                        {fieldErrors.mesej}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="min-h-[44px] w-full rounded-md bg-[#061830] px-5 py-3 text-sm font-medium text-white hover:bg-[#1E40AF] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                  >
                    {isSubmitting ? t.submittingBtn : t.submitBtn}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
