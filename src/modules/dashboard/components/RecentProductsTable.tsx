import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { PenToolIcon, type PenToolIconHandle } from "@/components/ui/pen-tool";
import { atualizarProduto, deletarProduto, listarProdutos } from "@/services/products";
import { Input } from "@/shared/components/ui/input";
import type { ProdutoLinha } from "@/shared/mocks/products-mock";
import type { StatusFiltro } from "@/shared/types/products";
import type { ProdutoForm } from "@/shared/types/products-sheet";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import EditarProdutoSheet from "./EditProductSheet";

const ITENS_POR_PAGINA = 6;

function normalizarTexto(texto: string) {
    return texto
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filtrarProdutos(
    lista: ProdutoLinha[],
    categoriaFiltro: string,
    statusFiltro: StatusFiltro,
    termoBusca: string
) {
    const buscaNormalizada = normalizarTexto(termoBusca.trim());

    return lista.filter((produto) => {
        const matchCategoria = categoriaFiltro === "todos" || produto.categoria === categoriaFiltro;
        const matchBusca =
            buscaNormalizada.length === 0 ||
            normalizarTexto(produto.nome).includes(buscaNormalizada) ||
            normalizarTexto(produto.categoria).includes(buscaNormalizada);

        const isSemEstoque = produto.quantidade <= 0;
        const matchStatus =
            statusFiltro === "todos" ||
            (statusFiltro === "sem_estoque" && isSemEstoque) ||
            (statusFiltro === "com_estoque" && !isSemEstoque);

        return matchCategoria && matchStatus && matchBusca;
    });
}

function ProductAvatar({ nome, imagem }: { nome: string; imagem: string }) {
    const initials = nome
        .split(" ")
        .slice(0, 2)
        .map((parte) => parte[0]?.toUpperCase() ?? "")
        .join("");

    return (
        <div className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-xs font-semibold text-muted-foreground">
            <img src={imagem} alt={nome} className="h-full w-full object-cover" loading="lazy" />
            <span className="sr-only">{initials}</span>
        </div>
    );
}

function StatusBadge({ quantidade }: { quantidade: number }) {
    if (quantidade <= 0) {
        return (
            <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-500">
                Sem estoque
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
            Com estoque
        </span>
    );
}

function EditarProdutoButton({ onClick }: { onClick: () => void }) {
    const penToolIconRef = useRef<PenToolIconHandle>(null);

    return (
        <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:cursor-pointer hover:opacity-90"
            onMouseEnter={() => penToolIconRef.current?.startAnimation()}
            onMouseLeave={() => penToolIconRef.current?.stopAnimation()}
            onClick={onClick}
        >
            <PenToolIcon ref={penToolIconRef} size={16} />
            Editar produto
        </button>
    );
}

function SelectFiltro({
    value,
    onChange,
    ariaLabel,
    children,
}: {
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    ariaLabel: string;
    children: ReactNode;
}) {
    return (
        <div className="relative inline-flex w-full sm:w-auto">
            <select
                value={value}
                onChange={onChange}
                aria-label={ariaLabel}
                className="h-11 w-full appearance-none rounded-full border-2 border-dashed border-border bg-background pl-4 pr-10 text-base text-foreground sm:min-w-36"
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

export function TabelaRecente() {
    const [searchParams] = useSearchParams();
    const [produtos, setProdutos] = useState<ProdutoLinha[]>(() => listarProdutos());
    const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todos");
    const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("todos");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoLinha | null>(null);
    const [sheetAberto, setSheetAberto] = useState(false);
    const termoBusca = searchParams.get("q") ?? "";

    const categorias = useMemo(() => {
        return Array.from(new Set(produtos.map((produto) => produto.categoria)));
    }, [produtos]);

    const produtosFiltrados = useMemo(() => {
        return filtrarProdutos(produtos, categoriaFiltro, statusFiltro, termoBusca);
    }, [produtos, categoriaFiltro, statusFiltro, termoBusca]);

    const totalPaginas = Math.max(1, Math.ceil(produtosFiltrados.length / ITENS_POR_PAGINA));
    const paginaCorrente = Math.min(paginaAtual, totalPaginas);

    const produtosPaginados = useMemo(() => {
        const inicio = (paginaCorrente - 1) * ITENS_POR_PAGINA;
        const fim = inicio + ITENS_POR_PAGINA;

        return produtosFiltrados.slice(inicio, fim);
    }, [paginaCorrente, produtosFiltrados]);

    useEffect(() => {
        setPaginaAtual(1);
    }, [categoriaFiltro, statusFiltro, termoBusca]);

    useEffect(() => {
        function sincronizarProdutos() {
            setProdutos(listarProdutos());
        }

        window.addEventListener("starti:produtos-atualizados", sincronizarProdutos);
        return () => window.removeEventListener("starti:produtos-atualizados", sincronizarProdutos);
    }, []);

    function limparFiltros() {
        setCategoriaFiltro("todos");
        setStatusFiltro("todos");
    }

    function abrirSheetEdicao(produto: ProdutoLinha) {
        setProdutoSelecionado(produto);
        setSheetAberto(true);
    }

    function handleOpenChangeSheet(open: boolean) {
        setSheetAberto(open);

        if (!open) {
            setProdutoSelecionado(null);
        }
    }

    async function handleSalvarProduto(produtoId: number, form: ProdutoForm) {
        const produtoAtual = produtos.find((item) => item.id === produtoId);

        if (!produtoAtual) {
            throw new Error("Produto nao encontrado para atualizacao.");
        }

        const resultado = await atualizarProduto(produtoAtual, form);

        if (!resultado.ok) {
            throw new Error(resultado.mensagem);
        }

        setProdutos((prev) => prev.map((item) => (item.id === produtoId ? resultado.produtoAtualizado : item)));
    }

    async function handleDeletarProduto(produtoId: number) {
        const produtoAtual = produtos.find((item) => item.id === produtoId);

        if (!produtoAtual) {
            throw new Error("Produto nao encontrado para exclusao.");
        }

        const resultado = await deletarProduto(produtoId);

        if (!resultado.ok) {
            throw new Error(resultado.mensagem);
        }

        setProdutos((prev) => prev.filter((item) => item.id !== produtoId));
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                <SelectFiltro
                    value={categoriaFiltro}
                    onChange={(event) => setCategoriaFiltro(event.target.value)}
                    ariaLabel="Filtrar por tipo"
                >
                    <option value="todos">Tipo</option>
                    {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </SelectFiltro>

                <SelectFiltro
                    value={statusFiltro}
                    onChange={(event) => setStatusFiltro(event.target.value as StatusFiltro)}
                    ariaLabel="Filtrar por status"
                >
                    <option value="todos">Status</option>
                    <option value="com_estoque">Com estoque</option>
                    <option value="sem_estoque">Sem estoque</option>
                </SelectFiltro>

                <button
                    type="button"
                    onClick={limparFiltros}
                    className="h-11 w-full rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
                >
                    Ver todos os produtos
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="space-y-3 p-3 md:hidden">
                    {produtosPaginados.map((produto) => (
                        <article key={produto.id} className="rounded-lg border border-border bg-card p-3">
                            <div className="flex items-start gap-3">
                                <ProductAvatar nome={produto.nome} imagem={produto.imagem} />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-foreground">{produto.nome}</p>
                                    <p className="text-xs text-muted-foreground">{produto.categoria}</p>
                                    <p className="text-xs text-muted-foreground">{produto.preco}</p>
                                </div>
                                <StatusBadge quantidade={produto.quantidade} />
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <p>Estoque: {produto.estoque} unid.</p>
                                <p>Quantidade: {produto.quantidade} unid.</p>
                            </div>

                            <div className="mt-3">
                                <EditarProdutoButton onClick={() => abrirSheetEdicao(produto)} />
                            </div>
                        </article>
                    ))}

                    {produtosFiltrados.length === 0 && (
                        <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                            Nenhum produto encontrado para a pesquisa e filtros selecionados.
                        </div>
                    )}
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <table className="min-w-[900px] w-full text-left text-sm text-foreground">
                        <thead className="bg-muted/40 text-muted-foreground">
                            <tr>
                                <th className="w-12 px-4 py-3">
                                    <Input type="checkbox" aria-label="Selecionar todos os produtos" />
                                </th>
                                <th className="px-4 py-3 font-semibold">Produto</th>
                                <th className="px-4 py-3 font-semibold">Categoria</th>
                                <th className="px-4 py-3 font-semibold">Estoque</th>
                                <th className="px-4 py-3 font-semibold">Preço</th>
                                <th className="px-4 py-3 font-semibold">Quantidade</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtosPaginados.map((produto) => (
                                <tr key={produto.id} className="border-t border-border hover:bg-muted/30">
                                    <td className="px-4 py-4 align-middle">
                                        <Input type="checkbox" aria-label={`Selecionar produto ${produto.nome}`} />
                                    </td>

                                    <td className="px-4 py-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <ProductAvatar nome={produto.nome} imagem={produto.imagem} />
                                            <span className="font-medium text-foreground">{produto.nome}</span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 align-middle">{produto.categoria}</td>
                                    <td className="px-4 py-4 align-middle">{produto.estoque} unid.</td>
                                    <td className="px-4 py-4 align-middle">{produto.preco}</td>
                                    <td className="px-4 py-4 align-middle">{produto.quantidade} unid.</td>
                                    <td className="px-4 py-4 align-middle">
                                        <StatusBadge quantidade={produto.quantidade} />
                                    </td>

                                    <td className="px-4 py-4 align-middle">
                                        <EditarProdutoButton onClick={() => abrirSheetEdicao(produto)} />
                                    </td>
                                </tr>
                            ))}

                            {produtosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                        Nenhum produto encontrado para a pesquisa e filtros selecionados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {produtosFiltrados.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Mostrando {(paginaCorrente - 1) * ITENS_POR_PAGINA + 1}-
                            {Math.min(paginaCorrente * ITENS_POR_PAGINA, produtosFiltrados.length)} de{" "}
                            {produtosFiltrados.length}
                        </p>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                                type="button"
                                onClick={() => setPaginaAtual((pagina) => Math.max(1, pagina - 1))}
                                disabled={paginaCorrente === 1}
                                className="rounded-md border border-border px-3 py-1.5 text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer whitespace-nowrap"
                            >
                                Anterior
                            </button>

                            <span className="px-1 text-foreground whitespace-nowrap">
                                Página {paginaCorrente} de {totalPaginas}
                            </span>

                            <button
                                type="button"
                                onClick={() => setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1))}
                                disabled={paginaCorrente === totalPaginas}
                                className="rounded-md border border-border px-3 py-1.5 text-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer whitespace-nowrap
                            "
                            >
                                Proxima
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <EditarProdutoSheet
                open={sheetAberto}
                onOpenChange={handleOpenChangeSheet}
                produto={produtoSelecionado}
                onSalvar={handleSalvarProduto}
                onDeletar={handleDeletarProduto}
            />
        </div>
    );
}
