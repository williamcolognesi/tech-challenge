This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Estrutura de pastas

```text
src/
├── app/                      # CAMADA DE ROTEAMENTO E ORQUESTRAÇÃO
│                             # Aqui ficam APENAS as páginas visíveis na URL.
│                             # Nenhuma regra de negócio pesada deve ficar aqui.
│   │
│   ├── (auth)/               # GRUPO PÚBLICO: Fluxo de Autenticação
│   │   ├── login/
│   │   │   └── page.tsx      # Rota: /login
│   │   └── layout.tsx        # Layout simples (ex: tela cheia, sem sidebar)
│   │
│   ├── (private)/            # GRUPO PRIVADO: A Aplicação Principal
│   │   ├── page.tsx          # Rota: / (Home Page - Saldo da conta e Extrato)
│   │   ├── transactions/
│   │   │   └── page.tsx      # Rota: /transactions (Listagem de transações)
│   │   └── layout.tsx        # Layout complexo (Sidebar, Header de usuário logado)
│   │
│   ├── layout.tsx            # Root Layout (Injeção de fontes e CSS global)
│   └── globals.css           # Tailwind CSS e classes globais
│
├── components/               # DESIGN SYSTEM E COMPONENTES ESTRUTURAIS
│                             # Tudo aqui é "burro". Não sabem o que é uma transação ou login.
│   │
│   ├── ui/                   # Os componentes base do Design System.
│   │                         # Aqui ficarão os wrappers do PrimeReact(Unstyled) ou Shadcn + Tailwind.
│   │                         # Ex: Button.tsx, Modal.tsx, Input.tsx.
│   │
│   └── layout/               # Peças visuais que compõem o layout da página.
│                             # Ex: Sidebar.tsx, Header.tsx, UserMenu.tsx.
│
├── features/                 # O CORAÇÃO DO SISTEMA (Domínios de Negócio)
│                             # REGRA DE OURO: Uma feature não importa arquivos de outra feature.
│   │
│   ├── transactions/         # DOMÍNIO: Transações Financeiras
│   │   ├── api/              # Funções isoladas de entrada e saída de dados
│   │   │   ├── queries/      # Leitura de dados para Server Components (ex: getTransactions, getBalance)
│   │   │   └── actions/      # Mutações via Server Actions (ex: createTransaction, deleteTransaction)
│   │   ├── components/       # Componentes atrelados à regra de negócio (ex: TransactionForm, TransactionList)
│   │   ├── hooks/            # Hooks de controle de estado (ex: useCreateTransaction)
│   │   ├── repositories/     # Contrato e implementações de acesso a dados
│   │   │                     # A interface define O QUE o sistema precisa. (ex: ITransactionRepository)
│   │   ├── services/         # Regras de negócio puras e orquestração (ex: TransactionService)
│   │   │                     # Não sabe de onde os dados vieram nem para onde vão.
│   │   │                     # Pode ser chamado por actions, scripts ou testes sem nenhuma adaptação.
│   │   ├── model/            # Tipos, constantes e interfaces do domínio (ex: ITransaction)
│   │   └── utils/            # Regras específicas do domínio (ex: calculateBalance)
│   │
│   └── auth/                 # DOMÍNIO: Autenticação
│       ├── api/              # Funções de validação de mock login
│       └── components/       # LoginForm, RegisterForm
│
├── lib/                      # FERRAMENTAS E INTEGRAÇÕES
│                             # Configurações de terceiros e utilitários que não são regra de negócio.
│   │
│   ├── factories/            # Instâncias singleton dos serviços da aplicação
│   │   └── transaction.factory.ts  # Define qual repositório usar
│   └── utils.ts              # Utilitários genéricos (ex: formatação de moeda, datas, merge de classes)
│
├── mocks/                    # SIMULAÇÃO DE DADOS
│                             # Simula a camada de persistência durante o desenvolvimento.
│                             # Substituível pelo banco real sem alterar features ou services.
│   └── transaction/
│       ├── data/
│       │   └── transactions.ts             # Dados iniciais (seed) de transações
│       └── transaction.repository.mock.ts  # Implementação em memória do ITransactionRepository
│
└── proxy.ts                  # O GUARDIÃO DA BORDA (Segurança)
                              # Intercepta as rotas do (dashboard) e verifica os cookies.
                              # Se o mock de usuário não estiver logado, redireciona para /login.
```

## Boas praticas de Arquitetura

> **1. A Regra do Design System:** Não se deve importar o a lib de componentes diretamente nas páginas do `app/` ou nas `features/`. Todos os componentes devem passar pelo nosso Design System (`src/components/ui/`).

> **2. A Regra da Responsabilidade Visual:** A pasta `app/` serve apenas para criar a URL e juntar as peças. Se o arquivo da página (`page.tsx`) começar a ter responsabilidades, extraia a lógica para um componente dentro da respectiva `feature/`.

> **3. A Regra do Isolamento de Domínio:** Se a `feature/auth` precisar conversar com a `feature/transactions`, isso deve ser feito pela página no `app/` através de injeção de propriedades (Slots/Children), NUNCA através de imports diretos entre as pastas.