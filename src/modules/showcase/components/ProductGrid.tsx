import type { ProductGridProps } from "@/shared/types/showcase";

import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, onOpenProduct, onAddToCart }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center">
                <p className="text-sm text-muted-foreground">Nenhum produto encontrado para os filtros informados.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onOpenProduct={onOpenProduct}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}
