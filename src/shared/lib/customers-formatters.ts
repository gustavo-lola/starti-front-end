export function normalizeText(text: string) {
    return text
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatDate(isoDate: string) {
    const date = new Date(`${isoDate}T00:00:00`);

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}
