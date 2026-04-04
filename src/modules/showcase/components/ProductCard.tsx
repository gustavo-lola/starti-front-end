import type { ProductCardProps } from "@/shared/types/showcase";

export function ProductCard({ product, onOpenProduct, onAddToCart }: ProductCardProps) {
    const isOutOfStock = product.quantidade <= 0;

    return (
        <article className="rounded-xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <button
                type="button"
                onClick={() => onOpenProduct(product.id)}
                className="mb-3 block w-full overflow-hidden rounded-lg bg-muted hover:cursor-pointer"
            >
                <img src={product.imagem} alt={product.nome} className="h-36 w-full object-cover" />
            </button>

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
                    onClick={() => onAddToCart(product.id)}
                    disabled={isOutOfStock}
                    className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                >
                    Adicionar
                </button>
            </div>
        </article>
    );
}
