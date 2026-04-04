import { useRef } from "react";
import { BoxIcon, type BoxIconHandle } from "@/shared/components/ui/box";
import { CartIcon, type CartIconHandle } from "@/shared/components/ui/cart";
import { DeleteIcon, type DeleteIconHandle } from "@/shared/components/ui/delete";
import { ShieldCheckIcon, type ShieldCheckIconHandle } from "@/shared/components/ui/shield-check";
import { TruckIcon, type TruckIconHandle } from "@/shared/components/ui/truck";
import type { ProductDetailsSectionProps } from "@/shared/types/showcase";
import { Hash } from "lucide-react";

export function ProductDetailsSection({ product, onAddToCart, onRemoveFromCart }: ProductDetailsSectionProps) {
    const isOutOfStock = product.quantidade <= 0;
    const cartIconRef = useRef<CartIconHandle>(null);
    const truckIconRef = useRef<TruckIconHandle>(null);
    const deleteIconRef = useRef<DeleteIconHandle>(null);
    const shieldIconRef = useRef<ShieldCheckIconHandle>(null);
    const boxIconRef = useRef<BoxIconHandle>(null);

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <img
                    src={product.imagem}
                    alt={product.nome}
                    className="aspect-square h-full w-full object-cover lg:aspect-auto"
                />
            </div>

            <div className="flex flex-col">
                <header className="border-b pb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                        {product.categoria}
                    </p>
                    <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">{product.nome}</h1>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.descricao}</p>
                </header>

                <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-orange-100 p-2">
                            <Hash size={16} className="text-orange-700" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground/70">Identificação</p>
                            <p className="text-xs font-mono font-bold text-orange-500/70">{product.codigo}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div
                            className={`rounded-lg p-2 ${isOutOfStock ? "bg-red-100" : "bg-emerald-100"}`}
                            onMouseEnter={() => boxIconRef.current?.startAnimation()}
                            onMouseLeave={() => boxIconRef.current?.stopAnimation()}
                        >
                            <BoxIcon
                                ref={boxIconRef}
                                size={16}
                                className={isOutOfStock ? "text-red-500" : "text-emerald-600"}
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground/70">Estoque</p>
                            <p className={`text-xs font-bold ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`}>
                                {isOutOfStock ? "Esgotado" : `${product.quantidade} unidades`}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div
                            className="rounded-lg bg-yellow-100 p-2"
                            onMouseEnter={() => shieldIconRef.current?.startAnimation()}
                            onMouseLeave={() => shieldIconRef.current?.stopAnimation()}
                        >
                            <ShieldCheckIcon ref={shieldIconRef} size={16} className="text-yellow-800" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground/70">Garantia</p>
                            <p className="text-xs font-bold text-yellow-500/70">12 Meses</p>
                        </div>
                    </div>

                    <div
                        className="flex items-start gap-3"
                        onMouseEnter={() => truckIconRef.current?.startAnimation()}
                        onMouseLeave={() => truckIconRef.current?.stopAnimation()}
                    >
                        <div className="rounded-lg bg-blue-200 p-2">
                            <TruckIcon ref={truckIconRef} size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground/70">Envio</p>
                            <p className="text-xs font-bold text-blue-500/70">Imediato</p>
                        </div>
                    </div>

                    <div className="col-span-2 border-t pt-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground/70">Preço Unitário</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-foreground">R$</span>
                            <span className="text-5xl font-black tracking-tighter text-foreground">
                                {product.preco.replace("R$", "").trim()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <button
                        type="button"
                        onClick={() => onRemoveFromCart(product.id)}
                        onMouseEnter={() => deleteIconRef.current?.startAnimation()}
                        onMouseLeave={() => deleteIconRef.current?.stopAnimation()}
                        className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border px-4 text-[11px] font-bold transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 hover:cursor-pointer"
                    >
                        <DeleteIcon
                            ref={deleteIconRef}
                            size={18}
                            className="transition-transform group-hover:rotate-12"
                        />
                        Remover
                    </button>
                    <button
                        type="button"
                        onClick={() => onAddToCart(product.id)}
                        onMouseEnter={() => cartIconRef.current?.startAnimation()}
                        onMouseLeave={() => cartIconRef.current?.stopAnimation()}
                        disabled={isOutOfStock}
                        className="group inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#1f5940] px-5 text-[11px] font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 hover:cursor-pointer"
                    >
                        <CartIcon
                            ref={cartIconRef}
                            size={18}
                            className="transition-transform group-hover:-translate-y-0.5"
                        />
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}
