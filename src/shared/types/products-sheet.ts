import type { Dispatch, SetStateAction } from "react";
import type { ProdutoLinha } from "@/shared/mocks/products-mock";

export type EditarProdutoSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    produto: ProdutoLinha | null;
    onSalvar: (produtoId: number, form: ProdutoForm) => Promise<void>;
    onDeletar: (produtoId: number) => Promise<void>;
};

export type ProdutoForm = {
    nome: string;
    codigo: string;
    categoria: string;
    preco: string;
    estoque: number;
    quantidade: number;
    descricao: string;
};

export type EditarProdutoFooterProps = {
    onOpenChange: (open: boolean) => void;
    onSalvar: () => void;
    isSaving: boolean;
    isDeleting?: boolean;
    disableSave?: boolean;
};

export function criarForm(produto: ProdutoLinha | null): ProdutoForm {
    return {
        nome: produto?.nome ?? "",
        codigo: produto?.codigo ?? "",
        categoria: produto?.categoria ?? "",
        preco: produto?.preco ?? "",
        estoque: produto?.estoque ?? 0,
        quantidade: produto?.quantidade ?? 0,
        descricao: produto?.descricao ?? "",
    };
}

export type EditarProdutoFormProps = {
    produto: ProdutoLinha | null;
    form: ProdutoForm;
    setForm: Dispatch<SetStateAction<ProdutoForm>>;
};

export type AbaFormulario = "variaveis" | "descricao" | "imagens" | "estoque";

export type EditarProdutoHeaderProps = {
    produto: ProdutoLinha | null;
    onDeletar: () => void;
    isDeleting: boolean;
};
