import type { ChangeEvent } from "react";
import { Input } from "@/shared/components/ui/input";
import type { ProdutoImagensUploadProps } from "@/shared/types/products";
import { PiImageSquare } from "react-icons/pi";

export function ProdutoImagensUpload({
    imagens,
    erro,
    onSelecionarArquivos,
    onRemoverImagem,
}: ProdutoImagensUploadProps) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const arquivos = event.target.files;

        if (arquivos && arquivos.length > 0) {
            onSelecionarArquivos(arquivos);
        }

        event.target.value = "";
    }

    return (
        <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">Imagens e variacoes</h3>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                    <PiImageSquare size={16} />
                    Adicionar imagens
                    <Input type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />
                </label>
            </div>

            {erro ? <p className="text-xs text-destructive">{erro}</p> : null}

            {imagens.length > 0 ? (
                <div className="flex flex-nowrap gap-4 overflow-x-auto pb-2">
                    {imagens.map((imagem) => (
                        <div key={imagem} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-card">
                            <img src={imagem} alt="Nova variacao" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => onRemoverImagem(imagem)}
                                className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white"
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">Nenhuma imagem adicionada ainda.</p>
            )}
        </section>
    );
}
