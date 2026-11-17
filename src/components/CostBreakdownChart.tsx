import { useState } from 'react';
import { motion } from 'motion/react';

export interface ChartSegment {
  id: string;
  label: string;
  amount: number;
  color: string;
}

interface CostBreakdownChartProps {
  title: string;
  totalPrice: number;
  segments: ChartSegment[];
  centerUnitLabel?: string;
  darkTheme?: boolean;
}

export default function CostBreakdownChart({
  title,
  totalPrice,
  segments,
  centerUnitLabel = 'RM / unit',
  darkTheme = false,
}: CostBreakdownChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const safeTotal = totalPrice > 0 ? totalPrice : 1;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  let cumulativeFraction = 0;
  const computedSegments = segments.map((seg) => {
    const fraction = Math.max(0, seg.amount) / safeTotal;
    const dashLength = fraction * circumference;
    const dashOffset = -cumulativeFraction * circumference;
    cumulativeFraction += fraction;
    return {
      ...seg,
      fraction,
      percent: (fraction * 100).toFixed(1),
      dashLength,
      dashOffset,
    };
  });

  const activeSegment = computedSegments.find((s) => s.id === hoveredId) ?? null;

  return (
    <div
      className={`rounded-lg border p-5 ${
        darkTheme
          ? 'border-[#1B3354] bg-[#0C2342] text-white'
          : 'border-slate-200 bg-[#F4F7FA] text-[#0F172A]'
      }`}
    >
      <p
        className={`text-xs font-medium tracking-[0.02em] ${
          darkTheme ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {title}
      </p>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        {/* SVG Animated Donut */}
        <div className="relative h-36 w-36 shrink-0">
          <svg
            viewBox="0 0 140 140"
            className="h-full w-full -rotate-90"
            role="img"
            aria-label={title}
          >
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={darkTheme ? '#1B3354' : '#E2E8F0'}
              strokeWidth="15"
            />
            {computedSegments.map((seg) => {
              const isHovered = hoveredId === seg.id;
              return (
                <motion.circle
                  key={seg.id}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? 18 : 15}
                  strokeLinecap="butt"
                  initial={false}
                  animate={{
                    strokeDasharray: `${seg.dashLength} ${circumference}`,
                    strokeDashoffset: seg.dashOffset,
                    opacity: hoveredId && !isHovered ? 0.55 : 1,
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Center Readout */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-2">
            <span
              className={`text-[11px] font-medium truncate max-w-[92px] ${
                darkTheme ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {activeSegment ? activeSegment.label : centerUnitLabel}
            </span>
            <span
              className={`mt-0.5 font-mono text-sm font-semibold tabular-nums ${
                darkTheme ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              RM {(activeSegment ? activeSegment.amount : totalPrice).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Interactive Legend */}
        <div className="w-full flex-1 space-y-2">
          {computedSegments.map((seg) => {
            const isHovered = hoveredId === seg.id;
            return (
              <div
                key={seg.id}
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors duration-150 cursor-default ${
                  isHovered
                    ? darkTheme
                      ? 'bg-[#061830]'
                      : 'bg-white'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: seg.color }}
                    aria-hidden="true"
                  />
                  <span
                    className={`truncate font-medium ${
                      darkTheme ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {seg.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 font-mono tabular-nums">
                  <span className={darkTheme ? 'text-slate-400' : 'text-slate-500'}>
                    {seg.percent}%
                  </span>
                  <span
                    className={`font-semibold w-16 text-right ${
                      darkTheme ? 'text-white' : 'text-[#0F172A]'
                    }`}
                  >
                    RM {seg.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
