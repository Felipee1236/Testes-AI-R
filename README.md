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

  Cenário: Login com credenciais válidas
    Dado que existe uma conta cadastrada
    Quando faço login com o e-mail e a senha dessa conta
    Então vejo "Logged in as" seguido do meu nome no cabeçalho

  Esquema do Cenário: Login com credenciais inválidas
    Quando faço login com <situação>
    Então vejo a mensagem "Your email or password is incorrect!"
    E continuo deslogado

    Exemplos:
      | situação               |
      | senha incorreta        |
      | e-mail não cadastrado  |

Funcionalidade: Cadastro

  Cenário: Cadastro com e-mail já existente
    Dado que existe uma conta cadastrada com um e-mail
    Quando tento iniciar um novo cadastro com o mesmo e-mail
    Então vejo a mensagem "Email Address already exist!"

  Cenário: Cadastro com senha em branco
    Quando preencho o cadastro completo, exceto a senha
    E envio o formulário
    Então continuo na página de cadastro
    E a conta não é criada

Funcionalidade: Carrinho

  Cenário: Checkout sem login
    Dado que adicionei um produto ao carrinho sem estar logado
    Quando prossigo para o checkout
    Então sou avisado de que preciso entrar ou me cadastrar
```

## Relatório e evidências

O relatório Allure reúne:

| Requisito             | Como é atendido                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Status de execução    | Pass, fail e skipped por teste e por suíte                                                                                                                                                             |
| Logs de execução      | Cada comando do WebdriverIO aparece como um passo do teste                                                                                                                                             |
| Screenshot na falha   | Os hooks `afterTest` e `afterHook` capturam a tela quando um teste ou sua preparação (`beforeEach`/`afterEach`) falha, e o Allure anexa a imagem                                                       |
| Metadados do ambiente | O hook `before` grava `environment.properties` com navegador, versão, sistema operacional do navegador (na nuvem, o da máquina remota), sistema operacional de quem dispara os testes, Node e URL base |

Os resultados anteriores são apagados no início de cada execução (hook `onPrepare`), para que o relatório nunca misture execuções diferentes.

## Integração contínua

A pipeline fica em `.github/workflows/e2e.yml` e roda automaticamente a cada `push` ou `pull_request` na branch `main`. Também pode ser disparada manualmente pela aba **Actions** (`workflow_dispatch`).

Etapas:

1. Instala Node.js 20, Java 17 (para o Allure) e as dependências com `npm ci`
2. Verifica o código com ESLint, Prettier e TypeScript: problema, formatação fora do padrão ou erro de tipo barra a pipeline antes dos testes. A checagem de tipos é um passo próprio porque o WebdriverIO executa TypeScript sem validar os tipos
3. Executa a suíte completa no Chrome em modo headless
4. Gera o relatório Allure e publica como artefato, **mesmo quando algum teste falha** (`if: always()`)

Proteções da pipeline: limite de 20 minutos por execução (`timeout-minutes`), para que uma execução travada não consuma recursos indefinidamente, e cancelamento automático de execuções antigas da mesma branch quando um novo push chega (`concurrency`).

**Onde ver o relatório:** aba **Actions** → execução desejada → seção **Artifacts** → `allure-report`. Após baixar e extrair, abra com:

```bash
npx allure open allure-report
```

Diferenças da execução local, ativadas pela variável `CI` que o GitHub define automaticamente:

- Chrome em modo headless, com janela de 1920x1080 para manter o layout de desktop
- No máximo 2 navegadores em paralelo, para não sobrecarregar o servidor da pipeline
- Log do WebdriverIO só com avisos e erros (`warn`), porque o log da pipeline é público; o passo a passo de cada teste continua no relatório Allure

A `BASE_URL` é definida no próprio workflow, já que não é um dado sensível. Credenciais, como as do LambdaTest, ficam em **GitHub Secrets**.

## Decisões técnicas

### Page Object Model

Cada página do site é uma classe com os elementos (getters) e as ações (métodos). Os testes descrevem a jornada do usuário sem conhecer seletores. Se um seletor mudar, a correção acontece em um só lugar.

A preparação da massa de dados não passa pelos page objects: `utils/account.api.ts` cria e exclui contas pela API do site, e é compartilhado pelos testes que precisam de uma conta.

### Estratégia de seletores

Prioridade: `id` e `data-qa` (equivalente ao `data-testid`), depois atributos funcionais como `href` e `action` (as mensagens de erro são localizadas por `form[action="/login"] p`). XPath não é usado. Selects são preenchidos por valor ou texto visível, nunca pela posição da opção. Radio e checkboxes são marcados só se ainda estiverem desmarcados (`check`, em `base.page.ts`), porque um clique simples desmarcaria uma opção já marcada, e o cenário 4 confere o estado de cada um antes de enviar o formulário.

Exceções justificadas: o título e os cards da listagem de produtos usam classe CSS, por não terem id nem `data-qa`; a subcategoria é localizada pelo texto dentro do painel da categoria (`#Women`), porque seu `href` é um número sem significado; e o link "Logged in as" é localizado pelo texto, que é justamente o conteúdo validado.

### Esperas explícitas

Nenhuma pausa fixa. As asserções do WebdriverIO (`toBeDisplayed`, `toHaveText`) aguardam o elemento automaticamente até o timeout configurado. Elementos que aparecem após animação, como as subcategorias do menu de produtos, usam `waitForClickable` antes do clique. O plugin `eslint-plugin-wdio` acusa erro se `browser.pause()` for usado.

### Massa de dados independente

Não existe conta fixa. Cada teste cria a própria conta, com e-mail único gerado por timestamp, e a exclui ao final:

- `beforeEach`: cria a conta pela API do site (`POST /api/createAccount`)
- `afterEach`: exclui a conta pela API (`DELETE /api/deleteAccount`), mesmo se o teste falhar

Assim, os testes rodam em qualquer ordem, em qualquer máquina e quantas vezes forem necessárias, sem deixar dados no ambiente.

A preparação usa a API, e não a interface, porque não é o que está sendo testado: é mais rápida e não sofre com anúncios. A jornada de cadastro pela interface continua coberta pelo cenário 4.

A exclusão nunca derruba a suíte. No Mocha, uma falha no `afterEach` interrompe os testes seguintes do mesmo `describe`, que nem aparecem no relatório como pulados. Por isso, se a exclusão falhar, o teste só registra um aviso no log.

### Testes data-driven

O login inválido lê seus casos de `test/data/invalid-logins.json`, e cada linha vira um teste no relatório. Cada caso traz a própria mensagem esperada (`mensagemEsperada`), então casos com resultados diferentes também entram só com uma linha nova no arquivo, sem alterar código. Casos atuais: senha incorreta para um e-mail cadastrado e e-mail não cadastrado.

### Execução em paralelo

Cada arquivo de spec roda em um navegador próprio, ao mesmo tempo (`maxInstances`). Isso só é possível porque os testes são independentes: cada um cria e exclui a própria massa de dados, com e-mail único gerado por timestamp mais um sufixo aleatório, evitando colisões entre execuções simultâneas.

### Validação nativa do navegador

No cenário 6, o campo de senha é `required`, e o próprio navegador bloqueia o envio sem exibir mensagem na página. O teste verifica `validity.valueMissing` do campo, que não depende do idioma do navegador, além de confirmar que a página não mudou e que a conta não foi criada.

### Variáveis de ambiente

A URL do site vem do `.env`. Não há valor padrão no código, de propósito: se a variável faltar, a execução falha imediatamente com uma mensagem clara, em vez de rodar em silêncio contra um ambiente diferente.

O `.env` nunca é versionado. O `.env.example` serve de modelo.

### Senhas fora dos logs

O WebdriverIO registra o texto de cada campo preenchido, tanto no log quanto nos passos do relatório Allure, que a pipeline publica. Por isso, as senhas são digitadas com `setValue(senha, { mask: true })`, e o valor aparece como `**MASKED**` nos dois lugares.

### Anúncios de terceiros

O site exibe anúncios que abrem em tela cheia ou cobrem botões, causando falhas aleatórias. O objetivo dos testes é validar o sistema, não conteúdo externo que ele não controla, então há duas camadas de proteção:

1. **Bloqueio no navegador:** o Chrome é iniciado com os domínios de anúncio bloqueados (`--host-resolver-rules`). Funciona localmente e na pipeline.
2. **Tratamento na navegação:** na nuvem, o tráfego passa por um proxy e o bloqueio acima é ignorado. Por isso, os cliques em links usam `clickLink` (em `base.page.ts`), que espera a URL mudar e, se o anúncio intersticial interceptou a navegação (`#google_vignette`), abre o destino do link diretamente. Quando isso acontece, o teste registra um passo no relatório Allure e um aviso no log, para que fique claro que aquela navegação não foi feita pelo clique.

Com os anúncios visíveis na nuvem, alguns elementos podem ser empurrados para fora da tela. Links que dependem de animação são esperados com `waitForDisplayed` e trazidos para a área visível com `scrollIntoView` antes do clique.

### Verificações independentes de renderização

O título da categoria é validado com expressão regular (`/women\s*-\s*dress products/i`), que ignora maiúsculas e espaços extras. Versões diferentes do Chrome renderizaram o mesmo título com espaçamento diferente, e a verificação não deve depender disso.

### Execução em nuvem

`wdio.lambdatest.conf.ts` herda toda a configuração local (`...baseConfig`) e sobrescreve apenas o que muda na nuvem: endereço do grid, credenciais, sistema operacional, resolução, uma sessão por vez (limite do plano gratuito) e uma reexecução por teste.

A reexecução (`retries: 1`) existe só na nuvem, onde anúncios de terceiros que não podem ser bloqueados tornam alguns testes instáveis. A instabilidade fica visível no relatório (aba **Retries** do Allure), assim como cada uso do contorno de anúncio descrito acima. Localmente e na pipeline não há reexecução: se um teste falha, é falha. O serviço `wdio-lambdatest-service` marca cada teste como aprovado ou reprovado no painel. As credenciais vêm do `.env`, com a mesma validação de falha rápida usada para a URL.

## Melhorias futuras

- Separar os testes de autenticação em blocos com e sem conta, para que casos como "e-mail não cadastrado" não criem uma conta que não usam
- Executar na nuvem também pela pipeline, com as credenciais em GitHub Secrets, em uma matriz de navegadores
- Cenários candidatos: exclusão de conta, busca de produtos e fluxo completo de compra

## Autor

Felipe Campos de Souza · [LinkedIn](https://linkedin.com/in/felipe-campos-de-souza) · [GitHub](https://github.com/Felipee1236)
