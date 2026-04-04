import { useState, type FormEvent } from "react";
import { cadastrarProduto } from "@/services/products";
import { FORM_INICIAL, type NovoProdutoErrors, type NovoProdutoForm } from "@/types/products";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ProdutoImagensUpload } from "./ProductImagesUpload";
import { ProdutoInformacoesForm } from "./ProductInfoForm";
import { possuiErros, primeiraMensagemErro, validarNovoProdutoForm } from "./validation";

function lerArquivoComoDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
                return;
            }

            reject(new Error("Falha ao ler arquivo."));
        };

        reader.onerror = () => reject(new Error("Falha ao ler arquivo."));
        reader.readAsDataURL(file);
    });
}

export function NovoProdutoConteudo() {
    const navigate = useNavigate();
    const [form, setForm] = useState<NovoProdutoForm>(FORM_INICIAL);
    const [errors, setErrors] = useState<NovoProdutoErrors>({});
    const [isSaving, setIsSaving] = useState(false);
    const [imagens, setImagens] = useState<string[]>([]);

    function atualizarCampo<K extends keyof NovoProdutoForm>(campo: K, valor: NovoProdutoForm[K]) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        setErrors((prev) => ({ ...prev, [campo]: undefined }));
    }

    async function handleSelecionarArquivos(files: FileList) {
        const arquivos = Array.from(files);
        const novasImagens = await Promise.all(arquivos.map((arquivo) => lerArquivoComoDataUrl(arquivo)));

        setImagens((prev) => [...prev, ...novasImagens]);
        setErrors((prev) => ({ ...prev, imagens: undefined }));
    }

    function handleRemoverImagem(imagem: string) {
        setImagens((prev) => prev.filter((item) => item !== imagem));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const errosFormulario = validarNovoProdutoForm(form);
        if (imagens.length === 0) {
            errosFormulario.imagens = "Adicione pelo menos uma imagem do produto.";
        }
        setErrors(errosFormulario);

        if (possuiErros(errosFormulario)) {
            toast.error(primeiraMensagemErro(errosFormulario) ?? "Revise os campos obrigatorios.");
            return;
        }

        const toastId = toast.loading("Cadastrando produto...");
        setIsSaving(true);

        try {
            const resultado = await cadastrarProduto({
                ...form,
                imagem: imagens[0],
            });

            if (!resultado.ok) {
                throw new Error(resultado.mensagem);
            }

            toast.update(toastId, {
                render: `Produto ${resultado.produtoCriado.nome} cadastrado com sucesso.`,
                type: "success",
                isLoading: false,
                autoClose: 2600,
            });

            setForm(FORM_INICIAL);
            setErrors({});
            setImagens([]);
            navigate("/");
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : "Nao foi possivel cadastrar o produto.";

            toast.update(toastId, {
                render: mensagem,
                type: "error",
                isLoading: false,
                autoClose: 3200,
            });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-3 flex-1">
                <section className="rounded-xl  border-border bg-card p-4">
                    <header className="mb-4">
                        <h2 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">
                            Novo produto
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Cadastre um novo item no catalogo com variacoes, estoque e imagens.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ProdutoInformacoesForm form={form} errors={errors} onChange={atualizarCampo} />

                        <ProdutoImagensUpload
                            imagens={imagens}
                            erro={errors.imagens}
                            onSelecionarArquivos={handleSelecionarArquivos}
                            onRemoverImagem={handleRemoverImagem}
                        />

                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setForm(FORM_INICIAL);
                                    setErrors({});
                                    setImagens([]);
                                }}
                                disabled={isSaving}
                                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:cursor-pointer hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Limpar
                            </button>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
                            >
                                {isSaving ? "Cadastrando..." : "Cadastrar produto"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
