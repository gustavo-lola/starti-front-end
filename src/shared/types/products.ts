export type NovoProdutoForm = {
    nome: string;
    codigo: string;
    categoria: string;
    preco: string;
    estoque: number;
    quantidade: number;
    descricao: string;
};

export type NovoProdutoErrors = Partial<Record<keyof NovoProdutoForm | "imagens", string>>;

export type StatusFiltro = "todos" | "com_estoque" | "sem_estoque";

export const FORM_INICIAL: NovoProdutoForm = {
    nome: "",
    codigo: "",
    categoria: "",
    preco: "",
    estoque: 0,
    quantidade: 0,
    descricao: "",
};

export const CATEGORIAS = ["Eletronicos", "Acessorios", "Perifericos", "Computadores", "Casa", "Escritorio"];

type AnimatedIconHandle = {
    startAnimation: () => void;
    stopAnimation: () => void;
};

export type MetricaComAnimacaoProps = {
    titulo: string;
    valor: number;
    descricao: string;
    iconRef: React.RefObject<AnimatedIconHandle | null>;
    icon: React.ReactNode;
};

export type ProdutoImagensUploadProps = {
    imagens: string[];
    erro?: string;
    onSelecionarArquivos: (files: FileList) => void;
    onRemoverImagem: (imagem: string) => void;
};

export type ProdutoInformacoesFormProps = {
    form: NovoProdutoForm;
    errors: NovoProdutoErrors;
    onChange: <K extends keyof NovoProdutoForm>(campo: K, valor: NovoProdutoForm[K]) => void;
};
