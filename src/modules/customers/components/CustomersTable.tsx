import { formatCurrency, formatDate } from "@/lib/customers-formatters";
import type { CustomerStatus, CustomersTableProps } from "@/shared/types/customers";
import { toast } from "react-toastify";

function CustomerAvatar({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((parte) => parte[0]?.toUpperCase() ?? "")
        .join("");

    return (
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-xs font-semibold text-muted-foreground">
            {initials}
        </div>
    );
}

function StatusBadge({ status }: { status: CustomerStatus }) {
    if (status === "inativo") {
        return (
            <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-500">
                Inativo
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
            Ativo
        </span>
    );
}

export function CustomersTable({
    customers,
    totalFiltered,
    currentPage,
    totalPages,
    itemsPerPage,
    onPreviousPage,
    onNextPage,
}: CustomersTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="space-y-3 p-3 md:hidden">
                {customers.map((customer) => (
                    <article key={customer.id} className="rounded-lg border border-border bg-card p-3">
                        <div className="flex items-start gap-3">
                            <CustomerAvatar name={customer.nome} />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-foreground">{customer.nome}</p>
                                <p className="truncate text-xs text-muted-foreground">{customer.email}</p>
                                <p className="text-xs text-muted-foreground">{customer.telefone}</p>
                            </div>
                            <StatusBadge status={customer.status} />
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <p>Cidade: {customer.cidade}</p>
                            <p>Ultimo: {formatDate(customer.ultimoPedido)}</p>
                            <p className="col-span-2">Total gasto: {formatCurrency(customer.totalGasto)}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => toast.info(`Perfil de ${customer.nome} em desenvolvimento.`)}
                            className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:cursor-pointer hover:opacity-90"
                        >
                            Ver perfil
                        </button>
                    </article>
                ))}

                {totalFiltered === 0 && (
                    <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                        Nenhum cliente encontrado para os filtros selecionados.
                    </div>
                )}
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-[860px] w-full text-left text-sm text-foreground">
                    <thead className="bg-muted/40 text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Cliente</th>
                            <th className="px-4 py-3 font-semibold">Contato</th>
                            <th className="px-4 py-3 font-semibold">Cidade</th>
                            <th className="px-4 py-3 font-semibold">Ultimo pedido</th>
                            <th className="px-4 py-3 font-semibold">Total gasto</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                            <th className="px-4 py-3 font-semibold">Acoes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="border-t border-border hover:bg-muted/30">
                                <td className="px-4 py-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        <CustomerAvatar name={customer.nome} />
                                        <span className="font-medium text-foreground">{customer.nome}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 align-middle">
                                    <p className="font-medium text-foreground">{customer.email}</p>
                                    <p className="text-xs text-muted-foreground">{customer.telefone}</p>
                                </td>
                                <td className="px-4 py-4 align-middle">{customer.cidade}</td>
                                <td className="px-4 py-4 align-middle">{formatDate(customer.ultimoPedido)}</td>
                                <td className="px-4 py-4 align-middle">{formatCurrency(customer.totalGasto)}</td>
                                <td className="px-4 py-4 align-middle">
                                    <StatusBadge status={customer.status} />
                                </td>
                                <td className="px-4 py-4 align-middle">
                                    <button
                                        type="button"
                                        onClick={() => toast.info(`Perfil de ${customer.nome} em desenvolvimento.`)}
                                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:cursor-pointer hover:opacity-90"
                                    >
                                        Ver perfil
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {totalFiltered === 0 && (
                            <tr>
                                <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    Nenhum cliente encontrado para os filtros selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalFiltered > 0 && (
                <div className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        Mostrando {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, totalFiltered)} de {totalFiltered}
                    </p>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                            type="button"
                            onClick={onPreviousPage}
                            disabled={currentPage === 1}
                            className="rounded-md border border-border px-3 py-1.5 text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer whitespace-nowrap"
                        >
                            Anterior
                        </button>

                        <span className="px-1 text-foreground whitespace-nowrap">
                            Pagina {currentPage} de {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={onNextPage}
                            disabled={currentPage === totalPages}
                            className="rounded-md border border-border px-3 py-1.5 text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer whitespace-nowrap"
                        >
                            Proxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
