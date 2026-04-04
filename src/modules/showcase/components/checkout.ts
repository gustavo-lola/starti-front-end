import { formatCurrency } from "@/lib/showcase-cart";
import { toast } from "react-toastify";

type CheckoutParams = {
    totalItems: number;
    totalValue: number;
    hasItems: boolean;
    onSuccess: () => void;
};

export function simulateCheckout({ totalItems, totalValue, hasItems, onSuccess }: CheckoutParams) {
    if (!hasItems) {
        toast.info("Adicione produtos ao carrinho para simular a compra.");
        return;
    }

    toast.success(`Pedido simulado com ${totalItems} item(ns) no valor de ${formatCurrency(totalValue)}.`);
    onSuccess();
}
