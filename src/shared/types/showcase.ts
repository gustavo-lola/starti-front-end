import type { ProdutoLinha } from "@/mocks/products-mock";

export type CartState = Record<number, number>;

export type CartItem = ProdutoLinha & {
    quantity: number;
    subtotal: number;
};

export type ProductCardProps = {
    product: ProdutoLinha;
    onOpenProduct: (productId: number) => void;
    onAddToCart: (productId: number) => void;
};

export type CartSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cartItems: CartItem[];
    totalValue: number;
    onViewProduct: (productId: number) => void;
    onAddOne: (productId: number) => void;
    onRemoveOne: (productId: number) => void;
    onClearCart: () => void;
    onCheckout: () => void;
};

export type ProductDetailsSectionProps = {
    product: ProdutoLinha;
    onAddToCart: (productId: number) => void;
    onRemoveFromCart: (productId: number) => void;
};

export type ProductGridProps = {
    products: ProdutoLinha[];
    onOpenProduct: (productId: number) => void;
    onAddToCart: (productId: number) => void;
};

export type ShowcaseFiltersProps = {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
    categories: string[];
};

export type ShowcaseHeaderProps = {
    totalItems: number;
    totalValue: number;
    onOpenCart: () => void;
};
