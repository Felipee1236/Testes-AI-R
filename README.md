# Testes-AI-R
# Automação de Testes Web: WebdriverIO

Projeto de automação E2E do site [Automation Exercise](https://automationexercise.com), desenvolvido como desafio técnico. Cobre as principais jornadas de um e-commerce: autenticação, cadastro, navegação e formulários.

> **Status:** em desenvolvimento. A tabela de [cenários](#cenários-de-teste) mostra o que já está implementado.

## Stack

| Ferramenta | Uso |
| --- | --- |
| [WebdriverIO](https://webdriver.io) | Framework de automação |
| TypeScript | Linguagem |
| Mocha | Test runner |
| Allure Report | Relatório interativo |
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
npx wdio run ./wdio.conf.ts
```

Um arquivo específico:

```bash
npx wdio run ./wdio.conf.ts --spec ./test/specs/auth.e2e.ts
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
│   └── account.page.ts   # telas de conta criada e excluída
├── specs/                # testes, um arquivo por funcionalidade
│   ├── auth.e2e.ts
│   └── signup.e2e.ts
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
| 5 | Envio do formulário de contato | Formulários | Sucesso | Planejado |
| 6 | Cadastro com campo obrigatório vazio | Formulários | Falha | Planejado |
| 7 | Navegação por categoria de produtos | Navegação | Sucesso | Planejado |
| 8 | Detalhes de produto a partir da listagem | Navegação | Sucesso | Planejado |
| 9 | Cadastro com e-mail já existente | Validação | Falha | Implementado |
| 10 | Checkout sem login exige autenticação | Validação | Falha | Planejado |

A proporção de 6 cenários de sucesso para 4 de falha segue a pirâmide de testes: o E2E garante as jornadas críticas de ponta a ponta, enquanto validações campo a campo são mais baratas em camadas inferiores, como API e testes unitários.

## Decisões técnicas

### Page Object Model

Cada página do site é uma classe com os elementos (getters) e as ações (métodos). Os testes descrevem a jornada do usuário sem conhecer seletores. Se um seletor mudar, a correção acontece em um só lugar.

Fluxos que atravessam várias páginas e servem de preparação, como criar uma conta, ficam em `utils/account.helper.ts`, evitando código duplicado entre os testes.

### Estratégia de seletores

Prioridade: `id` e `data-qa` (equivalente ao `data-testid`), depois atributos funcionais como `href` e `action` (as mensagens de erro são localizadas por `form[action="/login"] p`). XPath não é usado. Selects são preenchidos por valor ou texto visível, nunca pela posição da opção. A única exceção é o texto "Logged in as", que não possui id nem `data-qa` e é justamente o conteúdo validado.

### Esperas explícitas

Nenhuma pausa fixa. As asserções do WebdriverIO (`toBeDisplayed`, `toHaveText`) aguardam o elemento automaticamente até o timeout configurado. O plugin `eslint-plugin-wdio` acusa erro se `browser.pause()` for usado.

### Massa de dados independente

Não existe conta fixa. Cada teste cria a própria conta, com e-mail único gerado por timestamp, e a exclui ao final:

- `beforeEach`: prepara o estado, como uma conta existente e deslogada
- `afterEach`: exclui a conta, mesmo se o teste falhar

Assim, os testes rodam em qualquer ordem, em qualquer máquina e quantas vezes forem necessárias, sem deixar dados no ambiente.

A preparação é feita pela interface, mantendo o projeto 100% E2E. O custo aceito é uma execução alguns segundos mais lenta.

### Testes data-driven

O login inválido lê seus casos de `test/data/invalid-logins.json`, e cada linha vira um teste no relatório. Para cobrir um caso novo, basta adicionar uma linha ao arquivo, sem alterar código. Casos atuais: senha incorreta para um e-mail cadastrado e e-mail não cadastrado.

### Variáveis de ambiente

A URL do site vem do `.env`. Não há valor padrão no código, de propósito: se a variável faltar, a execução falha imediatamente com uma mensagem clara, em vez de rodar em silêncio contra um ambiente diferente.

O `.env` nunca é versionado. O `.env.example` serve de modelo.

### Bloqueio de anúncios

O site exibe anúncios de terceiros que abrem em tela cheia ou cobrem botões, causando falhas aleatórias. O Chrome é iniciado com os domínios de anúncio bloqueados (`--host-resolver-rules`), já que o objetivo dos testes é validar o sistema, não conteúdo externo que ele não controla.

## Próximos passos

- [ ] Completar os 10 cenários
- [ ] Captura de screenshot em falhas, anexada ao Allure
- [ ] Pipeline no GitHub Actions com relatório como artefato
- [ ] Execução em nuvem no LambdaTest

### Melhorias fora do escopo atual

- Preparar e limpar a massa de dados via API do site, tornando os testes mais rápidos e isolando a preparação da interface
- Separar os testes de autenticação em blocos com e sem conta, para que casos como "e-mail não cadastrado" não criem uma conta que não usam
- Cenários candidatos: exclusão de conta, busca de produtos e fluxo completo de compra

## Autor

Felipe Campos de Souza · [LinkedIn](https://linkedin.com/in/felipe-campos-de-souza) · [GitHub](https://github.com/Felipee1236)