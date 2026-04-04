import { Input } from "@/shared/components/ui/input";
import type { CustomersFiltersProps, FilterSelectProps, StatusFilter } from "@/shared/types/customers";
import { ChevronDown } from "lucide-react";

function FilterSelect({ value, onChange, ariaLabel, children }: FilterSelectProps) {
    return (
        <div className="relative inline-flex w-full sm:w-auto">
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label={ariaLabel}
                className="h-11 w-full appearance-none rounded-full border-2 border-dashed border-border bg-background pl-4 pr-10 text-base text-foreground sm:min-w-40"
            >
                {children}
            </select>
            <ChevronDown
                size={18}
                className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-foreground"
            />
        </div>
    );
}

export function CustomersFilters({
    cities,
    cityFilter,
    statusFilter,
    searchTerm,
    onCityFilterChange,
    onStatusFilterChange,
    onSearchTermChange,
    onResetFilters,
}: CustomersFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <FilterSelect value={cityFilter} onChange={onCityFilterChange} ariaLabel="Filtrar por cidade">
                <option value="todas">Cidade</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </FilterSelect>

            <FilterSelect
                value={statusFilter}
                onChange={(value) => onStatusFilterChange(value as StatusFilter)}
                ariaLabel="Filtrar por status"
            >
                <option value="todos">Status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </FilterSelect>

            <Input
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder="Buscar por nome ou email"
                className="h-11 w-full min-w-0 rounded-full border-2 border-dashed border-border bg-background px-4 text-sm text-foreground sm:flex-1 sm:min-w-72"
            />

            <button
                type="button"
                onClick={onResetFilters}
                className="h-11 w-full rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:cursor-pointer hover:opacity-90 sm:w-auto"
            >
                Ver todos os clientes
            </button>
        </div>
    );
}
