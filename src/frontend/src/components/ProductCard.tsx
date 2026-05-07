import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import { ShoppingCart, Tag } from "lucide-react";

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div
      className="bg-card rounded-xl border border-border card-hover cursor-pointer flex flex-col overflow-hidden"
      data-ocid={`product.item.${index}`}
    >
      {/* Image */}
      <div className="relative bg-muted flex items-center justify-center p-4 h-44">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
        <span
          className="badge-savings absolute top-3 left-3"
          data-ocid={`product.savings_badge.${index}`}
        >
          <Tag size={10} className="mr-1" />
          Save {product.savingsPercent}%
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-display font-bold text-foreground text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display font-black text-primary text-lg">
              {formatPrice(product.price)}
            </span>
            <span className="text-muted-foreground text-xs line-through">
              {formatPrice(product.marketValue)}
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] border-secondary text-secondary mt-1"
          >
            {product.capacity.toLocaleString()}L capacity
          </Badge>
        </div>

        <Button
          type="button"
          size="sm"
          className="w-full mt-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-bold gap-2"
          onClick={() => addItem(product)}
          data-ocid={`product.add_button.${index}`}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
