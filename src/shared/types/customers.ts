import type { ReactNode } from "react";

export type CustomerStatus = "ativo" | "inativo";

export type CustomerRow = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
    ultimoPedido: string;
    totalGasto: number;
    status: CustomerStatus;
};

export type CustomersSummaryProps = {
    totalCustomers: number;
    activeCustomers: number;
    averageTicket: number;
};

export type FilterSelectProps = {
    value: string;
    onChange: (value: string) => void;
    ariaLabel: string;
    children: ReactNode;
};

export type CustomersFiltersProps = {
    cities: string[];
    cityFilter: string;
    statusFilter: StatusFilter;
    searchTerm: string;
    onCityFilterChange: (value: string) => void;
    onStatusFilterChange: (value: StatusFilter) => void;
    onSearchTermChange: (value: string) => void;
    onResetFilters: () => void;
};

export type CustomersTableProps = {
    customers: CustomerRow[];
    totalFiltered: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
};

export type StatusFilter = "todos" | "ativo" | "inativo";

export const ITEMS_PER_PAGE = 7;
