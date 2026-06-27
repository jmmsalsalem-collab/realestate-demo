"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function num(value: string, fallback = 0) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function CalculatorPage() {
  const [price, setPrice] = useState("985000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [taxRate, setTaxRate] = useState("1.1");
  const [insurance, setInsurance] = useState("1800");

  const result = useMemo(() => {
    const purchasePrice = num(price);
    const downPayment = (num(downPct) / 100) * purchasePrice;
    const loanAmount = Math.max(purchasePrice - downPayment, 0);

    const monthlyRate = num(rate) / 100 / 12;
    const n = num(term) * 12;

    // Monthly principal & interest (amortization)
    let principalInterest = 0;
    if (loanAmount > 0 && n > 0) {
      if (monthlyRate === 0) {
        principalInterest = loanAmount / n;
      } else {
        const factor = Math.pow(1 + monthlyRate, n);
        principalInterest = (loanAmount * (monthlyRate * factor)) / (factor - 1);
      }
    }

    const monthlyTax = (num(taxRate) / 100) * purchasePrice / 12;
    const monthlyInsurance = num(insurance) / 12;

    // PMI ~0.5%/yr of loan when down payment < 20%
    const monthlyPmi =
      num(downPct) < 20 && loanAmount > 0 ? (loanAmount * 0.005) / 12 : 0;

    const total =
      principalInterest + monthlyTax + monthlyInsurance + monthlyPmi;

    return {
      loanAmount,
      downPayment,
      principalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      total,
    };
  }, [price, downPct, rate, term, taxRate, insurance]);

  const rows = [
    {
      label: "Principal & Interest",
      value: result.principalInterest,
      color: "hsl(var(--gold-dark))",
    },
    {
      label: "Property Tax",
      value: result.monthlyTax,
      color: "hsl(var(--gold))",
    },
    {
      label: "Home Insurance",
      value: result.monthlyInsurance,
      color: "hsl(var(--charcoal-light))",
    },
    ...(result.monthlyPmi > 0
      ? [
          {
            label: "PMI",
            value: result.monthlyPmi,
            color: "hsl(var(--muted-foreground))",
          },
        ]
      : []),
  ];

  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">
          Plan With Confidence
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal">
          Mortgage Calculator
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Estimate your monthly payment, including principal, interest, taxes,
          and insurance. Figures are estimates for planning only.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Inputs */}
        <Card>
          <CardContent className="space-y-5 p-6">
            <Field
              label="Purchase Price"
              prefix="$"
              value={price}
              onChange={setPrice}
            />
            <Field
              label="Down Payment"
              suffix="%"
              value={downPct}
              onChange={setDownPct}
              hint={`${formatPrice(result.downPayment)} down · ${formatPrice(
                result.loanAmount
              )} financed`}
            />
            <Field
              label="Interest Rate (APR)"
              suffix="%"
              value={rate}
              onChange={setRate}
            />
            <Field
              label="Loan Term"
              suffix="yrs"
              value={term}
              onChange={setTerm}
            />
            <Field
              label="Property Tax Rate"
              suffix="% / yr"
              value={taxRate}
              onChange={setTaxRate}
            />
            <Field
              label="Home Insurance"
              prefix="$"
              suffix="/ yr"
              value={insurance}
              onChange={setInsurance}
            />
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="bg-charcoal text-background">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 text-gold">
              <Calculator className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">
                Estimated Monthly Payment
              </span>
            </div>
            <p className="mt-3 font-serif text-5xl text-white">
              {formatPrice(Math.round(result.total))}
              <span className="ml-2 text-base text-background/60">/ mo</span>
            </p>

            {/* Stacked bar */}
            <div className="mt-8 flex h-3 w-full overflow-hidden rounded-full bg-background/10">
              {rows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    width: `${
                      result.total > 0 ? (row.value / result.total) * 100 : 0
                    }%`,
                    background: row.color,
                  }}
                />
              ))}
            </div>

            <ul className="mt-8 space-y-4">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between border-b border-background/10 pb-3"
                >
                  <span className="flex items-center gap-3 text-sm text-background/80">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ background: row.color }}
                    />
                    {row.label}
                  </span>
                  <span className="font-medium text-white">
                    {formatPrice(Math.round(row.value))}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-background/50">
              Estimates exclude HOA dues and closing costs. PMI is applied
              automatically when the down payment is below 20%. Confirm exact
              figures with your lender.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-2">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${prefix ? "pl-7" : ""} ${suffix ? "pr-16" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-gold-dark">{hint}</p>}
    </div>
  );
}
