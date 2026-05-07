import { useCartStore } from "@/store/cartStore";
import { Home, LayoutGrid, MessageCircle, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const location = useLocation();
  const { items, openCart } = useCartStore();
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border shadow-elevated flex items-stretch"
      aria-label="Mobile navigation"
      data-ocid="mobile_nav"
    >
      <Link
        to="/"
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 text-[10px] font-display font-bold transition-colors ${
          isActive("/") ? "text-secondary" : "text-muted-foreground"
        }`}
        data-ocid="mobile_nav.home_link"
      >
        <Home size={22} />
        Home
      </Link>

      <Link
        to="/products"
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 text-[10px] font-display font-bold transition-colors ${
          isActive("/products") ? "text-secondary" : "text-muted-foreground"
        }`}
        data-ocid="mobile_nav.categories_link"
      >
        <LayoutGrid size={22} />
        Categories
      </Link>

      <button
        type="button"
        className="flex-1 flex flex-col items-center justify-center py-2 gap-1 text-[10px] font-display font-bold text-muted-foreground relative transition-colors"
        onClick={openCart}
        aria-label={`Open cart, ${cartCount} items`}
        data-ocid="mobile_nav.cart_button"
      >
        <span className="relative">
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </span>
        Cart
      </button>

      <a
        href="https://wa.me/254785152927"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-2 gap-1 text-[10px] font-display font-bold transition-colors"
        style={{ color: "#25D366" }}
        data-ocid="mobile_nav.whatsapp_link"
      >
        <MessageCircle size={22} />
        WhatsApp
      </a>
    </nav>
  );
}
