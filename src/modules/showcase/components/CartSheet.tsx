import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/animate-ui/components/radix/sheet";
import { formatCurrency } from "@/lib/showcase-cart";
import type { CartSheetProps } from "@/shared/types/showcase";

export function CartSheet({
    open,
    onOpenChange,
    cartItems,
    totalValue,
    onViewProduct,
    onAddOne,
    onRemoveOne,
    onClearCart,
    onCheckout,
}: CartSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full rounded-xl max-w-md border-l border-border">
                <SheetHeader className="border-b border-border pb-3">
                    <SheetTitle>Carrinho</SheetTitle>
                    <SheetDescription>Revise os itens e simule o checkout.</SheetDescription>
                </SheetHeader>

                <div className="flex h-full flex-col p-4">
                    {cartItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Nenhum produto no carrinho.</p>
                    ) : (
                        <div className="space-y-3 overflow-auto pr-1">
                            {cartItems.map((item) => (
                                <article key={item.id} className="rounded-lg border border-border bg-card p-3">
                                    <div className="flex gap-3">
                                        <img
                                            src={item.imagem}
                                            alt={item.nome}
                                            className="h-16 w-16 rounded-md object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-foreground">
                                                {item.nome}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{item.preco}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Subtotal: {formatCurrency(item.subtotal)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onViewProduct(item.id)}
                                            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:cursor-pointer"
                                        >
                                            Ver produto
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onRemoveOne(item.id)}
                                                className="hover:cursor-pointer hover:opacity-90 rounded border border-border px-2 py-1 text-xs"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-medium">{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => onAddOne(item.id)}
                                                className="hover:cursor-pointer hover:opacity-90 rounded border border-border px-2 py-1 text-xs"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="mt-auto border-t border-border pt-3">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(totalValue)}</p>

                        <div className="mt-3 flex gap-2">
                            <button
                                type="button"
                                onClick={onClearCart}
                                className="flex-1 hover:opacity-80 rounded-md border border-border px-3 py-2 text-sm font-medium hover:cursor-pointer"
                            >
                                Limpar
                            </button>
                            <button
                                type="button"
                                onClick={onCheckout}
                                className="flex-1 hover:opacity-90 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:cursor-pointer"
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
