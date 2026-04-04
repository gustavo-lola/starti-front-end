import { formatCurrency } from "@/lib/customers-formatters";
import { CardMetrica } from "@/pages/dashboard/components/MetricCard";
import type { CustomersSummaryProps } from "@/shared/types/customers";

export function CustomersSummary({ totalCustomers, activeCustomers, averageTicket }: CustomersSummaryProps) {
    return (
        <section className="rounded-xl  bg-card p-4">
            <header className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">Clientes</h2>
                <p className="mt-1 text-sm text-muted-foreground">Acompanhe relacionamento e historico da base.</p>
            </header>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <CardMetrica
                    titulo="Total de clientes"
                    valor={totalCustomers}
                    descricao="Base cadastrada"
                    className="border-border"
                    valorClassName="text-primary"
                />

                <CardMetrica
                    titulo="Clientes ativos"
                    valor={activeCustomers}
                    descricao="Com relacao recente"
                    className="border-border"
                    valorClassName="text-primary"
                />

                <CardMetrica
                    titulo="Ticket medio"
                    valor={formatCurrency(averageTicket)}
                    descricao="Media por cliente"
                    className="border-border"
                    valorClassName="text-primary"
                />
            </div>
        </section>
    );
}
