import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

function CartLineItem({ item, index }: { item: CartItem; index: number }) {
  const { removeItem, updateQuantity } = useCartStore();
  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-3 py-4" data-ocid={`cart.item.${index}`}>
      {/* Product image thumbnail */}
      <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden border border-border">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-contain p-1"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display font-bold text-foreground text-sm leading-tight line-clamp-2">
            {item.product.name}
          </h4>
          <button
            type="button"
            className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors p-0.5 rounded"
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remove ${item.product.name}`}
            data-ocid={`cart.delete_button.${index}`}
          >
            <X size={14} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatPrice(item.product.price)} each
        </p>

        {/* Quantity + line total */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center bg-muted hover:bg-border transition-colors text-foreground"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              data-ocid={`cart.qty_decrease.${index}`}
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-display font-bold text-sm">
              {item.quantity}
            </span>
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center bg-muted hover:bg-border transition-colors text-foreground"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Increase quantity"
              data-ocid={`cart.qty_increase.${index}`}
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="font-display font-black text-primary text-sm">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CartSidebar() {
  const { items, isOpen, closeCart, totalPrice } = useCartStore();
  const total = totalPrice();

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    },
    [isOpen, closeCart],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleWhatsApp = () => {
    const itemLines = items
      .map(
        (i) =>
          `${i.product.name} \u00d7 ${i.quantity} @ ${formatPrice(i.product.price)}`,
      )
      .join(", ");
    const message = `Greetings Kentainers Team, I am interested in: ${itemLines}. Total: ${formatPrice(total)}. Please provide delivery details.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/254785152927?text=${encoded}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 transition-smooth"
          onClick={closeCart}
          onKeyDown={(e) => e.key === "Enter" && closeCart()}
          role="button"
          tabIndex={0}
          aria-label="Close cart"
          data-ocid="cart.backdrop"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed top-0 right-0 h-full w-full max-w-sm z-50",
          "bg-card border-l border-border shadow-elevated",
          "flex flex-col transition-smooth",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-label="Shopping cart"
        data-ocid="cart.sheet"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-primary-foreground" />
            <h2 className="font-display font-black text-primary-foreground text-base">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="bg-secondary text-secondary-foreground font-bold text-xs px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            type="button"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors rounded p-1"
            onClick={closeCart}
            aria-label="Close cart"
            data-ocid="cart.close_button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center"
              data-ocid="cart.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart size={32} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base">
                  Your cart is empty
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Add a tank to get started.
                </p>
              </div>
              <Link
                to="/products"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-display font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-secondary/90 transition-smooth"
                data-ocid="cart.browse_link"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item, idx) => (
                <CartLineItem
                  key={item.product.id}
                  item={item}
                  index={idx + 1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-border bg-muted/40 flex flex-col gap-3">
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-body text-sm">
                Subtotal
              </span>
              <span className="font-display font-black text-foreground text-lg">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Delivery costs confirmed via WhatsApp.
            </p>
            <Button
              type="button"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-black text-base py-6 rounded-xl flex items-center gap-2"
              onClick={handleWhatsApp}
              data-ocid="cart.whatsapp_button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 flex-shrink-0"
                role="img"
                aria-label="WhatsApp"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Confirm Order via WhatsApp
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
