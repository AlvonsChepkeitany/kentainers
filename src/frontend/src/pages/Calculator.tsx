import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import {
  Calculator as CalcIcon,
  ChevronDown,
  Droplets,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const USAGE_OPTIONS = [
  { label: "Low (light use, mainly drinking)", value: 50, key: "low" },
  { label: "Medium (daily household use)", value: 100, key: "medium" },
  { label: "High (heavy use, livestock/garden)", value: 150, key: "high" },
] as const;

type UsageLevel = (typeof USAGE_OPTIONS)[number]["key"];

const WATER_TANKS = PRODUCTS.filter((p) => p.category === "water").sort(
  (a, b) => a.capacity - b.capacity,
);

function getRecommendedTank(neededLiters: number): Product | null {
  return (
    WATER_TANKS.find((p) => p.capacity >= neededLiters) ??
    WATER_TANKS[WATER_TANKS.length - 1] ??
    null
  );
}

export default function Calculator() {
  const [people, setPeople] = useState(4);
  const [usage, setUsage] = useState<UsageLevel>("medium");
  const [result, setResult] = useState<{
    needed: number;
    tank: Product | null;
  } | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const usageValue = USAGE_OPTIONS.find((o) => o.key === usage)?.value ?? 100;

  const handleCalculate = () => {
    const needed = people * usageValue * 30;
    const tank = getRecommendedTank(needed);
    setResult({ needed, tank });
  };

  return (
    <Layout>
      <main className="min-h-screen bg-background" data-ocid="calculator.page">
        {/* Hero bar */}
        <section className="bg-primary py-10 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/20 border border-secondary/40 mb-4">
              <CalcIcon size={28} className="text-secondary" />
            </div>
            <h1 className="font-display font-black text-primary-foreground text-3xl sm:text-4xl leading-tight">
              Tank Capacity Calculator
            </h1>
            <p className="mt-2 text-primary-foreground/70 font-body text-sm sm:text-base">
              Tell us about your household — we'll find the perfect tank size.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-10 px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 sm:p-8 flex flex-col gap-6">
              {/* People input */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="people"
                  className="font-display font-bold text-foreground flex items-center gap-2"
                >
                  <Users size={16} className="text-secondary" />
                  Number of People
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-border bg-muted hover:bg-border font-display font-bold text-foreground text-lg transition-smooth flex items-center justify-center flex-shrink-0"
                    onClick={() => setPeople((p) => Math.max(1, p - 1))}
                    aria-label="Decrease people"
                    data-ocid="calculator.people_decrease"
                  >
                    −
                  </button>
                  <input
                    id="people"
                    type="number"
                    min={1}
                    max={20}
                    value={people}
                    onChange={(e) =>
                      setPeople(
                        Math.min(20, Math.max(1, Number(e.target.value))),
                      )
                    }
                    className="flex-1 text-center font-display font-black text-foreground text-xl border border-input rounded-lg py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    data-ocid="calculator.people_input"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-border bg-muted hover:bg-border font-display font-bold text-foreground text-lg transition-smooth flex items-center justify-center flex-shrink-0"
                    onClick={() => setPeople((p) => Math.min(20, p + 1))}
                    aria-label="Increase people"
                    data-ocid="calculator.people_increase"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter a value between 1 and 20 people.
                </p>
              </div>

              {/* Usage level */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="usage"
                  className="font-display font-bold text-foreground flex items-center gap-2"
                >
                  <Droplets size={16} className="text-secondary" />
                  Daily Usage Level
                </Label>
                <div className="relative">
                  <select
                    id="usage"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value as UsageLevel)}
                    className="w-full appearance-none border border-input rounded-lg px-4 py-3 bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                    data-ocid="calculator.usage_select"
                  >
                    {USAGE_OPTIONS.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label} — {o.value}L/person/day
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimated daily usage per person at selected level:{" "}
                  <span className="font-bold text-foreground">
                    {usageValue}L/day
                  </span>
                </p>
              </div>

              {/* Formula hint */}
              <div className="rounded-xl bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground">
                <span className="font-bold text-foreground">Formula:</span>{" "}
                People \u00d7 Daily Usage \u00d7 30 days = Recommended Capacity
              </div>

              <Button
                type="button"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-black text-base py-6 rounded-xl"
                onClick={handleCalculate}
                data-ocid="calculator.submit_button"
              >
                <CalcIcon size={18} className="mr-2" />
                Calculate My Tank Size
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div
                className="mt-8 bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
                data-ocid="calculator.result_card"
              >
                {/* Result header */}
                <div className="bg-primary px-6 py-4">
                  <p className="font-display font-black text-primary-foreground text-lg">
                    Recommended Tank
                  </p>
                  <p className="text-primary-foreground/70 text-sm mt-0.5">
                    Your household needs at least{" "}
                    <span className="font-bold text-secondary">
                      {result.needed.toLocaleString()}L
                    </span>{" "}
                    per month.
                  </p>
                </div>

                {result.tank ? (
                  <>
                    {/* Product preview */}
                    <div className="flex gap-4 p-6 items-start">
                      <div className="w-24 h-24 rounded-xl bg-muted border border-border flex-shrink-0 overflow-hidden">
                        <img
                          src={result.tank.image}
                          alt={result.tank.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-black text-foreground text-base leading-tight">
                          {result.tank.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {result.tank.description}
                        </p>
                        <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                          <span className="font-display font-black text-primary text-xl">
                            {formatPrice(result.tank.price)}
                          </span>
                          <span className="text-muted-foreground text-xs line-through">
                            {formatPrice(result.tank.marketValue)}
                          </span>
                          <span className="badge-savings text-[10px] px-1.5 py-0.5">
                            Save {result.tank.savingsPercent}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Capacity match */}
                    <div className="px-6 pb-2">
                      <div className="bg-muted/60 rounded-xl px-4 py-3 flex items-center gap-3">
                        <Droplets
                          size={20}
                          className="text-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-display font-bold text-foreground text-sm">
                            {result.tank.capacity.toLocaleString()}L capacity
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Covers {Math.round(result.tank.capacity / people)}
                            L/person/month with this tank.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 p-6 pt-4">
                      <Button
                        type="button"
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold gap-2"
                        onClick={() => result.tank && addItem(result.tank)}
                        data-ocid="calculator.add_to_cart_button"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 font-display font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                      >
                        <Link to="/products" data-ocid="calculator.browse_link">
                          Browse All
                        </Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center text-muted-foreground font-body">
                    No matching tank found. Please{" "}
                    <Link
                      to="/products"
                      className="text-secondary underline font-bold"
                    >
                      contact us
                    </Link>{" "}
                    for a custom solution.
                  </div>
                )}
              </div>
            )}

            {/* Back to home */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-secondary transition-colors font-body underline-offset-4 hover:underline"
                data-ocid="calculator.back_link"
              >
                \u2190 Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
