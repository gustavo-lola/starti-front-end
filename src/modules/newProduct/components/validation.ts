import type { NovoProdutoErrors, NovoProdutoForm } from "@/types/products";
import { z } from "zod";

const novoProdutoSchema = z.object({
    nome: z.string().trim().min(1, "Informe o nome do produto."),
    codigo: z.string().trim().min(1, "Informe o codigo SKU."),
    categoria: z.string().trim().min(1, "Selecione uma categoria."),
    preco: z.string().trim().min(1, "Informe o preco."),
    estoque: z.number().min(0, "Estoque nao pode ser negativo."),
    quantidade: z.number().min(0, "Quantidade nao pode ser negativa."),
    descricao: z.string().trim().min(1, "Informe a descricao tecnica."),
});

export function validarNovoProdutoForm(form: NovoProdutoForm): NovoProdutoErrors {
    const errors: NovoProdutoErrors = {};

    const resultado = novoProdutoSchema.safeParse(form);
    if (resultado.success) {
        return errors;
    }

    resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0] as keyof NovoProdutoForm | undefined;

        if (!campo || errors[campo]) {
            return;
        }

        errors[campo] = issue.message;
    });

    return errors;
}

export function primeiraMensagemErro(errors: NovoProdutoErrors) {
    const mensagens = Object.values(errors).filter(Boolean);
    return mensagens[0] ?? null;
}

export function possuiErros(errors: NovoProdutoErrors) {
    return Object.keys(errors).length > 0;
}
