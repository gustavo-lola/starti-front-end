import type { ProductDetailsSectionProps } from "@/shared/types/showcase";

export function ProductDetailsSection({ product, onAddToCart, onRemoveFromCart }: ProductDetailsSectionProps) {
    const isOutOfStock = product.quantidade <= 0;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <img
                    src={product.imagem}
                    alt={product.nome}
                    className="aspect-square h-full w-full object-cover lg:aspect-auto"
                />
            </div>

            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.categoria}</p>
                <h1 className="mt-2 text-3xl font-bold text-foreground">{product.nome}</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.descricao}</p>

                <div className="mt-5 rounded-xl border border-border bg-muted/20 p-4">
                    <p className="text-xs text-muted-foreground">Preco</p>
                    <p className="text-3xl font-bold text-primary">{product.preco}</p>
                    <p className="mt-2 text-xs text-muted-foreground">SKU: {product.codigo}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {isOutOfStock ? "Sem estoque" : `${product.quantidade} em estoque`}
                    </p>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => onRemoveFromCart(product.id)}
                        className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:cursor-pointer"
                    >
                        Remover
                    </button>
                    <button
                        type="button"
                        onClick={() => onAddToCart(product.id)}
                        disabled={isOutOfStock}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer hover:bg-primary/50 transition-colors"
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}
