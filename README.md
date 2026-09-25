# Automação de Testes Web: WebdriverIO

[![Testes E2E](https://github.com/Felipee1236/Testes-AI-R/actions/workflows/e2e.yml/badge.svg)](https://github.com/Felipee1236/Testes-AI-R/actions/workflows/e2e.yml)

Projeto de automação E2E do site [Automation Exercise](https://automationexercise.com), desenvolvido como desafio técnico. Cobre as principais jornadas de um e-commerce: autenticação, cadastro, navegação e formulários.

> **Status:** 10 cenários implementados, executados localmente, na pipeline do GitHub Actions e na nuvem (LambdaTest), com relatório Allure.

## Stack

| Ferramenta                          | Uso                                |
| ----------------------------------- | ---------------------------------- |
| [WebdriverIO](https://webdriver.io) | Framework de automação             |
| TypeScript                          | Linguagem                          |
| Mocha                               | Test runner                        |
| Allure Report                       | Relatório interativo               |
| GitHub Actions                      | Integração contínua                |
| LambdaTest (atual TestMu AI)        | Execução em nuvem                  |
| ESLint + Prettier                   | Qualidade e padronização do código |
| dotenv                              | Variáveis de ambiente              |

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- Google Chrome atualizado (o driver é baixado automaticamente)
- Java 8 ou superior, para gerar o relatório Allure

## Instalação

```bash
git clone https://github.com/Felipee1236/Testes-AI-R.git
cd Testes-AI-R
npm install
```

Crie o arquivo `.env` a partir do modelo:

```bash
# Windows
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

O `.env.example` já vem com a URL do site preenchida. Se o `.env` não existir, a execução para com uma mensagem indicando o que fazer.

Para executar na nuvem, preencha também as credenciais do LambdaTest no `.env` (disponíveis em **Account Settings → Password & Security** no painel):

```
LT_USERNAME=seu-usuario
LT_ACCESS_KEY=sua-chave
```

## Execução

Todos os testes:

```bash
npm test
```

Um arquivo específico:

```bash
npx wdio run ./wdio.conf.ts --spec ./test/specs/auth.e2e.ts
```

Na nuvem (LambdaTest), em Chrome no Windows 11:

```bash
npm run test:lambdatest
```

A execução pode ser acompanhada em **Automation → Web Automation** no painel do LambdaTest, com vídeo e log de cada teste.

Gerar e abrir o relatório Allure (após rodar os testes):

```bash
npm run report
```

Qualidade de código:

```bash
npm run lint          # verifica problemas no código
npm run format        # aplica a formatação padrão
npm run format:check  # verifica se a formatação está aplicada
npm run typecheck     # verifica os tipos do TypeScript
```

## Estrutura do projeto

```
test/
├── pageobjects/          # Page Object Model: uma classe por página
│   ├── base.page.ts      # comportamento comum a todas as páginas
│   ├── home.page.ts      # cabeçalho: login, logout, usuário logado
│   ├── login.page.ts     # login e início do cadastro
│   ├── signup.page.ts    # formulário completo de cadastro
│   ├── account.page.ts   # tela de conta criada
│   ├── products.page.ts  # listagem, filtro por categoria e carrinho
│   ├── product-details.page.ts # detalhes de um produto
│   ├── cart.page.ts      # carrinho e modal de checkout
│   └── contact.page.ts   # formulário de contato
├── specs/                # testes, um arquivo por funcionalidade
│   ├── auth.e2e.ts       # cenários 1, 2 e 3
│   ├── signup.e2e.ts     # cenários 4, 6 e 9
│   ├── contact.e2e.ts    # cenário 5
│   ├── navigation.e2e.ts # cenários 7 e 8
│   └── cart.e2e.ts       # cenário 10
├── utils/
│   ├── user.factory.ts   # gera usuários únicos por execução
│   ├── account.api.ts    # cria e exclui contas pela API do site
│   └── data.loader.ts    # lê a massa de dados em JSON
└── data/
    └── invalid-logins.json  # casos do login inválido (data-driven)
.github/workflows/
└── e2e.yml               # pipeline de CI
wdio.conf.ts              # configuração local e da pipeline
wdio.lambdatest.conf.ts   # configuração da nuvem (herda a local)
```

## Cenários de teste

Os 10 cenários foram priorizados por risco e impacto nas jornadas principais, cobrindo os quatro grupos pedidos: autenticação, formulários, navegação e validação de erros.

| #   | Cenário                                       | Grupo        | Tipo    | Status       |
| --- | --------------------------------------------- | ------------ | ------- | ------------ |
| 1   | Login com credenciais válidas                 | Autenticação | Sucesso | Implementado |
| 2   | Logout encerra a sessão                       | Autenticação | Sucesso | Implementado |
| 3   | Login com credenciais inválidas (data-driven) | Autenticação | Falha   | Implementado |
| 4   | Cadastro completo de conta                    | Formulários  | Sucesso | Implementado |
| 5   | Envio do formulário de contato                | Formulários  | Sucesso | Implementado |
| 6   | Cadastro com campo obrigatório vazio          | Formulários  | Falha   | Implementado |
| 7   | Navegação por categoria de produtos           | Navegação    | Sucesso | Implementado |
| 8   | Detalhes de produto a partir da listagem      | Navegação    | Sucesso | Implementado |
| 9   | Cadastro com e-mail já existente              | Validação    | Falha   | Implementado |
| 10  | Checkout sem login exige autenticação         | Validação    | Falha   | Implementado |

Os 10 cenários geram 11 testes no relatório: o cenário 3 é data-driven e roda uma vez para cada caso do arquivo JSON (hoje, 2 casos).

A proporção de 6 cenários de sucesso para 4 de falha segue a pirâmide de testes: o E2E garante as jornadas críticas de ponta a ponta, enquanto validações campo a campo são mais baratas em camadas inferiores, como API e testes unitários.

### Cenários em linguagem de negócio

Os testes são implementados em Mocha, conforme a stack recomendada. Para comunicação com áreas de negócio, os principais cenários também estão descritos em Gherkin:

```gherkin
Funcionalidade: Autenticação

```
