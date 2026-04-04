import { useEffect, useMemo, useState } from "react";
import { listarProdutos } from "@/services/products";
import type { ProdutoLinha } from "@/shared/mocks/products-mock";

function normalizeText(text: string) {
    return text
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function useShowcaseProducts(categoryFilter: string, searchTerm: string) {
    const [products, setProducts] = useState<ProdutoLinha[]>(() => listarProdutos());

    useEffect(() => {
        function handleProductsUpdate() {
            setProducts(listarProdutos());
        }

        window.addEventListener("starti:produtos-atualizados", handleProductsUpdate);
        return () => window.removeEventListener("starti:produtos-atualizados", handleProductsUpdate);
    }, []);

    const categories = useMemo(() => {
        return Array.from(new Set(products.map((product) => product.categoria)));
    }, [products]);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = normalizeText(searchTerm.trim());

        return products.filter((product) => {
            const matchesCategory = categoryFilter === "todos" || product.categoria === categoryFilter;
            const matchesSearch =
                normalizedSearch.length === 0 ||
                normalizeText(product.nome).includes(normalizedSearch) ||
                normalizeText(product.descricao).includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [categoryFilter, products, searchTerm]);

    return {
        products,
        categories,
        filteredProducts,
    };
}
