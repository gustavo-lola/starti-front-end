# Starti Front Teste Tecnico

Aplicacao web para gestao de produtos e vitrine, desenvolvida com React + TypeScript + Vite.

## Requisitos

- Node.js 20+
- pnpm 9+

## Como rodar este projeto

1. Instale as dependencias:

```bash
pnpm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
pnpm dev
```

3. Abra no navegador o endereco exibido no terminal (normalmente `http://localhost:5173`).

## Mini escopo estrutural da tela (cadastro + listagem)

1. Topo da tela:

- Titulo da pagina
- Subtitulo com objetivo da acao
- CTA principal (salvar/cadastrar)

2. Bloco esquerdo (Cadastro):

- Formulario com dados principais do produto
- Sessao de upload de imagens
- Acoes de formulario (`Limpar`, `Cadastrar produto`)

3. Bloco direito ou abaixo (Listagem):

- Campo de busca
- Filtro por categoria
- Grade/tabela de produtos
- Acoes por item (`Visualizar`, `Editar`, `Adicionar ao carrinho` quando aplicavel)

4. Estados de interface:

- Carregando
- Vazio (sem produtos)
- Erro de validacao
- Sucesso de cadastro/atualizacao

## Parte 1: respostas solicitadas

### 1. Quais campos de texto e botoes sao essenciais para cadastrar e listar um produto nesse software?

Campos essenciais para cadastro:

- Nome do produto
- Codigo SKU
- Categoria
- Preco
- Estoque
- Quantidade
- Descricao tecnica
- Imagem principal (e opcionalmente imagens adicionais)

Botoes essenciais no cadastro:

- `Cadastrar produto`
- `Limpar`
- `Adicionar imagens`
- `Remover imagem`

Campos/filtros essenciais na listagem:

- Busca por nome/descricao
- Filtro por categoria

Botoes essenciais na listagem:

- `Visualizar produto`
- `Editar produto`
- `Adicionar ao carrinho` (se a listagem estiver conectada a vitrine)

### 2. Como voce organizaria esses elementos nas telas para facilitar o uso pelo lojista?

- Header com titulo, resumo e acao principal.
- Formulario dividido em secoes: `Informacoes basicas`, `Estoque e precificacao`, `Imagens`.
- Campos mais usados no topo (nome, SKU, preco, categoria).
- Feedback imediato abaixo de cada campo com erro.
- Listagem com filtros fixos no topo (busca + categoria) e resultados logo abaixo.
- Cartoes/tabela exibindo: imagem, nome, SKU, preco, estoque e acoes rapidas.
- Layout responsivo:
    - Desktop: cadastro e listagem lado a lado.
    - Mobile: secoes empilhadas com CTA fixo no rodape.

### 3. Quais cores/identidade visual voce usaria para a construcao dessas interfaces?

- Estilo: profissional, limpo e orientado a produtividade do lojista.
- Cor primaria: azul profundo (`#1D4ED8`) para acoes principais e links.
- Cor secundaria: verde (`#059669`) para estados de sucesso e indicadores positivos.
- Cor de erro: vermelho (`#DC2626`) para validacoes e falhas.
- Base neutra: cinzas frios (`#0F172A`, `#334155`, `#E2E8F0`, `#F8FAFC`) para manter contraste e legibilidade.
- Tipografia: sem serifa de alta leitura, com hierarquia clara entre titulo, rotulo e valor.
- Acessibilidade: contraste minimo AA, foco visivel e estados de hover/disabled consistentes.
