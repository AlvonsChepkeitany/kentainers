import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useSearchStore } from "@/store/searchStore";
import { ChevronDown, Phone, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    label: "Water Tanks",
    path: "/products?cat=water",
    desc: "1,000L – 10,000L HDPE tanks",
  },
  {
    label: "Septic Tanks",
    path: "/products?cat=septic",
    desc: "Underground waste management",
  },
  {
    label: "Agricultural",
    path: "/products?cat=agricultural",
    desc: "Silage & bulk storage",
  },
  {
    label: "Custom Solutions",
    path: "/products",
    desc: "Bespoke large-scale orders",
  },
];

export default function Header() {
  const [_menuOpen, setMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <header
      className="sticky top-0 z-30 glass border-b border-white/20 shadow-subtle"
      data-ocid="header"
    >
      {/* Top info bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Phone size={11} />
          <a
            href="tel:0785152927"
            className="font-body hover:text-secondary transition-colors"
            data-ocid="header.phone_link"
          >
            0785 152927
          </a>
        </div>
        <span className="text-primary-foreground/70 hidden sm:inline">
          Free delivery on orders above Ksh 50,000
        </span>
      </div>

      {/* Main header */}
      <div className="bg-card/95 backdrop-blur-md px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="shrink-0" data-ocid="header.logo_link">
            <Logo size="md" />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search tanks, capacity..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
              aria-label="Search products"
              data-ocid="header.search_input"
            />
          </form>

          {/* Cart */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="relative shrink-0 border-secondary/40"
            onClick={openCart}
            aria-label={`Open cart, ${cartCount} items`}
            data-ocid="header.cart_button"
          >
            <ShoppingCart size={20} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Desktop mega-menu nav */}
        <nav
          className="hidden md:flex max-w-6xl mx-auto mt-2 gap-1 relative"
          aria-label="Product categories"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="relative group"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <Link
                to={cat.path}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-display font-semibold text-foreground hover:text-secondary transition-colors rounded-md hover:bg-muted"
                data-ocid={`header.nav.${cat.label.toLowerCase().replace(/ /g, "_")}`}
              >
                {cat.label}
                <ChevronDown size={12} className="text-muted-foreground" />
              </Link>
              {/* Dropdown */}
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-50">
                <div className="bg-card border border-border rounded-xl shadow-elevated p-4 min-w-52">
                  <p className="font-display font-bold text-primary text-sm mb-1">
                    {cat.label}
                  </p>
                  <p className="text-muted-foreground text-xs mb-3">
                    {cat.desc}
                  </p>
                  <Link
                    to={cat.path}
                    className="text-secondary text-xs font-display font-bold hover:underline"
                  >
                    View all →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/calculator"
            className="ml-auto flex items-center gap-1 px-3 py-1.5 text-sm font-display font-semibold text-secondary hover:text-secondary/80 transition-colors"
            data-ocid="header.nav.calculator"
          >
            Tank Calculator
          </Link>
        </nav>
      </div>

      {/* Mobile search (always visible on mobile) */}
      <div className="md:hidden bg-card/95 px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search tanks, capacity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-secondary/50"
            aria-label="Search products mobile"
            data-ocid="header.search_input_mobile"
          />
        </form>
      </div>
    </header>
  );
}
