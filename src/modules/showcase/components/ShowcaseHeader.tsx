import { CartIcon } from "@/components/ui/cart";
import { formatCurrency } from "@/lib/showcase-cart";
import type { ShowcaseHeaderProps } from "@/shared/types/showcase";

export function ShowcaseHeader({ totalItems, totalValue, onOpenCart }: ShowcaseHeaderProps) {
    return (
        <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">Vitrine</h2>
                <p className="mt-1 text-sm text-muted-foreground">Simulaçao da tela de clientes</p>
            </div>

            <button
                type="button"
                onClick={onOpenCart}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 hover:bg-muted hover:cursor-pointer sm:w-fit"
            >
                <CartIcon size={20} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">{totalItems} item(ns)</span>
                <span className="text-xs text-muted-foreground">{formatCurrency(totalValue)}</span>
            </button>
        </header>
    );
}
