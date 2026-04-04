import { useEffect, useMemo, useState } from "react";
import type { ProdutoLinha } from "@/shared/mocks/products-mock";
import type { CartItem, CartState } from "@/types/showcase";

export type { CartItem, CartState };

const CART_STORAGE_KEY = "starti:showcase-cart";

function isBrowser() {
    return typeof window !== "undefined";
}

function parsePriceToNumber(price: string) {
    const normalized = price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    return Number(normalized) || 0;
}

function loadCart(): CartState {
    if (!isBrowser()) {
        return {};
    }

    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
        return {};
    }

    try {
        const parsed = JSON.parse(raw) as CartState;
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function saveCart(cart: CartState) {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function useShowcaseCart(products: ProdutoLinha[]) {
    const [cart, setCart] = useState<CartState>(() => loadCart());

    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    const cartItems = useMemo(() => {
        return products
            .filter((product) => (cart[product.id] ?? 0) > 0)
            .map((product) => {
                const quantity = cart[product.id] ?? 0;
                const unitPrice = parsePriceToNumber(product.preco);

                return {
                    ...product,
                    quantity,
                    subtotal: unitPrice * quantity,
                };
            });
    }, [cart, products]) as CartItem[];

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    function addToCart(productId: number) {
        setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
    }

    function removeOneFromCart(productId: number) {
        setCart((prev) => {
            const currentQty = prev[productId] ?? 0;

            if (currentQty <= 1) {
                const { [productId]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [productId]: currentQty - 1 };
        });
    }

    function clearCart() {
        setCart({});
    }

    return {
        cartItems,
        totalItems,
        totalValue,
        addToCart,
        removeOneFromCart,
        clearCart,
    };
}
