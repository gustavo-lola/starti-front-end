import { type ReactNode } from "react";
import { cn } from "@/lib/classnames";

interface CardMetricaProps {
    titulo: string;
    valor: number | string;
    descricao?: string;
    icone?: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    className?: string;
    conteudoClassName?: string;
    tituloClassName?: string;
    valorClassName?: string;
    descricaoClassName?: string;
}

export function CardMetrica({
    titulo,
    valor,
    descricao,
    icone,
    onMouseEnter,
    onMouseLeave,
    className,
    conteudoClassName,
    tituloClassName,
    valorClassName,
    descricaoClassName,
}: CardMetricaProps) {
    return (
        <section
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cn(
                "rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                className
            )}
        >
            <div className={cn("flex h-full flex-col", conteudoClassName)}>
                <div className="mb-3 flex items-center justify-between gap-3">
                    <p className={cn("text-sm font-semibold leading-tight text-foreground", tituloClassName)}>
                        {titulo}
                    </p>
                    {icone}
                </div>

                <div className="mt-auto min-w-0">
                    <p
                        className={cn(
                            "text-2xl font-semibold leading-none tabular-nums text-card-foreground sm:text-3xl",
                            valorClassName
                        )}
                    >
                        {valor}
                    </p>

                    {descricao ? (
                        <p className={cn("mt-1 text-sm text-muted-foreground", descricaoClassName)}>{descricao}</p>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
