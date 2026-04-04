import { useState } from "react";
import { useShowcaseCart } from "@/lib/showcase-cart";
import { useNavigate } from "react-router-dom";

import { CartSheet } from "./components/CartSheet";
import { ProductGrid } from "./components/ProductGrid";
import { ShowcaseFilters } from "./components/ShowcaseFilters";
import { ShowcaseHeader } from "./components/ShowcaseHeader";
import { simulateCheckout } from "./components/checkout";
import { useShowcaseProducts } from "./hooks/useShowcaseProducts";

export default function Showcase() {
    const navigate = useNavigate();
    const [categoryFilter, setCategoryFilter] = useState("todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);

    const { products, categories, filteredProducts } = useShowcaseProducts(categoryFilter, searchTerm);

    const { cartItems, totalItems, totalValue, addToCart, removeOneFromCart, clearCart } = useShowcaseCart(products);

    function openProductPage(productId: number) {
        navigate(`/vitrine/produto/${productId}`);
    }

    function openProductFromCart(productId: number) {
        setIsCartSheetOpen(false);
        openProductPage(productId);
    }

    function handleCheckout() {
        simulateCheckout({
            totalItems,
            totalValue,
            hasItems: cartItems.length > 0,
            onSuccess: clearCart,
        });
    }

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-3 flex-1">
                <section className="rounded-xl bg-card p-4">
                    <ShowcaseHeader
                        totalItems={totalItems}
                        totalValue={totalValue}
                        onOpenCart={() => setIsCartSheetOpen(true)}
                    />

                    <ShowcaseFilters
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                        categoryFilter={categoryFilter}
                        onCategoryFilterChange={setCategoryFilter}
                        categories={categories}
                    />

                    <ProductGrid products={filteredProducts} onOpenProduct={openProductPage} onAddToCart={addToCart} />
                </section>
            </div>

            <CartSheet
                open={isCartSheetOpen}
                onOpenChange={setIsCartSheetOpen}
                cartItems={cartItems}
                totalValue={totalValue}
                onViewProduct={openProductFromCart}
                onAddOne={addToCart}
                onRemoveOne={removeOneFromCart}
                onClearCart={clearCart}
                onCheckout={handleCheckout}
            />
        </div>
    );
}
