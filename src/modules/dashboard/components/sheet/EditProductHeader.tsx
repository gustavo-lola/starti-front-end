import { SheetDescription, SheetHeader, SheetTitle } from "@/components/animate-ui/components/radix/sheet";
import type { EditarProdutoHeaderProps } from "@/shared/types/products-sheet";
import { Trash2 } from "lucide-react";

export function EditarProdutoHeader({ produto, onDeletar, isDeleting }: EditarProdutoHeaderProps) {
    return (
        <SheetHeader className="space-y-3 border-b border-border pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                    <SheetTitle>Editar produto</SheetTitle>
                    <SheetDescription>
                        {produto
                            ? `Ajuste os dados de ${produto.nome}.`
                            : "Selecione um produto na tabela para começar a edição."}
                    </SheetDescription>
                </div>

                <button
                    type="button"
                    onClick={onDeletar}
                    disabled={!produto || isDeleting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-destructive/30 px-3 py-2 text-sm text-destructive transition-colors hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive/80 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:justify-start sm:border-none sm:px-0 sm:py-0 sm:hover:bg-transparent"
                >
                    <Trash2 size={16} />
                    {isDeleting ? "Deletando..." : "Deletar Produto"}
                </button>
            </div>
        </SheetHeader>
    );
}
