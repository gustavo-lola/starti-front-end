import { useRef } from "react";
import { CartIcon, type CartIconHandle } from "@/components/ui/cart";
import { GalleryVerticalEndIcon, type GalleryVerticalEndIconHandle } from "@/components/ui/gallery-vertical-end";
import { TruckIcon, type TruckIconHandle } from "@/components/ui/truck";
import { UsersIcon, type UsersIconHandle } from "@/components/ui/users";
import type { MetricaComAnimacaoProps } from "@/shared/types/products";

import { CardMetrica } from "./components/MetricCard";
import { TabelaRecente } from "./components/RecentProductsTable";

function MetricaComAnimacao({ titulo, valor, descricao, iconRef, icon }: MetricaComAnimacaoProps) {
    return (
        <CardMetrica
            titulo={titulo}
            valor={valor}
            descricao={descricao}
            className="border-border"
            valorClassName="text-primary"
            tituloClassName="text-foreground"
            onMouseEnter={() => iconRef.current?.startAnimation()}
            onMouseLeave={() => iconRef.current?.stopAnimation()}
            icone={
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </span>
            }
        />
    );
}

export function DashboardPage() {
    const clientesIconRef = useRef<UsersIconHandle>(null);
    const produtosIconRef = useRef<GalleryVerticalEndIconHandle>(null);
    const vendasIconRef = useRef<CartIconHandle>(null);
    const pedidosIconRef = useRef<TruckIconHandle>(null);

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-3 flex-1">
                <section className="rounded-xl  border-border bg-card p-4">
                    <header className="mb-4">
                        <h2 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">
                            Visao geral
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">Resumo rapido dos principais indicadores</p>
                    </header>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <MetricaComAnimacao
                            titulo="Clientes cadastrados"
                            valor={120}
                            descricao="Base ativa"
                            iconRef={clientesIconRef}
                            icon={<UsersIcon ref={clientesIconRef} size={22} />}
                        />

                        <MetricaComAnimacao
                            titulo="Produtos no catalogo"
                            valor={45}
                            descricao="Itens disponiveis"
                            iconRef={produtosIconRef}
                            icon={<GalleryVerticalEndIcon ref={produtosIconRef} size={22} />}
                        />

                        <MetricaComAnimacao
                            titulo="Vendas realizadas"
                            valor={32}
                            descricao="No periodo"
                            iconRef={vendasIconRef}
                            icon={<CartIcon ref={vendasIconRef} size={22} />}
                        />

                        <MetricaComAnimacao
                            titulo="Pedidos Enviados"
                            valor={32}
                            descricao="Em rota de entrega"
                            iconRef={pedidosIconRef}
                            icon={<TruckIcon ref={pedidosIconRef} size={22} />}
                        />
                    </div>
                </section>
                <TabelaRecente />
            </div>
        </div>
    );
}
