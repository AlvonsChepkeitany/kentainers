import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Droplets,
  MessageCircle,
  Settings,
  Shield,
  Sprout,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Fast delivery to all 47 counties across Kenya.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    desc: "Kenya Bureau of Standards certified food-grade HDPE.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Get expert advice instantly via WhatsApp.",
  },
];

const CATEGORIES = [
  {
    id: "water",
    label: "Water Tanks",
    icon: Droplets,
    image: "/assets/generated/water-tank-vertical.dim_600x600.png",
    desc: "1,000L – 10,000L vertical HDPE tanks for home & industry.",
  },
  {
    id: "septic",
    label: "Septic Tanks",
    icon: Settings,
    image: "/assets/generated/septic-tank.dim_600x600.png",
    desc: "Underground septic systems from 2,000L to 10,000L.",
  },
  {
    id: "agricultural",
    label: "Agricultural",
    icon: Sprout,
    image: "/assets/generated/silage-container.dim_600x600.png",
    desc: "Heavy-duty silage bunkers and storage silos.",
  },
  {
    id: "all",
    label: "Custom Solutions",
    icon: Settings,
    image: "/assets/generated/water-tank-vertical.dim_600x600.png",
    desc: "Bespoke tank configurations for specialist requirements.",
  },
];

const USAGE_LEVELS: Record<"Low" | "Medium" | "High", number> = {
  Low: 50,
  Medium: 100,
  High: 150,
};

function getRecommendation(
  people: number,
  usage: "Low" | "Medium" | "High",
): { litres: number; product: Product | null } {
  const dailyPP = USAGE_LEVELS[usage];
  const needed = Math.ceil(people * dailyPP * 30);
  const sorted = PRODUCTS.filter((p) => p.category === "water").sort(
    (a, b) => a.capacity - b.capacity,
  );
  const product =
    sorted.find((p) => p.capacity >= needed) ?? sorted[sorted.length - 1];
  return { litres: needed, product: product ?? null };
}

const WA_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.522 5.845L.057 23.885a.5.5 0 00.606.606l5.968-1.471A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 01-5.028-1.386l-.36-.214-3.73.919.95-3.677-.234-.375A9.814 9.814 0 012.182 12C2.182 6.562 6.562 2.182 12 2.182c5.437 0 9.818 4.38 9.818 9.818 0 5.437-4.381 9.818-9.818 9.818z" />
  </svg>
);

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.category === "water").slice(0, 6);
  const addItem = useCartStore((s) => s.addItem);

  // Calculator state
  const [people, setPeople] = useState(4);
  const [usage, setUsage] = useState<"Low" | "Medium" | "High">("Medium");
  const [calcResult, setCalcResult] = useState<{
    litres: number;
    product: Product | null;
  } | null>(null);

  function handleCalc(e: React.FormEvent) {
    e.preventDefault();
    setCalcResult(getRecommendation(people, usage));
  }

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="bg-primary text-primary-foreground relative overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Industrial diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(247,148,29,0.4) 20px, rgba(247,148,29,0.4) 21px)",
          }}
        />
        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />

        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-secondary/20 border border-secondary/50 text-secondary text-xs font-display font-bold px-3 py-1 rounded-full mb-4">
              🇰🇪 Kenya's #1 Tank Supplier
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl leading-tight mb-4">
              Premium Tanks,
              <br />
              <span className="text-secondary">Unbeatable Prices.</span>
            </h1>
            <p className="font-body text-primary-foreground/80 text-base md:text-lg mb-8 max-w-md">
              Water tanks, septic systems &amp; agricultural containers.
              Delivered across Kenya — save up to 20% vs. market price.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white font-display font-black gap-2 px-6 py-6 text-base"
                data-ocid="home.shop_now_button"
              >
                <Link to="/products?cat=water">
                  Shop Water Tanks <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/30 text-primary-foreground hover:bg-white/10 font-display font-bold gap-2 px-6 py-6"
                data-ocid="home.calculator_button"
              >
                <Link to="/calculator">
                  <Calculator size={16} /> Tank Calculator
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                "Free Delivery on 5,000L+",
                "KEBS Certified",
                "5-Year Warranty",
              ].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1 text-primary-foreground/70 text-xs font-body"
                >
                  <CheckCircle size={12} className="text-secondary" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Hero product images */}
          <div className="hidden md:flex justify-center items-end gap-6">
            <img
              src="/assets/generated/water-tank-vertical.dim_600x600.png"
              alt="Vertical water tank"
              className="h-72 w-auto object-contain drop-shadow-2xl"
            />
            <img
              src="/assets/generated/septic-tank.dim_600x600.png"
              alt="Horizontal septic tank"
              className="h-48 w-auto object-contain drop-shadow-xl mb-4"
            />
          </div>
        </div>
      </section>

      {/* ── Value Props strip ── */}
      <section
        className="bg-muted/40 border-y border-border"
        data-ocid="home.value_props_section"
      >
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-secondary" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm">
                  {title}
                </p>
                <p className="font-body text-muted-foreground text-xs leading-relaxed mt-0.5">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section
        className="bg-background py-12 px-4"
        data-ocid="home.featured_products_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="font-display font-black text-primary text-2xl">
                Best-Selling Water Tanks
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Top-rated sizes for home, farm &amp; business
              </p>
            </div>
            <Link
              to="/products?cat=water"
              className="text-secondary font-display font-bold text-sm hover:underline flex items-center gap-1"
              data-ocid="home.view_all_link"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Capacity Calculator ── */}
      <section
        className="bg-muted/30 border-y border-border py-12 px-4"
        data-ocid="home.calculator_section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <Calculator size={24} className="text-secondary" />
            </div>
            <h2 className="font-display font-black text-primary text-2xl">
              Capacity Calculator
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-2">
              Tell us your household size &amp; usage — we'll find the right
              tank.
            </p>
          </div>

          <form
            onSubmit={handleCalc}
            className="bg-card border border-border rounded-2xl p-6 shadow-subtle space-y-6"
          >
            {/* Household size */}
            <div className="space-y-2">
              <label
                htmlFor="calc-people"
                className="font-display font-bold text-foreground text-sm flex items-center gap-2"
              >
                <Droplets size={15} className="text-secondary" />
                Household / Facility Size
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="calc-people"
                  type="range"
                  min={1}
                  max={50}
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="flex-1 accent-orange-500"
                  data-ocid="home.calculator.people_input"
                />
                <span className="font-display font-black text-primary text-xl w-14 text-center tabular-nums">
                  {people}
                  <span className="text-xs font-body font-normal text-muted-foreground ml-1">
                    ppl
                  </span>
                </span>
              </div>
            </div>

            {/* Usage level */}
            <div className="space-y-2">
              <p className="font-display font-bold text-foreground text-sm">
                Daily Usage Level
              </p>
              <fieldset className="flex gap-3 border-0 p-0 m-0">
                {(["Low", "Medium", "High"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setUsage(lvl)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-display font-bold transition-smooth ${
                      usage === lvl
                        ? "bg-secondary text-white border-secondary"
                        : "border-border text-muted-foreground hover:border-secondary/50"
                    }`}
                    data-ocid={`home.calculator.usage_${lvl.toLowerCase()}`}
                  >
                    {lvl}
                  </button>
                ))}
              </fieldset>
              <p className="text-muted-foreground text-xs">
                Low = 50L/person/day · Medium = 100L · High = 150L
                (livestock/irrigation)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-black py-6 gap-2"
              data-ocid="home.calculator.submit_button"
            >
              <Calculator size={18} />
              Get Recommendation
            </Button>
          </form>

          {/* Calculator Result */}
          {calcResult && (
            <div
              className="mt-5 bg-card border border-secondary/30 rounded-2xl p-5 shadow-elevated"
              data-ocid="home.calculator.result_panel"
            >
              <div className="flex items-start gap-4">
                {calcResult.product && (
                  <img
                    src={calcResult.product.image}
                    alt={calcResult.product.name}
                    className="w-20 h-20 object-contain bg-muted rounded-xl shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground text-xs font-body">
                    Minimum recommended capacity
                  </p>
                  <p className="font-display font-black text-primary text-2xl">
                    {calcResult.litres.toLocaleString()}L
                  </p>
                  {calcResult.product && (
                    <>
                      <p className="font-display font-bold text-foreground text-sm mt-1 leading-tight">
                        {calcResult.product.name}
                      </p>
                      <p className="font-display font-black text-secondary text-lg mt-0.5">
                        {formatPrice(calcResult.product.price)}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-secondary hover:bg-secondary/90 text-white font-display font-bold gap-1"
                          onClick={() =>
                            calcResult.product && addItem(calcResult.product)
                          }
                          data-ocid="home.calculator.add_to_cart_button"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="font-display font-bold gap-1"
                          data-ocid="home.calculator.view_products_link"
                        >
                          <Link to="/products?cat=water">
                            View All <ArrowRight size={12} />
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Category Browse ── */}
      <section
        className="bg-background py-12 px-4"
        data-ocid="home.categories_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display font-black text-primary text-2xl">
              Browse by Category
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Find the right storage solution for every application
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/products?cat=${cat.id}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden card-hover flex flex-col"
                data-ocid={`home.category.item.${i + 1}`}
              >
                <div className="bg-primary/5 flex items-center justify-center h-36 p-4">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-full object-contain transition-smooth group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1">
                  <p className="font-display font-black text-primary text-sm leading-tight">
                    {cat.label}
                  </p>
                  <p className="font-body text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <span className="inline-flex items-center gap-1 text-secondary text-xs font-display font-bold group-hover:gap-2 transition-smooth">
                    Shop now <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA Banner ── */}
      <section
        className="py-10 px-4"
        style={{ backgroundColor: "#25D366" }}
        data-ocid="home.whatsapp_cta_section"
      >
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-black text-white text-2xl md:text-3xl">
              Need Expert Advice?
            </h2>
            <p className="text-white/85 font-body text-sm mt-1">
              Chat directly with our team. Bulk pricing, delivery quotes &amp;
              custom orders.
            </p>
            <p className="text-white font-display font-bold text-base mt-1">
              📞 0785 152 927
            </p>
          </div>
          <a
            href="https://wa.me/254785152927?text=Greetings%20Kentainers%20Team%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#25D366] font-display font-black px-7 py-4 rounded-full shadow-elevated hover:scale-105 transition-smooth text-sm shrink-0"
            data-ocid="home.whatsapp_cta_button"
          >
            {WA_ICON}
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
