export type ProdutoLinha = {
    id: number;
    nome: string;
    codigo: string;
    categoria: string;
    estoque: number;
    preco: string;
    quantidade: number;
    descricao: string;
    imagem: string;
};

export const produtosMockados: ProdutoLinha[] = [
    {
        id: 1,
        nome: "Cabo HDMI 2.0 4K",
        codigo: "SKU-0001",
        categoria: "Eletronicos",
        estoque: 25,
        preco: "R$89,90",
        quantidade: 25,
        descricao: "Cabo HDMI 2.0 com suporte a 4K e alta taxa de transmissao para uso em TVs e monitores.",
        imagem: "/cabo.png",
    },
    {
        id: 2,
        nome: "Carregador Turbo USB-C",
        codigo: "SKU-0002",
        categoria: "Acessorios",
        estoque: 42,
        preco: "R$129,90",
        quantidade: 42,
        descricao: "Carregador rapido USB-C com protecao contra sobrecarga e aquecimento.",
        imagem: "/carregador.avif",
    },
    {
        id: 3,
        nome: "Fonte Universal 65W",
        codigo: "SKU-0003",
        categoria: "Eletronicos",
        estoque: 11,
        preco: "R$219,90",
        quantidade: 11,
        descricao: "Fonte universal de 65W compativel com notebooks e dispositivos USB-C.",
        imagem: "/fonte.webp",
    },
    {
        id: 4,
        nome: "Notebook Pro 14",
        codigo: "SKU-0004",
        categoria: "Computadores",
        estoque: 7,
        preco: "R$7.499,90",
        quantidade: 7,
        descricao: "Notebook de alto desempenho com tela de 14 polegadas e bateria de longa duracao.",
        imagem: "/mac.jpeg",
    },
    {
        id: 5,
        nome: "Caneca Termica",
        codigo: "SKU-0005",
        categoria: "Casa",
        estoque: 0,
        preco: "R$39,90",
        quantidade: 0,
        descricao: "Caneca termica com isolamento para manter bebidas quentes ou frias por mais tempo.",
        imagem: "/xicara.jpeg",
    },
    {
        id: 6,
        nome: "Suporte Articulado para Monitor",
        codigo: "SKU-0006",
        categoria: "Escritorio",
        estoque: 18,
        preco: "R$249,90",
        quantidade: 18,
        descricao: "Suporte articulado para monitor com ajuste de altura, inclinacao e rotacao.",
        imagem: "/mac.jpeg",
    },
    {
        id: 7,
        nome: "Mouse Sem Fio Ergo",
        codigo: "SKU-0007",
        categoria: "Perifericos",
        estoque: 33,
        preco: "R$159,90",
        quantidade: 33,
        descricao: "Mouse ergonomico sem fio com sensor preciso e bateria de longa autonomia.",
        imagem: "/carregador.avif",
    },
    {
        id: 8,
        nome: "Teclado Mecanico Compacto",
        codigo: "SKU-0008",
        categoria: "Perifericos",
        estoque: 14,
        preco: "R$349,90",
        quantidade: 14,
        descricao: "Teclado mecanico compacto com switches de alta durabilidade e iluminacao ajustavel.",
        imagem: "/cabo.png",
    },
    {
        id: 9,
        nome: "Hub USB-C 7 em 1",
        codigo: "SKU-0009",
        categoria: "Acessorios",
        estoque: 21,
        preco: "R$279,90",
        quantidade: 21,
        descricao: "Hub USB-C 7 em 1 com portas HDMI, USB e leitor de cartao para expansao rapida.",
        imagem: "/fonte.webp",
    },
    {
        id: 10,
        nome: "Tomada Inteligente Wi-Fi",
        codigo: "SKU-0010",
        categoria: "Casa",
        estoque: 0,
        preco: "R$119,90",
        quantidade: 0,
        descricao: "Tomada inteligente com controle por app e comandos de voz via rede Wi-Fi.",
        imagem: "/xicara.jpeg",
    },
];
