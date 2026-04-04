import { SheetFooter } from "@/components/animate-ui/components/radix/sheet";
import type { EditarProdutoFooterProps } from "@/shared/types/products-sheet";

export function EditarProdutoFooter({
    onOpenChange,
    onSalvar,
    isSaving,
    isDeleting,
    disableSave,
}: EditarProdutoFooterProps) {
    const isBusy = isSaving || Boolean(isDeleting);

    return (
        <SheetFooter className="border-t border-border pt-4">
            <div className="flex w-full flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    disabled={isBusy}
                    className="w-full rounded-md border border-border px-4 py-2 text-sm text-foreground hover:cursor-pointer sm:w-auto"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={onSalvar}
                    disabled={isBusy || disableSave}
                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {isSaving ? "Salvando..." : "Salvar alteracoes"}
                </button>
            </div>
        </SheetFooter>
    );
}
