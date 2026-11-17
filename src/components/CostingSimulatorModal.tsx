import { useEffect, useRef, useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Download,
  Printer,
  RotateCcw,
  CheckCircle2,
  Calculator,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Language,
  RECIPE_PRESETS,
  RecipePreset,
  TRANSLATIONS,
} from '../i18n/translations';
import CostBreakdownChart from './CostBreakdownChart';

interface EditableMaterial {
  id: string;
  name: string;
  bulkPrice: number;
  bulkQuantity: number;
  unit: 'g' | 'ml' | 'unit';
  usedQuantity: number;
}

interface CostingSimulatorModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

function buildEditableFromPreset(preset: RecipePreset, lang: Language): EditableMaterial[] {
  return preset.materials.map((m) => ({
    id: m.id,
    name: m.name[lang],
    bulkPrice: m.bulkPrice,
    bulkQuantity: m.bulkQuantity,
    unit: m.unit,
    usedQuantity: m.usedQuantity,
  }));
}

export default function CostingSimulatorModal({
  isOpen,
  language,
  onClose,
}: CostingSimulatorModalProps) {
  const t = TRANSLATIONS[language].simulator;

  const [selectedPresetId, setSelectedPresetId] = useState<string>(RECIPE_PRESETS[0].id);
  const [productName, setProductName] = useState<string>(
    RECIPE_PRESETS[0].productName[language]
  );
  const [batchYield, setBatchYield] = useState<number>(RECIPE_PRESETS[0].batchYield);
  const [materials, setMaterials] = useState<EditableMaterial[]>(() =>
    buildEditableFromPreset(RECIPE_PRESETS[0], language)
  );
  const [packagingCost, setPackagingCost] = useState<number>(
    RECIPE_PRESETS[0].packagingCost
  );
  const [utilityLaborCost, setUtilityLaborCost] = useState<number>(
    RECIPE_PRESETS[0].utilityLaborCost
  );
  const [profitMargin, setProfitMargin] = useState<number>(
    RECIPE_PRESETS[0].profitMargin
  );
  const [calcTick, setCalcTick] = useState<number>(0);
  const [showSuccessNotice, setShowSuccessNotice] = useState<boolean>(false);
  const successTimerRef = useRef<number | null>(null);
  const summarySectionRef = useRef<HTMLDivElement | null>(null);

  const triggerSuccessFeedback = (scrollIntoView = false) => {
    setCalcTick((prev) => prev + 1);
    setShowSuccessNotice(true);
    if (successTimerRef.current !== null) {
      window.clearTimeout(successTimerRef.current);
    }
    successTimerRef.current = window.setTimeout(() => {
      setShowSuccessNotice(false);
    }, 2600);

    if (scrollIntoView && summarySectionRef.current) {
      summarySectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  useEffect(() => {
    return () => {
      if (successTimerRef.current !== null) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const applyPreset = (preset: RecipePreset, lang: Language = language) => {
    setSelectedPresetId(preset.id);
    setProductName(preset.productName[lang]);
    setBatchYield(preset.batchYield);
    setMaterials(buildEditableFromPreset(preset, lang));
    setPackagingCost(preset.packagingCost);
    setUtilityLaborCost(preset.utilityLaborCost);
    setProfitMargin(preset.profitMargin);
    triggerSuccessFeedback(false);
  };

  useEffect(() => {
    const preset = RECIPE_PRESETS.find((p) => p.id === selectedPresetId);
    if (preset) {
      setProductName(preset.productName[language]);
      setMaterials((prev) =>
        prev.map((row) => {
          const matched = preset.materials.find((pm) => pm.id === row.id);
          return matched ? { ...row, name: matched.name[language] } : row;
        })
      );
    }
  }, [language, selectedPresetId]);

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 40);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const calculateRowCost = (row: EditableMaterial): number => {
    if (row.bulkQuantity <= 0) return 0;
    return (row.bulkPrice / row.bulkQuantity) * row.usedQuantity;
  };

  const totalMaterialCost = materials.reduce(
    (sum, item) => sum + calculateRowCost(item),
    0
  );
  const safePackaging = Math.max(0, packagingCost);
  const safeUtility = Math.max(0, utilityLaborCost);
  const totalOverheadCost = safePackaging + safeUtility;
  const totalBatchCost = totalMaterialCost + totalOverheadCost;
  const safeYield = Math.max(1, batchYield);
  const unitCost = totalBatchCost / safeYield;

  const clampedMargin = Math.min(95, Math.max(0, profitMargin));
  const suggestedSellingPrice =
    clampedMargin >= 95 ? unitCost * 20 : unitCost / (1 - clampedMargin / 100);
  const estimatedUnitProfit = suggestedSellingPrice - unitCost;

  const unitMaterial = totalMaterialCost / safeYield;
  const unitPackaging = safePackaging / safeYield;
  const unitUtility = safeUtility / safeYield;

  const volumeScales = [10, 50, 100, 500];

  const handleMaterialChange = (
    id: string,
    field: keyof EditableMaterial,
    value: string | number
  ) => {
    setMaterials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    if (field !== 'name') {
      triggerSuccessFeedback(false);
    }
  };

  const handleAddMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: t.newMaterialName,
        bulkPrice: 5.0,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 100,
      },
    ]);
    triggerSuccessFeedback(false);
  };

  const handleRemoveMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((item) => item.id !== id));
    triggerSuccessFeedback(false);
  };

  const handleExportCsv = () => {
    const escapedProduct = `"${productName.replace(/"/g, '""')}"`;
    const rows = [
      `${t.title},${escapedProduct}`,
      `${t.batchYieldLabel},${safeYield}`,
      '',
      `${t.colName},${t.colBulkPrice},${t.colBulkQty},${t.colUnit},${t.colUsedQty},${t.colCost}`,
      ...materials.map(
        (m) =>
          `"${m.name.replace(/"/g, '""')}",${m.bulkPrice.toFixed(2)},${m.bulkQuantity},${m.unit},${m.usedQuantity},${calculateRowCost(m).toFixed(2)}`
      ),
      '',
      `${t.packagingLabel},${safePackaging.toFixed(2)}`,
      `${t.utilityLabel},${safeUtility.toFixed(2)}`,
      `${t.totalBatchCost} (RM),${totalBatchCost.toFixed(2)}`,
      `${t.unitCost} (RM),${unitCost.toFixed(2)}`,
      `${t.marginLabel},${clampedMargin}%`,
      `${t.sellingPrice} (RM),${suggestedSellingPrice.toFixed(2)}`,
      `${t.unitProfit} (RM),${estimatedUnitProfit.toFixed(2)}`,
    ];

    const blob = new Blob(['\uFEFF' + rows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeFilename = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    link.setAttribute('download', `smartcost-${safeFilename || 'report'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#061830]/75 p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="simulator-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl rounded-[10px] border border-slate-200 bg-white shadow-xl my-auto max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1B3354] px-6 py-4 bg-[#061830] text-white rounded-t-[10px] shrink-0">
              <div>
                <h2 id="simulator-title" className="text-lg font-semibold">
                  {t.title}
                </h2>
                <p className="text-xs text-slate-300">{t.subtitle}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t.closeAria}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-300 hover:bg-[#0C2342] hover:text-white transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-7">
              {/* Industry Template Selector */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
                <span className="text-xs font-medium text-slate-600">
                  {t.presetsLabel}
                </span>
                <div className="flex flex-wrap gap-1.5 rounded-md bg-[#F4F7FA] p-1 border border-slate-200">
                  {RECIPE_PRESETS.map((preset) => {
                    const active = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`rounded-[4px] px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-white text-[#061830] shadow-xs font-semibold'
                            : 'text-slate-600 hover:text-[#0F172A]'
                        }`}
                      >
                        {preset.label[language]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Info Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="sim-product-name"
                    className="block text-xs font-medium text-[#0F172A]"
                  >
                    {t.productNameLabel}
                  </label>
                  <input
                    id="sim-product-name"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="mt-1.5 min-h-[42px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#0F172A] focus:border-[#061830] focus:outline-none focus:ring-1 focus:ring-[#061830]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sim-batch-yield"
                    className="block text-xs font-medium text-[#0F172A]"
                  >
                    {t.batchYieldLabel}
                  </label>
                  <input
                    id="sim-batch-yield"
                    type="number"
                    min={1}
                    value={batchYield}
                    onChange={(e) => {
                      setBatchYield(Math.max(1, Number(e.target.value) || 1));
                      triggerSuccessFeedback(false);
                    }}
                    className="mt-1.5 min-h-[42px] w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none focus:ring-1 focus:ring-[#061830]"
                  />
                </div>
              </div>

              {/* Raw Materials Table */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {t.materialsHeading}
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:bg-[#F4F7FA] transition-colors duration-150 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    <span>{t.addMaterial}</span>
                  </button>
                </div>

                <div className="mt-3 overflow-x-auto rounded-md border border-slate-200">
                  <table className="w-full min-w-[660px] border-collapse text-left text-xs">
                    <thead className="bg-[#F4F7FA] text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">{t.colName}</th>
                        <th className="px-3 py-2.5 font-medium">{t.colBulkPrice}</th>
                        <th className="px-3 py-2.5 font-medium">{t.colBulkQty}</th>
                        <th className="px-3 py-2.5 font-medium">{t.colUnit}</th>
                        <th className="px-3 py-2.5 font-medium">{t.colUsedQty}</th>
                        <th className="px-3 py-2.5 font-medium text-right">{t.colCost}</th>
                        <th className="px-2 py-2.5 text-center font-medium">{t.colAction}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {materials.map((row) => (
                        <tr key={row.id}>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              aria-label={t.colName}
                              value={row.name}
                              onChange={(e) =>
                                handleMaterialChange(row.id, 'name', e.target.value)
                              }
                              className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs text-[#0F172A] focus:border-[#061830] focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min={0}
                              step="0.10"
                              aria-label={t.colBulkPrice}
                              value={row.bulkPrice}
                              onChange={(e) =>
                                handleMaterialChange(
                                  row.id,
                                  'bulkPrice',
                                  Math.max(0, Number(e.target.value) || 0)
                                )
                              }
                              className="w-24 rounded border border-slate-200 px-2 py-1.5 font-mono text-xs text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min={1}
                              aria-label={t.colBulkQty}
                              value={row.bulkQuantity}
                              onChange={(e) =>
                                handleMaterialChange(
                                  row.id,
                                  'bulkQuantity',
                                  Math.max(1, Number(e.target.value) || 1)
                                )
                              }
                              className="w-24 rounded border border-slate-200 px-2 py-1.5 font-mono text-xs text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <select
                              aria-label={t.colUnit}
                              value={row.unit}
                              onChange={(e) =>
                                handleMaterialChange(
                                  row.id,
                                  'unit',
                                  e.target.value as EditableMaterial['unit']
                                )
                              }
                              className="rounded border border-slate-200 bg-white px-2 py-1.5 text-xs text-[#0F172A] focus:border-[#061830] focus:outline-none"
                            >
                              <option value="g">g</option>
                              <option value="ml">ml</option>
                              <option value="unit">{t.unitSuffix}</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min={0}
                              aria-label={t.colUsedQty}
                              value={row.usedQuantity}
                              onChange={(e) =>
                                handleMaterialChange(
                                  row.id,
                                  'usedQuantity',
                                  Math.max(0, Number(e.target.value) || 0)
                                )
                              }
                              className="w-24 rounded border border-slate-200 px-2 py-1.5 font-mono text-xs text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-semibold text-[#0F172A] tabular-nums">
                            {calculateRowCost(row).toFixed(2)}
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveMaterial(row.id)}
                              disabled={materials.length <= 1}
                              aria-label={`${t.colAction} ${row.name}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Overhead & Margin */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-end">
                <div>
                  <label
                    htmlFor="sim-packaging"
                    className="block text-xs font-medium text-[#0F172A]"
                  >
                    {t.packagingLabel}
                  </label>
                  <input
                    id="sim-packaging"
                    type="number"
                    min={0}
                    step="0.50"
                    value={packagingCost}
                    onChange={(e) => {
                      setPackagingCost(Math.max(0, Number(e.target.value) || 0));
                      triggerSuccessFeedback(false);
                    }}
                    className="mt-1.5 min-h-[42px] w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-utility"
                    className="block text-xs font-medium text-[#0F172A]"
                  >
                    {t.utilityLabel}
                  </label>
                  <input
                    id="sim-utility"
                    type="number"
                    min={0}
                    step="0.50"
                    value={utilityLaborCost}
                    onChange={(e) => {
                      setUtilityLaborCost(Math.max(0, Number(e.target.value) || 0));
                      triggerSuccessFeedback(false);
                    }}
                    className="mt-1.5 min-h-[42px] w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-margin"
                    className="block text-xs font-medium text-[#0F172A]"
                  >
                    {t.marginLabel}
                  </label>
                  <input
                    id="sim-margin"
                    type="number"
                    min={0}
                    max={95}
                    value={profitMargin}
                    onChange={(e) => {
                      setProfitMargin(
                        Math.min(95, Math.max(0, Number(e.target.value) || 0))
                      );
                      triggerSuccessFeedback(false);
                    }}
                    className="mt-1.5 min-h-[42px] w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm text-[#0F172A] tabular-nums focus:border-[#061830] focus:outline-none"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => triggerSuccessFeedback(true)}
                    className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-md bg-[#1E40AF] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#061830] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                  >
                    <Calculator className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    <span>{t.calculateBtn}</span>
                  </button>
                </div>
              </div>

              {/* Calculation Results Summary Bar with Subtle Framer Motion Success Animation */}
              <div ref={summarySectionRef} className="space-y-3">
                <AnimatePresence>
                  {showSuccessNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      role="status"
                      className="flex items-center gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-900"
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-700 shrink-0"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span>{t.calcSuccessMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  key={`summary-${calcTick}`}
                  initial={{ opacity: 0.94 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-lg bg-[#061830] p-6 text-white"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 items-center">
                    <div>
                      <p className="text-xs text-slate-300">{t.totalBatchCost}</p>
                      <motion.p
                        key={`batch-${totalBatchCost.toFixed(2)}`}
                        initial={{ opacity: 0.6, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-1 font-mono text-lg font-semibold tabular-nums"
                      >
                        RM {totalBatchCost.toFixed(2)}
                      </motion.p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300">
                        {t.unitCost} ({safeYield} {t.unitSuffix})
                      </p>
                      <motion.p
                        key={`unit-${unitCost.toFixed(2)}`}
                        initial={{ opacity: 0.6, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-1 font-mono text-lg font-semibold tabular-nums"
                      >
                        RM {unitCost.toFixed(2)}
                      </motion.p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300">{t.unitProfit}</p>
                      <motion.p
                        key={`profit-${estimatedUnitProfit.toFixed(2)}`}
                        initial={{ opacity: 0.6, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-1 font-mono text-lg font-semibold text-emerald-300 tabular-nums"
                      >
                        RM {estimatedUnitProfit.toFixed(2)}
                      </motion.p>
                    </div>
                    <motion.div
                      key={`price-card-${calcTick}`}
                      initial={{ scale: 0.99 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-md border p-3.5 sm:p-4 transition-colors duration-150 ${
                        showSuccessNotice
                          ? 'border-emerald-400/70 bg-[#0C2342]'
                          : 'border-[#1B3354] bg-[#0C2342]'
                      }`}
                    >
                      <p className="text-xs text-slate-300">{t.sellingPrice}</p>
                      <motion.p
                        key={`price-${suggestedSellingPrice.toFixed(2)}`}
                        initial={{ opacity: 0.6, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-1 font-mono text-2xl font-semibold text-white tabular-nums"
                      >
                        RM {suggestedSellingPrice.toFixed(2)}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Analytics & Scale Projection Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <CostBreakdownChart
                    title={t.chartTitle}
                    totalPrice={suggestedSellingPrice}
                    centerUnitLabel={t.chartCenterUnit}
                    segments={[
                      {
                        id: 'mat',
                        label: t.legendMaterials,
                        amount: unitMaterial,
                        color: '#061830',
                      },
                      {
                        id: 'pkg',
                        label: t.legendPackaging,
                        amount: unitPackaging,
                        color: '#1E40AF',
                      },
                      {
                        id: 'util',
                        label: t.legendUtility,
                        amount: unitUtility,
                        color: '#64748B',
                      },
                      {
                        id: 'prof',
                        label: t.legendProfit,
                        amount: estimatedUnitProfit,
                        color: '#059669',
                      },
                    ]}
                  />
                </div>

                {/* Profit Scale Projection Table */}
                <div className="lg:col-span-6 rounded-lg border border-slate-200 bg-white p-5">
                  <h4 className="text-xs font-medium text-slate-600">
                    {t.projectionTitle}
                  </h4>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead className="border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="py-2 font-medium">{t.projUnits}</th>
                          <th className="py-2 font-medium text-right">{t.projRevenue}</th>
                          <th className="py-2 font-medium text-right">{t.projCost}</th>
                          <th className="py-2 font-medium text-right">{t.projProfit}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                        {volumeScales.map((qty) => {
                          const rev = suggestedSellingPrice * qty;
                          const cost = unitCost * qty;
                          const profit = estimatedUnitProfit * qty;
                          return (
                            <tr key={qty}>
                              <td className="py-2.5 font-semibold text-[#0F172A]">
                                {qty} {t.unitSuffix}
                              </td>
                              <td className="py-2.5 text-right text-slate-700">
                                RM {rev.toFixed(2)}
                              </td>
                              <td className="py-2.5 text-right text-slate-500">
                                RM {cost.toFixed(2)}
                              </td>
                              <td className="py-2.5 text-right font-semibold text-emerald-700">
                                RM {profit.toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#F4F7FA] px-6 py-4 rounded-b-[10px] shrink-0 no-print">
              <button
                type="button"
                onClick={() => {
                  const current =
                    RECIPE_PRESETS.find((p) => p.id === selectedPresetId) ??
                    RECIPE_PRESETS[0];
                  applyPreset(current);
                }}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                <span>{t.resetBtn}</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-[#0F172A] hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  <span>{t.printBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-[#061830] px-4 py-2 text-xs font-medium text-white hover:bg-[#1E40AF] transition-colors duration-150 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  <span>{t.exportBtn}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
