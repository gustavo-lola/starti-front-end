import { Input } from "@/components/ui/input";
import { CATEGORIAS, type ProdutoInformacoesFormProps } from "@/types/products";
import { PiBoxArrowDown, PiPackageFill, PiTagFill, PiTextAlignLeft, PiWalletFill } from "react-icons/pi";

export function ProdutoInformacoesForm({ form, errors, onChange }: ProdutoInformacoesFormProps) {
    return (
        <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="grid gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                        <PiPackageFill size={16} className="text-muted-foreground" />
                        Nome
                    </span>
                    <Input
                        value={form.nome}
                        onChange={(event) => onChange("nome", event.target.value)}
                        placeholder="Ex: Teclado Gamer Pro"
                        className="h-10"
                    />
                    {errors.nome ? <p className="text-xs text-destructive">{errors.nome}</p> : null}
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                        <PiTagFill size={16} className="text-muted-foreground" />
                        Codigo SKU
                    </span>
                    <Input
                        value={form.codigo}
                        onChange={(event) => onChange("codigo", event.target.value)}
                        placeholder="Ex: SKU-1023"
                        className="h-10"
                    />
                    {errors.codigo ? <p className="text-xs text-destructive">{errors.codigo}</p> : null}
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                        <PiTagFill size={16} className="text-muted-foreground" />
                        Categoria
                    </span>
                    <select
                        value={form.categoria}
                        onChange={(event) => onChange("categoria", event.target.value)}
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                    >
                        <option value="">Selecione</option>
                        {CATEGORIAS.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                    {errors.categoria ? <p className="text-xs text-destructive">{errors.categoria}</p> : null}
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                        <PiWalletFill size={16} className="text-muted-foreground" />
                        Preco
                    </span>
                    <Input
                        value={form.preco}
                        onChange={(event) => onChange("preco", event.target.value)}
                        placeholder="Ex: R$199,90"
                        className="h-10"
                    />
                    {errors.preco ? <p className="text-xs text-destructive">{errors.preco}</p> : null}
                </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                        <PiBoxArrowDown size={16} className="text-muted-foreground" />
                        Estoque
                    </span>
                    <Input
                        type="number"
                        min={0}
                        value={form.estoque}
                        onChange={(event) => onChange("estoque", Number(event.target.value) || 0)}
                        className="h-10 no-spinner"
                    />

                    {errors.estoque ? <p className="text-xs text-destructive">{errors.estoque}</p> : null}
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                        <PiBoxArrowDown size={16} className="text-muted-foreground" />
                        Quantidade
                    </span>
                    <Input
                        type="number"
                        min={0}
                        value={form.quantidade}
                        onChange={(event) => onChange("quantidade", Number(event.target.value) || 0)}
                        className="h-10 no-spinner"
                    />
                    {errors.quantidade ? <p className="text-xs text-destructive">{errors.quantidade}</p> : null}
                </label>
            </div>

            <label className="grid gap-2 text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                    <PiTextAlignLeft size={16} className="text-muted-foreground" />
                    Descricao tecnica
                </span>
                <textarea
                    value={form.descricao}
                    onChange={(event) => onChange("descricao", event.target.value)}
                    rows={6}
                    placeholder="Descreva os detalhes tecnicos do produto..."
                    className="w-full resize-none  rounded-lg border border-input bg-background px-3 py-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-green-800"
                />
                {errors.descricao ? <p className="text-xs text-destructive">{errors.descricao}</p> : null}
            </label>
        </section>
    );
}
