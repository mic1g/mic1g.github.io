import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  LineChart,
  PieChart,
  Plus,
  Trash2,
  Wallet,
} from "lucide-react";

type Inputs = {
  currency: "HKD" | "USD" | "CAD";
  currentAge: number;
  normalRetirementAge: number;
  currentAssets: number;
  monthlyInvestment: number;
  monthlySpend: number;
  withdrawalRate: number;
  inflationRate: number;
  fallbackReturn: number;
};

type PortfolioRow = {
  id: string;
  name: string;
  yearlyReturn: number;
  allocation: number;
};

type ProjectionPoint = {
  year: number;
  age: number;
  assets: number;
  target: number;
};

const pieColors = ["#0f766e", "#e76f51", "#e9c46a", "#2563eb", "#7c3aed", "#14b8a6", "#f97316"];

const defaultInputs: Inputs = {
  currency: "HKD",
  currentAge: 28,
  normalRetirementAge: 65,
  currentAssets: 50000,
  monthlyInvestment: 3000,
  monthlySpend: 25000,
  withdrawalRate: 4,
  inflationRate: 2.5,
  fallbackReturn: 7,
};

const defaultPortfolio: PortfolioRow[] = [
  { id: "voo", name: "VOO", yearlyReturn: 10, allocation: 50 },
  { id: "bonds", name: "Bond fund", yearlyReturn: 4, allocation: 30 },
  { id: "cash", name: "Cash / deposits", yearlyReturn: 2, allocation: 20 },
];

function formatCurrency(value: number, maximumFractionDigits = 0, currency: Inputs["currency"] = "HKD") {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(value);
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

function projectAssets(startAssets: number, monthlyInvestment: number, yearlyReturn: number, months: number) {
  const monthlyReturn = yearlyReturn / 100 / 12;
  let assets = Math.max(0, startAssets);

  for (let month = 0; month < months; month += 1) {
    assets = assets * (1 + monthlyReturn) + monthlyInvestment;
  }

  return Math.max(0, assets);
}

function neededAssets(monthlySpend: number, withdrawalRate: number, inflationRate: number, monthsFromNow: number) {
  const safeWithdrawalRate = Math.max(withdrawalRate, 0.1) / 100;
  const annualSpend = Math.max(monthlySpend, 0) * 12;
  const inflationMultiplier = Math.pow(1 + inflationRate / 100, monthsFromNow / 12);

  return (annualSpend * inflationMultiplier) / safeWithdrawalRate;
}

function findRetirementMonth(inputs: Inputs, yearlyReturn: number) {
  let assets = Math.max(0, inputs.currentAssets);
  const monthlyReturn = yearlyReturn / 100 / 12;
  const maxMonths = 75 * 12;

  for (let month = 0; month <= maxMonths; month += 1) {
    if (assets >= neededAssets(inputs.monthlySpend, inputs.withdrawalRate, inputs.inflationRate, month)) {
      return month;
    }

    assets = assets * (1 + monthlyReturn) + Math.max(0, inputs.monthlyInvestment);
  }

  return null;
}

function requiredMonthlyInvestment(inputs: Inputs, yearlyReturn: number, targetMonths: number) {
  const target = neededAssets(inputs.monthlySpend, inputs.withdrawalRate, inputs.inflationRate, targetMonths);

  if (projectAssets(inputs.currentAssets, 0, yearlyReturn, targetMonths) >= target) {
    return 0;
  }

  let low = 0;
  let high = 1_000_000;

  if (projectAssets(inputs.currentAssets, high, yearlyReturn, targetMonths) < target) {
    return null;
  }

  for (let step = 0; step < 80; step += 1) {
    const mid = (low + high) / 2;

    if (projectAssets(inputs.currentAssets, mid, yearlyReturn, targetMonths) >= target) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return high;
}

function buildProjection(inputs: Inputs, yearlyReturn: number, horizonYears: number): ProjectionPoint[] {
  return Array.from({ length: horizonYears + 1 }, (_, year) => {
    const months = year * 12;

    return {
      year,
      age: inputs.currentAge + year,
      assets: projectAssets(inputs.currentAssets, inputs.monthlyInvestment, yearlyReturn, months),
      target: neededAssets(inputs.monthlySpend, inputs.withdrawalRate, inputs.inflationRate, months),
    };
  });
}

function FormField({
  label,
  value,
  prefix,
  suffix,
  min,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="mt-2 flex items-center rounded-xl border border-ink/10 bg-white px-3 shadow-sm focus-within:border-brand">
        {prefix ? <span className="text-sm font-semibold text-slate">{prefix}</span> : null}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-semibold text-ink outline-none"
        />
        {suffix ? <span className="text-sm font-semibold text-slate">{suffix}</span> : null}
      </span>
    </label>
  );
}

function MetricCard({
  label,
  value,
  helper,
  tone = "light",
}: {
  label: string;
  value: string;
  helper: string;
  tone?: "light" | "dark";
}) {
  return (
    <article
      className={
        tone === "dark"
          ? "rounded-2xl bg-ink p-5 text-white shadow-panel"
          : "rounded-2xl border border-ink/8 bg-white p-5 shadow-panel"
      }
    >
      <p className={tone === "dark" ? "text-sm font-semibold text-white/70" : "text-sm font-semibold text-slate"}>
        {label}
      </p>
      <p className="mt-2 break-words font-display text-2xl font-semibold tracking-tight lg:text-3xl">{value}</p>
      <p className={tone === "dark" ? "mt-3 text-sm leading-6 text-white/70" : "mt-3 text-sm leading-6 text-slate"}>
        {helper}
      </p>
    </article>
  );
}

function PortfolioPie({ rows }: { rows: PortfolioRow[] }) {
  const visibleRows = rows.filter((row) => row.allocation > 0);
  const total = visibleRows.reduce((sum, row) => sum + row.allocation, 0);
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (total <= 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-mist text-center text-sm font-semibold text-slate">
        Add an allocation to draw the pie chart.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
      <div className="relative mx-auto h-56 w-56">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#e8eef1" strokeWidth="34" />
          {visibleRows.map((row, index) => {
            const segment = (row.allocation / total) * circumference;
            const dashOffset = -offset;
            offset += segment;

            return (
              <circle
                key={row.id}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={pieColors[index % pieColors.length]}
                strokeWidth="34"
                strokeDasharray={`${segment} ${circumference - segment}`}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-semibold text-slate">Allocated</span>
          <span className="font-display text-3xl font-semibold text-ink">{formatNumber(total, 0)}%</span>
        </div>
      </div>
      <div className="space-y-3">
        {visibleRows.map((row, index) => (
          <div key={row.id} className="flex items-center justify-between gap-4 rounded-xl bg-white p-3">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: pieColors[index % pieColors.length] }}
              />
              <div>
                <p className="text-sm font-semibold text-ink">{row.name || "Unnamed product"}</p>
                <p className="text-xs text-slate">{formatNumber(row.yearlyReturn)}% expected yearly return</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-ink">{formatNumber(row.allocation)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectionChart({ points, currency }: { points: ProjectionPoint[]; currency: Inputs["currency"] }) {
  const width = 820;
  const height = 260;
  const padding = 34;
  const maxValue = Math.max(...points.flatMap((point) => [point.assets, point.target]), 1);
  const maxYear = Math.max(points.length - 1, 1);

  const coordinate = (point: ProjectionPoint, key: "assets" | "target") => {
    const x = padding + (point.year / maxYear) * (width - padding * 2);
    const y = height - padding - (point[key] / maxValue) * (height - padding * 2);

    return `${x},${y}`;
  };

  const assetPath = points.map((point) => coordinate(point, "assets")).join(" ");
  const targetPath = points.map((point) => coordinate(point, "target")).join(" ");
  const lastPoint = points[points.length - 1];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white p-4 shadow-panel">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-ink">Projection</p>
          <p className="mt-1 text-sm text-slate">Assets versus inflation-adjusted 4% rule target.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-brand" />
            Portfolio
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-coral" />
            Required
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-auto w-full">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d7e0e4" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d7e0e4" />
        <polyline fill="none" stroke="#e76f51" strokeWidth="4" strokeLinecap="round" points={targetPath} />
        <polyline fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" points={assetPath} />
        <text x={padding} y={height - 8} fill="#425466" fontSize="20">
          Age {formatNumber(points[0].age, 0)}
        </text>
        <text x={width - padding - 110} y={height - 8} fill="#425466" fontSize="20">
          Age {formatNumber(lastPoint.age, 0)}
        </text>
        <text x={padding + 8} y={padding - 10} fill="#425466" fontSize="20">
          {formatCurrency(maxValue, 0, currency)}
        </text>
      </svg>
    </div>
  );
}

function FourRulePage() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [portfolio, setPortfolio] = useState<PortfolioRow[]>(defaultPortfolio);
  const money = (value: number, maximumFractionDigits = 0) =>
    formatCurrency(value, maximumFractionDigits, inputs.currency);

  const portfolioStats = useMemo(() => {
    const allocationTotal = portfolio.reduce((sum, row) => sum + Math.max(0, row.allocation), 0);
    const weightedReturn =
      allocationTotal > 0
        ? portfolio.reduce((sum, row) => sum + Math.max(0, row.allocation) * row.yearlyReturn, 0) / allocationTotal
        : inputs.fallbackReturn;

    return { allocationTotal, weightedReturn };
  }, [inputs.fallbackReturn, portfolio]);

  const result = useMemo(() => {
    const effectiveReturn = portfolioStats.weightedReturn;
    const retirementMonth = findRetirementMonth(inputs, effectiveReturn);
    const retirementYears = retirementMonth === null ? null : retirementMonth / 12;
    const targetNow = neededAssets(inputs.monthlySpend, inputs.withdrawalRate, inputs.inflationRate, 0);
    const normalMonths = Math.max(0, Math.round((inputs.normalRetirementAge - inputs.currentAge) * 12));
    const normalAssets = projectAssets(inputs.currentAssets, inputs.monthlyInvestment, effectiveReturn, normalMonths);
    const normalTarget = neededAssets(inputs.monthlySpend, inputs.withdrawalRate, inputs.inflationRate, normalMonths);
    const normalMonthlySpendToday =
      (normalAssets * (inputs.withdrawalRate / 100)) / 12 / Math.pow(1 + inputs.inflationRate / 100, normalMonths / 12);
    const neededMonthly = requiredMonthlyInvestment(inputs, effectiveReturn, normalMonths);
    const horizonYears = Math.min(
      60,
      Math.max(10, Math.ceil(Math.max(retirementYears ?? 0, normalMonths / 12)) + 5),
    );

    return {
      effectiveReturn,
      retirementMonth,
      retirementYears,
      targetNow,
      normalAssets,
      normalTarget,
      normalMonthlySpendToday,
      neededMonthly,
      projection: buildProjection(inputs, effectiveReturn, horizonYears),
    };
  }, [inputs, portfolioStats.weightedReturn]);

  const retirementAge =
    result.retirementYears === null ? null : inputs.currentAge + result.retirementYears;
  const retirementYear =
    result.retirementYears === null ? null : new Date().getFullYear() + Math.ceil(result.retirementYears);
  const allocationDifference = portfolioStats.allocationTotal - 100;

  const updateInput = (key: Exclude<keyof Inputs, "currency">, value: number) => {
    setInputs((current) => ({ ...current, [key]: Number.isFinite(value) ? value : 0 }));
  };

  const updatePortfolio = (id: string, key: keyof Omit<PortfolioRow, "id">, value: string | number) => {
    setPortfolio((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              [key]: typeof value === "number" ? (Number.isFinite(value) ? value : 0) : value,
            }
          : row,
      ),
    );
  };

  const addPortfolioRow = () => {
    setPortfolio((current) => [
      ...current,
      {
        id: `product-${Date.now()}`,
        name: "New product",
        yearlyReturn: 7,
        allocation: 0,
      },
    ]);
  };

  const removePortfolioRow = (id: string) => {
    setPortfolio((current) => current.filter((row) => row.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7fbfc] text-ink">
      <header className="border-b border-ink/8 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a href="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate transition hover:text-brand">
            <ArrowLeft size={18} />
            Michael Fung
          </a>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
            <span>4% rule</span>
            <span>Retirement planner</span>
            <span>Portfolio model</span>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-18">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-gold">
                <Calculator size={16} />
                Retirement calculator
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                When can you retire using the 4% rule?
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                Enter assets, monthly investing, retirement spending, inflation, and a custom portfolio mix. The
                calculator estimates the first age where projected assets can support the target withdrawal.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                tone="dark"
                label="Estimated retirement age"
                value={retirementAge === null ? "Not reached" : formatNumber(retirementAge, 1)}
                helper={
                  retirementAge === null
                    ? "Projection did not reach the target within 75 years."
                    : `Around ${retirementYear}, based on the current inputs.`
                }
              />
              <MetricCard
                tone="dark"
                label="Money needed today"
                value={money(result.targetNow)}
                helper={`${formatNumber(inputs.withdrawalRate)}% withdrawal rate means about ${formatNumber(
                  100 / Math.max(inputs.withdrawalRate, 0.1),
                  1,
                )}x annual spending.`}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="min-w-0 space-y-6">
            <article className="rounded-2xl border border-ink/8 bg-white p-5 shadow-panel">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-brand/10 p-2 text-brand">
                  <Wallet size={20} />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">Standard inputs</h2>
                  <p className="mt-1 text-sm text-slate">Use today&apos;s money for assets, investing, and spending.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Currency</span>
                  <select
                    value={inputs.currency}
                    onChange={(event) =>
                      setInputs((current) => ({
                        ...current,
                        currency: event.target.value as Inputs["currency"],
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-3 py-3 text-base font-semibold text-ink shadow-sm outline-none focus:border-brand"
                  >
                    <option value="HKD">HKD</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </label>
                <FormField
                  label="Current age"
                  value={inputs.currentAge}
                  min={0}
                  onChange={(value) => updateInput("currentAge", value)}
                />
                <FormField
                  label="Normal retirement age"
                  value={inputs.normalRetirementAge}
                  min={0}
                  onChange={(value) => updateInput("normalRetirementAge", value)}
                />
                <FormField
                  label="Current assets"
                  value={inputs.currentAssets}
                  min={0}
                  prefix="$"
                  onChange={(value) => updateInput("currentAssets", value)}
                />
                <FormField
                  label="Monthly investment"
                  value={inputs.monthlyInvestment}
                  min={0}
                  prefix="$"
                  onChange={(value) => updateInput("monthlyInvestment", value)}
                />
                <FormField
                  label="Retirement spending / month"
                  value={inputs.monthlySpend}
                  min={0}
                  prefix="$"
                  onChange={(value) => updateInput("monthlySpend", value)}
                />
                <FormField
                  label="Withdrawal rate"
                  value={inputs.withdrawalRate}
                  min={0.1}
                  step={0.1}
                  suffix="%"
                  onChange={(value) => updateInput("withdrawalRate", value)}
                />
                <FormField
                  label="Inflation rate"
                  value={inputs.inflationRate}
                  step={0.1}
                  suffix="%"
                  onChange={(value) => updateInput("inflationRate", value)}
                />
                <FormField
                  label="Fallback yearly return"
                  value={inputs.fallbackReturn}
                  step={0.1}
                  suffix="%"
                  onChange={(value) => updateInput("fallbackReturn", value)}
                />
              </div>
            </article>

            <article className="rounded-2xl border border-ink/8 bg-white p-5 shadow-panel">
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-coral/10 p-2 text-coral">
                  <AlertTriangle size={20} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">Important limits</h2>
                  <p className="mt-2 text-sm leading-6 text-slate">
                    This is an educational estimate, not financial advice. It does not model tax, fees, pension income,
                    salary growth, contribution limits, healthcare costs, market crashes, currency risk, or changing
                    spending in retirement.
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="min-w-0 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Expected return"
                value={`${formatNumber(result.effectiveReturn)}%`}
                helper="Weighted by your product allocation."
              />
              <MetricCard
                label={`At age ${formatNumber(inputs.normalRetirementAge, 0)}`}
                value={money(result.normalAssets)}
                helper={
                  result.normalAssets >= result.normalTarget
                    ? "Projected assets clear the target."
                    : `${money(result.normalTarget - result.normalAssets)} short of target.`
                }
              />
              <MetricCard
                label="Target at normal age"
                value={money(result.normalTarget)}
                helper="Adjusted for your inflation assumption."
              />
              <MetricCard
                label="Spend supported"
                value={money(result.normalMonthlySpendToday)}
                helper="Monthly spending in today's dollars at normal age."
              />
            </div>

            <ProjectionChart points={result.projection} currency={inputs.currency} />

            <article className="rounded-2xl border border-ink/8 bg-white p-5 shadow-panel">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl bg-brand/10 p-2 text-brand">
                    <PieChart size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">Custom portfolio</h2>
                    <p className="mt-1 text-sm text-slate">
                      Add products, estimate yearly return, and set percent of total portfolio.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addPortfolioRow}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand"
                >
                  <Plus size={16} />
                  Add product
                </button>
              </div>

              <div className="mt-6">
                <PortfolioPie rows={portfolio} />
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[680px] border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                      <th className="px-3">Product / stock name</th>
                      <th className="px-3">Yearly return rate</th>
                      <th className="px-3">% of total portfolio</th>
                      <th className="px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((row) => (
                      <tr key={row.id} className="rounded-xl bg-mist">
                        <td className="rounded-l-xl px-3 py-3">
                          <input
                            value={row.name}
                            onChange={(event) => updatePortfolio(row.id, "name", event.target.value)}
                            className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-brand"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center rounded-lg bg-white px-2">
                            <input
                              type="number"
                              step={0.1}
                              value={row.yearlyReturn}
                              onChange={(event) =>
                                updatePortfolio(row.id, "yearlyReturn", Number(event.target.value))
                              }
                              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-semibold text-ink outline-none"
                            />
                            <span className="text-xs font-semibold text-slate">%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center rounded-lg bg-white px-2">
                            <input
                              type="number"
                              min={0}
                              step={1}
                              value={row.allocation}
                              onChange={(event) =>
                                updatePortfolio(row.id, "allocation", Number(event.target.value))
                              }
                              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-semibold text-ink outline-none"
                            />
                            <span className="text-xs font-semibold text-slate">%</span>
                          </div>
                        </td>
                        <td className="rounded-r-xl px-3 py-3 text-right">
                          <button
                            type="button"
                            aria-label={`Remove ${row.name}`}
                            onClick={() => removePortfolioRow(row.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-slate transition hover:border-coral hover:text-coral"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-xl bg-mist p-4">
                  <p className="font-semibold text-slate">Allocation total</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">
                    {formatNumber(portfolioStats.allocationTotal)}%
                  </p>
                </div>
                <div className="rounded-xl bg-mist p-4">
                  <p className="font-semibold text-slate">Weighted yearly return</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">
                    {formatNumber(result.effectiveReturn)}%
                  </p>
                </div>
                <div className="rounded-xl bg-mist p-4">
                  <p className="font-semibold text-slate">Needed monthly by normal age</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">
                    {result.neededMonthly === null ? "Very high" : money(result.neededMonthly)}
                  </p>
                </div>
              </div>

              {Math.abs(allocationDifference) > 0.01 ? (
                <div className="mt-4 rounded-xl border border-coral/20 bg-coral/10 p-4 text-sm leading-6 text-slate">
                  Portfolio allocation is {allocationDifference > 0 ? "over" : "under"} 100% by{" "}
                  {formatNumber(Math.abs(allocationDifference))}%. The return and pie chart are normalized to the
                  rows you entered, but a real plan should add up to 100%.
                </div>
              ) : null}
            </article>

            <article className="rounded-2xl border border-ink/8 bg-white p-5 shadow-panel">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-gold/25 p-2 text-ink">
                  <LineChart size={20} />
                </span>
                <h2 className="font-display text-xl font-semibold text-ink">How the estimate works</h2>
              </div>
              <div className="mt-4 grid gap-4 text-sm leading-6 text-slate md:grid-cols-3">
                <p>
                  The 4% rule target is monthly retirement spending multiplied by 12, then divided by the withdrawal
                  rate.
                </p>
                <p>
                  The target grows with inflation each year, while assets compound using the weighted portfolio return
                  and monthly investment.
                </p>
                <p>
                  Retirement is the first month where projected assets are greater than or equal to the required target.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FourRulePage;
