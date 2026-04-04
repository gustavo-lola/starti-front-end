import type { ProdutoLinha } from "@/shared/mocks/products-mock";
import { produtosMockados } from "@/shared/mocks/products-mock";
import type { ProdutoForm } from "@/types/products-sheet";

const PRODUTOS_STORAGE_KEY = "starti:produtos";

type ResultadoAtualizacaoProduto = { ok: true; produtoAtualizado: ProdutoLinha } | { ok: false; mensagem: string };
type ResultadoRemocaoProduto = { ok: true } | { ok: false; mensagem: string };
type ResultadoCriacaoProduto = { ok: true; produtoCriado: ProdutoLinha } | { ok: false; mensagem: string };

export type NovoProdutoPayload = {
    nome: string;
    codigo: string;
    categoria: string;
    preco: string;
    estoque: number;
    quantidade: number;
    descricao: string;
    imagem?: string;
};

function isBrowser() {
    return typeof window !== "undefined";
}

function emitirAtualizacaoProdutos() {
    if (!isBrowser()) {
        return;
    }

    window.dispatchEvent(new CustomEvent("starti:produtos-atualizados"));
}

function salvarProdutosNoStorage(produtos: ProdutoLinha[]) {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.setItem(PRODUTOS_STORAGE_KEY, JSON.stringify(produtos));
    emitirAtualizacaoProdutos();
}

export function listarProdutos(): ProdutoLinha[] {
    if (!isBrowser()) {
        return produtosMockados;
    }

    const dados = window.localStorage.getItem(PRODUTOS_STORAGE_KEY);

    if (!dados) {
        salvarProdutosNoStorage(produtosMockados);
        return produtosMockados;
    }

    try {
        const produtos = JSON.parse(dados) as ProdutoLinha[];

        if (!Array.isArray(produtos)) {
            salvarProdutosNoStorage(produtosMockados);
            return produtosMockados;
        }

        return produtos;
    } catch {
        salvarProdutosNoStorage(produtosMockados);
        return produtosMockados;
    }
}

function normalizarPreco(preco: string) {
    const valor = preco.trim();

    if (!valor) {
        return null;
    }

    return valor.startsWith("R$") ? valor : `R$${valor}`;
}

function obterProximoId(lista: ProdutoLinha[]) {
    if (lista.length === 0) {
        return 1;
    }

    return Math.max(...lista.map((produto) => produto.id)) + 1;
}

export async function cadastrarProduto(payload: NovoProdutoPayload): Promise<ResultadoCriacaoProduto> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!payload.nome.trim()) {
        return { ok: false, mensagem: "Nome do produto e obrigatorio." };
    }

    if (!payload.codigo.trim()) {
        return { ok: false, mensagem: "Codigo SKU e obrigatorio." };
    }

    if (!payload.categoria.trim()) {
        return { ok: false, mensagem: "Categoria e obrigatoria." };
    }

    const precoNormalizado = normalizarPreco(payload.preco);
    if (!precoNormalizado) {
        return { ok: false, mensagem: "Preco invalido." };
    }

    if (payload.estoque < 0 || payload.quantidade < 0) {
        return { ok: false, mensagem: "Estoque e quantidade nao podem ser negativos." };
    }

    const produtosAtuais = listarProdutos();
    const codigoNormalizado = payload.codigo.trim().toUpperCase();

    if (produtosAtuais.some((produto) => produto.codigo.trim().toUpperCase() === codigoNormalizado)) {
        return { ok: false, mensagem: "Ja existe um produto com este codigo SKU." };
    }

    const novoProduto: ProdutoLinha = {
        id: obterProximoId(produtosAtuais),
        nome: payload.nome.trim(),
        codigo: payload.codigo.trim(),
        categoria: payload.categoria.trim(),
        estoque: payload.estoque,
        preco: precoNormalizado,
        quantidade: payload.quantidade,
        descricao: payload.descricao.trim(),
        imagem: payload.imagem?.trim() || "/carregador.avif",
    };

    salvarProdutosNoStorage([...produtosAtuais, novoProduto]);

    return { ok: true, produtoCriado: novoProduto };
}

export async function atualizarProduto(
    produtoAtual: ProdutoLinha,
    form: ProdutoForm
): Promise<ResultadoAtualizacaoProduto> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!form.nome.trim()) {
        return { ok: false, mensagem: "Nome do produto e obrigatorio." };
    }

    if (!form.codigo.trim()) {
        return { ok: false, mensagem: "Codigo SKU e obrigatorio." };
    }

    if (!form.categoria.trim()) {
        return { ok: false, mensagem: "Categoria e obrigatoria." };
    }

    if (form.estoque < 0 || form.quantidade < 0) {
        return { ok: false, mensagem: "Estoque e quantidade nao podem ser negativos." };
    }

    const precoNormalizado = normalizarPreco(form.preco);
    if (!precoNormalizado) {
        return { ok: false, mensagem: "Preco invalido." };
    }

    const produtoAtualizado: ProdutoLinha = {
        ...produtoAtual,
        nome: form.nome.trim(),
        codigo: form.codigo.trim(),
        categoria: form.categoria.trim(),
        preco: precoNormalizado,
        estoque: form.estoque,
        quantidade: form.quantidade,
        descricao: form.descricao.trim(),
    };

    const listaAtual = listarProdutos();
    salvarProdutosNoStorage(listaAtual.map((item) => (item.id === produtoAtual.id ? produtoAtualizado : item)));

    return {
        ok: true,
        produtoAtualizado,
    };
}

export async function deletarProduto(produtoId: number): Promise<ResultadoRemocaoProduto> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (produtoId <= 0) {
        return { ok: false, mensagem: "Produto invalido para exclusao." };
    }

    const listaAtual = listarProdutos();
    salvarProdutosNoStorage(listaAtual.filter((item) => item.id !== produtoId));

    return { ok: true };
}
