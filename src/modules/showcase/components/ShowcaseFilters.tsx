import { Input } from "@/shared/components/ui/input";
import type { ShowcaseFiltersProps } from "@/shared/types/showcase";

export function ShowcaseFilters({
    searchTerm,
    onSearchTermChange,
    categoryFilter,
    onCategoryFilterChange,
    categories,
}: ShowcaseFiltersProps) {
    return (
        <div className="mb-4 flex flex-wrap items-center gap-3">
            <Input
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder="Buscar produto por nome ou descricao"
                className="h-11 w-full min-w-0 focus-visible:ring-2 rounded-full border-2 border-dashed border-border bg-background px-4 text-sm text-foreground sm:flex-1 sm:min-w-72"
            />

            <select
                value={categoryFilter}
                onChange={(event) => onCategoryFilterChange(event.target.value)}
                className="h-11 w-full rounded-full border-2 border-dashed border-border bg-background px-4 text-sm text-foreground sm:w-auto sm:min-w-40"
            >
                <option value="todos">Todas categorias</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}
