import type { ProductCardProps } from "@/shared/types/showcase";

export function ProductCard({ product, onOpenProduct, onAddToCart }: ProductCardProps) {
    const isOutOfStock = product.quantidade <= 0;

    return (
        <article
            onClick={() => onOpenProduct(product.id)}
            className="group cursor-pointer rounded-xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="mb-3 overflow-hidden rounded-lg">
                <img src={product.imagem} alt={product.nome} className="h-36 w-full object-cover" />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.categoria}</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{product.nome}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.descricao}</p>

            <div className="mt-3 flex items-center justify-between gap-2">
                <div>
                    <p className="text-lg font-bold text-primary">{product.preco}</p>
                    <p className="text-xs text-muted-foreground">
                        {isOutOfStock ? "Sem estoque" : `${product.quantidade} em estoque`}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product.id);
                    }}
                    disabled={isOutOfStock}
                    className="relative z-10 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                >
                    Adicionar
                </button>
            </div>
        </article>
    );
}
