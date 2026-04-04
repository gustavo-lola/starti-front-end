import { useMemo, useState } from "react";
import { normalizeText } from "@/lib/customers-formatters";
import { mockCustomers } from "@/shared/mocks/customers-mock";
import { ITEMS_PER_PAGE, type CustomerRow, type StatusFilter } from "@/types/customers";

import { CustomersFilters } from "./components/CustomersFilters";
import { CustomersSummary } from "./components/CustomersSummary";
import { CustomersTable } from "./components/CustomersTable";

export default function Clientes() {
    const [customers] = useState<CustomerRow[]>(mockCustomers);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
    const [cityFilter, setCityFilter] = useState("todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const cities = useMemo(() => {
        return Array.from(new Set(customers.map((customer) => customer.cidade)));
    }, [customers]);

    const filteredCustomers = useMemo(() => {
        const normalizedTerm = normalizeText(searchTerm.trim());

        return customers.filter((customer) => {
            const matchesStatus = statusFilter === "todos" || customer.status === statusFilter;
            const matchesCity = cityFilter === "todas" || customer.cidade === cityFilter;
            const matchesSearch =
                normalizedTerm.length === 0 ||
                normalizeText(customer.nome).includes(normalizedTerm) ||
                normalizeText(customer.email).includes(normalizedTerm);

            return matchesStatus && matchesCity && matchesSearch;
        });
    }, [cityFilter, customers, statusFilter, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE));
    const currentSafePage = Math.min(currentPage, totalPages);

    const paginatedCustomers = useMemo(() => {
        const start = (currentSafePage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        return filteredCustomers.slice(start, end);
    }, [filteredCustomers, currentSafePage]);

    const activeCustomers = customers.filter((customer) => customer.status === "ativo").length;
    const averageTicket =
        customers.length > 0 ? customers.reduce((sum, customer) => sum + customer.totalGasto, 0) / customers.length : 0;

    function resetFilters() {
        setCityFilter("todas");
        setStatusFilter("todos");
        setSearchTerm("");
        setCurrentPage(1);
    }

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-3 flex-1">
                <CustomersSummary
                    totalCustomers={customers.length}
                    activeCustomers={activeCustomers}
                    averageTicket={averageTicket}
                />

                <section className="space-y-4">
                    <CustomersFilters
                        cities={cities}
                        cityFilter={cityFilter}
                        statusFilter={statusFilter}
                        searchTerm={searchTerm}
                        onCityFilterChange={(value) => {
                            setCityFilter(value);
                            setCurrentPage(1);
                        }}
                        onStatusFilterChange={(value) => {
                            setStatusFilter(value);
                            setCurrentPage(1);
                        }}
                        onSearchTermChange={(value) => {
                            setSearchTerm(value);
                            setCurrentPage(1);
                        }}
                        onResetFilters={resetFilters}
                    />

                    <CustomersTable
                        customers={paginatedCustomers}
                        totalFiltered={filteredCustomers.length}
                        currentPage={currentSafePage}
                        totalPages={totalPages}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPreviousPage={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        onNextPage={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    />
                </section>
            </div>
        </div>
    );
}
