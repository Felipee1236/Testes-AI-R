# Automação de Testes Web: WebdriverIO

[![Testes E2E](https://github.com/Felipee1236/Testes-AI-R/actions/workflows/e2e.yml/badge.svg)](https://github.com/Felipee1236/Testes-AI-R/actions/workflows/e2e.yml)

Projeto de automação E2E do site [Automation Exercise](https://automationexercise.com), desenvolvido como desafio técnico. Cobre as principais jornadas de um e-commerce: autenticação, cadastro, navegação e formulários.

> **Status:** 10 cenários implementados, com relatório Allure e pipeline no GitHub Actions. Execução em nuvem em andamento.

## Stack

| Ferramenta | Uso |
| --- | --- |
| [WebdriverIO](https://webdriver.io) | Framework de automação |
| TypeScript | Linguagem |
| Mocha | Test runner |
| Allure Report | Relatório interativo |
| GitHub Actions | Integração contínua |
| ESLint + Prettier | Qualidade e padronização do código |
| dotenv | Variáveis de ambiente |

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

## Execução

Todos os testes:

```bash
npm test
```

Um arquivo específico:

```bash
npx wdio run ./wdio.conf.ts --spec ./test/specs/auth.e2e.ts
```

Gerar e abrir o relatório Allure (após rodar os testes):

```bash
npm run report
```

Qualidade de código:

```bash
npm run lint      # verifica problemas no código
npm run format    # aplica a formatação padrão
```

## Estrutura do projeto

```
test/
├── pageobjects/          # Page Object Model: uma classe por página
│   ├── base.page.ts      # comportamento comum a todas as páginas
│   ├── home.page.ts      # cabeçalho: login, logout, usuário logado
│   ├── login.page.ts     # login e início do cadastro
│   ├── signup.page.ts    # formulário completo de cadastro
│   ├── account.page.ts   # telas de conta criada e excluída
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
.github/workflows/
└── e2e.yml               # pipeline de CI
├── utils/
│   ├── user.factory.ts   # gera usuários únicos por execução
│   ├── account.helper.ts # cria e exclui contas para preparar testes
│   └── data.loader.ts    # lê a massa de dados em JSON
└── data/
    └── invalid-logins.json  # casos do login inválido (data-driven)
```

## Cenários de teste

Os 10 cenários foram priorizados por risco e impacto nas jornadas principais, cobrindo os quatro grupos pedidos: autenticação, formulários, navegação e validação de erros.

| # | Cenário | Grupo | Tipo | Status |
| --- | --- | --- | --- | --- |
| 1 | Login com credenciais válidas | Autenticação | Sucesso | Implementado |
| 2 | Logout encerra a sessão | Autenticação | Sucesso | Implementado |
| 3 | Login com credenciais inválidas (data-driven) | Autenticação | Falha | Implementado |
| 4 | Cadastro completo de conta | Formulários | Sucesso | Implementado |
| 5 | Envio do formulário de contato | Formulários | Sucesso | Implementado |
| 6 | Cadastro com campo obrigatório vazio | Formulários | Falha | Implementado |
| 7 | Navegação por categoria de produtos | Navegação | Sucesso | Implementado |
| 8 | Detalhes de produto a partir da listagem | Navegação | Sucesso | Implementado |
| 9 | Cadastro com e-mail já existente | Validação | Falha | Implementado |
| 10 | Checkout sem login exige autenticação | Validação | Falha | Implementado |

Os 10 cenários geram 11 testes no relatório: o cenário 3 é data-driven e roda uma vez para cada caso do arquivo JSON (hoje, 2 casos).

A proporção de 6 cenários de sucesso para 4 de falha segue a pirâmide de testes: o E2E garante as jornadas críticas de ponta a ponta, enquanto validações campo a campo são mais baratas em camadas inferiores, como API e testes unitários.

## Relatório e evidências

O relatório Allure reúne:

| Requisito | Como é atendido |
| --- | --- |
| Status de execução | Pass, fail e skipped por teste e por suíte |
| Logs de execução | Cada comando do WebdriverIO aparece como um passo do teste |
| Screenshot na falha | O hook `afterTest` captura a tela quando um teste falha, e o Allure anexa a imagem ao teste |
| Metadados do ambiente | O hook `before` grava `environment.properties` com navegador, versão, plataforma, sistema operacional, Node e URL base, lidos da sessão real |

Os resultados anteriores são apagados no início de cada execução (hook `onPrepare`), para que o relatório nunca misture execuções diferentes.

## Integração contínua

A pipeline fica em `.github/workflows/e2e.yml` e roda automaticamente a cada `push` ou `pull_request` na branch `main`. Também pode ser disparada manualmente pela aba **Actions** (`workflow_dispatch`).

Etapas:

1. Instala Node.js 20, Java 17 (para o Allure) e as dependências com `npm ci`
2. Roda o ESLint: código fora do padrão barra a pipeline antes dos testes
3. Executa a suíte completa no Chrome em modo headless
4. Gera o relatório Allure e publica como artefato, **mesmo quando algum teste falha** (`if: always()`)

**Onde ver o relatório:** aba **Actions** → execução desejada → seção **Artifacts** → `allure-report`. Após baixar e extrair, abra com:

```bash
npx allure open allure-report
```

Diferenças da execução local, ativadas pela variável `CI` que o GitHub define automaticamente:

- Chrome em modo headless, com janela de 1920x1080 para manter o layout de desktop
- No máximo 2 navegadores em paralelo, para não sobrecarregar o servidor da pipeline

A `BASE_URL` é definida no próprio workflow, já que não é um dado sensível. Credenciais, como as do LambdaTest, ficam em **GitHub Secrets**.

## Decisões técnicas

### Page Object Model

Cada página do site é uma classe com os elementos (getters) e as ações (métodos). Os testes descrevem a jornada do usuário sem conhecer seletores. Se um seletor mudar, a correção acontece em um só lugar.

Fluxos que atravessam várias páginas e servem de preparação, como criar uma conta, ficam em `utils/account.helper.ts`, evitando código duplicado entre os testes.

### Estratégia de seletores

Prioridade: `id` e `data-qa` (equivalente ao `data-testid`), depois atributos funcionais como `href` e `action` (as mensagens de erro são localizadas por `form[action="/login"] p`). XPath não é usado. Selects são preenchidos por valor ou texto visível, nunca pela posição da opção.

Exceções justificadas: o título e os cards da listagem de produtos usam classe CSS, por não terem id nem `data-qa`; a subcategoria é localizada pelo texto dentro do painel da categoria (`#Women`), porque seu `href` é um número sem significado; e o link "Logged in as" é localizado pelo texto, que é justamente o conteúdo validado.

### Esperas explícitas

Nenhuma pausa fixa. As asserções do WebdriverIO (`toBeDisplayed`, `toHaveText`) aguardam o elemento automaticamente até o timeout configurado. Elementos que aparecem após animação, como as subcategorias do menu de produtos, usam `waitForClickable` antes do clique. O plugin `eslint-plugin-wdio` acusa erro se `browser.pause()` for usado.

### Massa de dados independente

Não existe conta fixa. Cada teste cria a própria conta, com e-mail único gerado por timestamp, e a exclui ao final:

- `beforeEach`: prepara o estado, como uma conta existente e deslogada
- `afterEach`: exclui a conta, mesmo se o teste falhar

Assim, os testes rodam em qualquer ordem, em qualquer máquina e quantas vezes forem necessárias, sem deixar dados no ambiente.

A preparação é feita pela interface, mantendo o projeto 100% E2E. O custo aceito é uma execução alguns segundos mais lenta.

### Testes data-driven

O login inválido lê seus casos de `test/data/invalid-logins.json`, e cada linha vira um teste no relatório. Para cobrir um caso novo, basta adicionar uma linha ao arquivo, sem alterar código. Casos atuais: senha incorreta para um e-mail cadastrado e e-mail não cadastrado.

### Execução em paralelo

Cada arquivo de spec roda em um navegador próprio, ao mesmo tempo (`maxInstances`). Isso só é possível porque os testes são independentes: cada um cria e exclui a própria massa de dados, com e-mail único gerado por timestamp mais um sufixo aleatório, evitando colisões entre execuções simultâneas.

### Validação nativa do navegador

No cenário 6, o campo de senha é `required`, e o próprio navegador bloqueia o envio sem exibir mensagem na página. O teste verifica `validity.valueMissing` do campo, que não depende do idioma do navegador, além de confirmar que a página não mudou e que a conta não foi criada.

### Variáveis de ambiente

A URL do site vem do `.env`. Não há valor padrão no código, de propósito: se a variável faltar, a execução falha imediatamente com uma mensagem clara, em vez de rodar em silêncio contra um ambiente diferente.

O `.env` nunca é versionado. O `.env.example` serve de modelo.

### Bloqueio de anúncios

O site exibe anúncios de terceiros que abrem em tela cheia ou cobrem botões, causando falhas aleatórias. O Chrome é iniciado com os domínios de anúncio bloqueados (`--host-resolver-rules`), já que o objetivo dos testes é validar o sistema, não conteúdo externo que ele não controla.

## Próximos passos

- [ ] Execução em nuvem no LambdaTest

### Melhorias fora do escopo atual

- Preparar e limpar a massa de dados via API do site, tornando os testes mais rápidos e isolando a preparação da interface
- Separar os testes de autenticação em blocos com e sem conta, para que casos como "e-mail não cadastrado" não criem uma conta que não usam
- Cenários candidatos: exclusão de conta, busca de produtos e fluxo completo de compra

## Autor

Felipe Campos de Souza · [LinkedIn](https://linkedin.com/in/felipe-campos-de-souza) · [GitHub](https://github.com/Felipee1236)