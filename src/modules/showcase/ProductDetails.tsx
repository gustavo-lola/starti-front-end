import { useMemo, useState } from "react";
import { CartIcon } from "@/components/ui/cart";
import { formatCurrency, useShowcaseCart } from "@/lib/showcase-cart";
import { useNavigate, useParams } from "react-router-dom";

import { CartSheet } from "./components/CartSheet";
import { ProductDetailsSection } from "./components/ProductDetailsSection";
import { simulateCheckout } from "./components/checkout";
import { useShowcaseProducts } from "./hooks/useShowcaseProducts";

export default function ProductDetails() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const parsedProductId = Number(productId);

    const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);

    const { products } = useShowcaseProducts("todos", "");
    const product = useMemo(
        () => products.find((item) => item.id === parsedProductId) ?? null,
        [parsedProductId, products]
    );

    const { cartItems, totalItems, totalValue, addToCart, removeOneFromCart, clearCart } = useShowcaseCart(products);

    function handleCheckout() {
        simulateCheckout({
            totalItems,
            totalValue,
            hasItems: cartItems.length > 0,
            onSuccess: clearCart,
        });
    }

    function handleViewProduct(productViewId: number) {
        setIsCartSheetOpen(false);
        navigate(`/vitrine/produto/${productViewId}`);
    }

    if (!product) {
        return (
            <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-bold text-card-foreground sm:text-2xl">Produto nao encontrado</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    O item pode ter sido removido ou o link esta incorreto.
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/vitrine")}
                    className="mt-4 hover:cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground "
                >
                    Voltar para vitrine
                </button>
            </section>
        );
    }

    return (
        <div className="min-w-0">
            <section className="rounded-xl  bg-card p-4 md:p-6">
                <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <button
                        type="button"
                        onClick={() => navigate("/vitrine")}
                        className="w-fit rounded-md hover:cursor-pointer border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Voltar para vitrine
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsCartSheetOpen(true)}
                        className="flex w-fit max-w-full items-center gap-2 rounded-md border border-border bg-background px-4 py-2 hover:bg-muted hover:cursor-pointer"
                    >
                        <CartIcon size={20} className="text-primary" />
                        <span className="text-sm font-semibold text-foreground">{totalItems} item(ns)</span>
                        <span className="text-xs text-muted-foreground">{formatCurrency(totalValue)}</span>
                    </button>
                </header>

                <ProductDetailsSection product={product} onAddToCart={addToCart} onRemoveFromCart={removeOneFromCart} />
            </section>

            <CartSheet
                open={isCartSheetOpen}
                onOpenChange={setIsCartSheetOpen}
                cartItems={cartItems}
                totalValue={totalValue}
                onViewProduct={handleViewProduct}
                onAddOne={addToCart}
                onRemoveOne={removeOneFromCart}
                onClearCart={clearCart}
                onCheckout={handleCheckout}
            />
        </div>
    );
}
