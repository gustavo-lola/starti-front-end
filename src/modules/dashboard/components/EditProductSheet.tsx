import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/animate-ui/components/radix/sheet";
import { criarForm, type EditarProdutoSheetProps, type ProdutoForm } from "@/types/products-sheet";
import { toast } from "react-toastify";

import { EditarProdutoFooter } from "./sheet/EditProductFooter";
import { EditarProdutoForm } from "./sheet/EditProductForm";
import { EditarProdutoHeader } from "./sheet/EditProductHeader";

export default function EditarProdutoSheet({
    open,
    onOpenChange,
    produto,
    onSalvar,
    onDeletar,
}: EditarProdutoSheetProps) {
    const [form, setForm] = useState<ProdutoForm>(criarForm(produto));
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setForm(criarForm(produto));
    }, [produto, open]);

    async function handleSalvar() {
        if (!produto || isSaving || isDeleting) {
            return;
        }

        const toastId = toast.loading("Salvando alteracoes do produto...");
        setIsSaving(true);

        try {
            await onSalvar(produto.id, form);
            toast.update(toastId, {
                render: "Produto atualizado com sucesso.",
                type: "success",
                isLoading: false,
                autoClose: 2500,
            });
            onOpenChange(false);
        } catch (error) {
            const mensagemErro = error instanceof Error ? error.message : "Nao foi possivel atualizar o produto.";

            toast.update(toastId, {
                render: mensagemErro,
                type: "error",
                isLoading: false,
                autoClose: 3500,
            });
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDeletar() {
        if (!produto || isSaving || isDeleting) {
            return;
        }

        const confirmou = window.confirm(`Tem certeza que deseja deletar ${produto.nome}?`);
        if (!confirmou) {
            return;
        }

        const toastId = toast.loading("Deletando produto...");
        setIsDeleting(true);

        try {
            await onDeletar(produto.id);
            toast.update(toastId, {
                render: "Produto deletado com sucesso.",
                type: "success",
                isLoading: false,
                autoClose: 2200,
            });
            onOpenChange(false);
        } catch (error) {
            const mensagemErro = error instanceof Error ? error.message : "Nao foi possivel deletar o produto.";

            toast.update(toastId, {
                render: mensagemErro,
                type: "error",
                isLoading: false,
                autoClose: 3200,
            });
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full rounded-xl max-w-xl border-l border-border p-0">
                <div className="flex h-full min-h-0 flex-col">
                    <EditarProdutoHeader produto={produto} onDeletar={handleDeletar} isDeleting={isDeleting} />

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <EditarProdutoForm produto={produto} form={form} setForm={setForm} />
                    </div>

                    <EditarProdutoFooter
                        onOpenChange={onOpenChange}
                        onSalvar={handleSalvar}
                        isSaving={isSaving}
                        isDeleting={isDeleting}
                        disableSave={!produto}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
