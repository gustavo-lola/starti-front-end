import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import type { AbaFormulario, EditarProdutoFormProps } from "@/types/products-sheet";
import { PiBoxArrowDown, PiImageSquare, PiPackageFill, PiTagFill, PiWalletFill } from "react-icons/pi";

const ABAS: Array<{ id: AbaFormulario; label: string }> = [
    { id: "variaveis", label: "Variaveis" },
    { id: "descricao", label: "Descricao tecnica" },
    { id: "imagens", label: "Imagens" },
    { id: "estoque", label: "Estoque" },
];

export function EditarProdutoForm({ produto, form, setForm }: EditarProdutoFormProps) {
    const [abaAtiva, setAbaAtiva] = useState<AbaFormulario>("variaveis");
    const [imagensProduto, setImagensProduto] = useState<string[]>(produto?.imagem ? [produto.imagem] : []);
    const inputImagemRef = useRef<HTMLInputElement | null>(null);
    const objectUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        if (!produto) {
            return;
        }

        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlsRef.current = [];

        setImagensProduto([produto.imagem]);
    }, [produto]);

    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
            objectUrlsRef.current = [];
        };
    }, []);

    function handleSelecionarImagens(event: ChangeEvent<HTMLInputElement>) {
        const arquivos = event.target.files;

        if (!arquivos || arquivos.length === 0) {
            return;
        }

        const novasImagens = Array.from(arquivos).map((arquivo) => URL.createObjectURL(arquivo));
        objectUrlsRef.current.push(...novasImagens);
        setImagensProduto((prev) => [...prev, ...novasImagens]);

        event.target.value = "";
    }

    if (!produto) {
        return <div className="p-4 text-sm text-muted-foreground">Nenhum produto selecionado.</div>;
    }

    return (
        <div className="space-y-4 p-4">
            <div>
                <p className="break-words text-lg font-bold sm:text-xl">
                    {produto.nome}: #{produto.id}
                </p>
            </div>

            <div className="grid gap-2 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                    <PiPackageFill size={16} className="text-muted-foreground" />
                    <span className="font-bold">Nome</span>
                    <span>{produto.nome}</span>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                    <PiWalletFill size={16} className="text-muted-foreground" />
                    <span className="font-bold">Preco</span>
                    <span>{produto.preco}</span>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                    <PiTagFill size={16} className="text-muted-foreground" />
                    <span className="font-bold">Categoria</span>
                    <span>{produto.categoria}</span>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                    <PiBoxArrowDown size={16} className="text-muted-foreground" />
                    <span className="font-bold">Estoque</span>
                    <span>{produto.estoque} unid.</span>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground">Descricao do produto</p>
                <p className="mt-1 text-sm text-muted-foreground">{produto.descricao}</p>
            </div>

            <div className="border-b border-border">
                <nav className="flex gap-4 overflow-x-auto sm:gap-8">
                    {ABAS.map((aba) => {
                        const isAtiva = abaAtiva === aba.id;

                        return (
                            <button
                                key={aba.id}
                                type="button"
                                onClick={() => setAbaAtiva(aba.id)}
                                className={[
                                    "border-b-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap hover:cursor-pointer",
                                    isAtiva
                                        ? "border-foreground text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground",
                                ].join(" ")}
                            >
                                {aba.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {abaAtiva === "variaveis" && (
                <div className="grid gap-4">
                    <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-foreground">Nome</span>
                        <Input
                            value={form.nome}
                            onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
                            className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                        />
                    </label>

                    <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-foreground">Codigo SKU</span>
                        <Input
                            value={form.codigo}
                            onChange={(event) => setForm((prev) => ({ ...prev, codigo: event.target.value }))}
                            className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                        />
                    </label>

                    <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-foreground">Categoria</span>
                        <Input
                            value={form.categoria}
                            onChange={(event) => setForm((prev) => ({ ...prev, categoria: event.target.value }))}
                            className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                        />
                    </label>

                    <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-foreground">Preco</span>
                        <Input
                            value={form.preco}
                            onChange={(event) => setForm((prev) => ({ ...prev, preco: event.target.value }))}
                            className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                        />
                    </label>
                </div>
            )}

            {abaAtiva === "descricao" && (
                <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-4">
                    <p className="text-sm font-medium text-foreground">Descricao tecnica</p>
                    <textarea
                        value={form.descricao}
                        onChange={(event) => setForm((prev) => ({ ...prev, descricao: event.target.value }))}
                        rows={6}
                        className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-green-800"
                    />
                </div>
            )}

            {abaAtiva === "imagens" && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Imagens do produto</h3>
                    <Input
                        ref={inputImagemRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleSelecionarImagens}
                        className="hidden"
                    />
                    <div className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-1">
                        {imagensProduto.map((imagem, index) => (
                            <div
                                key={`${imagem}-${index}`}
                                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted p-1.5"
                            >
                                <img
                                    src={imagem}
                                    alt={`${produto.nome} ${index + 1}`}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => inputImagemRef.current?.click()}
                            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-foreground transition-opacity hover:cursor-pointer hover:opacity-70"
                        >
                            <PiImageSquare size={18} className="text-foreground" />
                            <span className="text-sm font-medium">Adicionar</span>
                        </button>
                    </div>
                </div>
            )}

            {abaAtiva === "estoque" && (
                <div className="grid gap-4">
                    <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-foreground">Estoque</span>
                        <Input
                            type="number"
                            min={0}
                            value={form.estoque}
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, estoque: Number(event.target.value) || 0 }))
                            }
                            className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                        />
                    </label>

                    <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-foreground">Quantidade</span>
                        <Input
                            type="number"
                            min={0}
                            value={form.quantidade}
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, quantidade: Number(event.target.value) || 0 }))
                            }
                            className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
