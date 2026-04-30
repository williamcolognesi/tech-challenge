# No Bolso - Aplicativo de Gestão de Transações Financeiras

Um aplicativo moderno para controle de finanças pessoais construído com **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS** e **Shadcn/ui**.

## 🚀 Características

- 💰 **Dashboard** com saldo em tempo real e extrato de transações
- ➕ **Gestão de Transações** - adicionar, editar e remover transações
- 📊 **Relatórios** - visualizar movimentações por categoria e período
- 🎨 **Design Responsivo** - interface adaptável para desktop, tablet e mobile
- 🔐 **Autenticação Mock** - fluxo de login/registro para testes
- 📖 **Storybook** - documentação completa de componentes

## 🛠️ Stack de Tecnologias

- **Framework:** Next.js 16.2.2 com App Router
- **Linguagem:** TypeScript 5
- **UI:** React 19.2.4
- **Estilos:** Tailwind CSS 4
- **Componentes:** Shadcn/ui (18+ componentes)
- **Documentação:** Storybook 10.3.6
- **Ferramentas:** ESLint, PostCSS

## 📋 Pré-requisitos

- Node.js 18+ e npm 9+
- Navegador moderno (Chrome, Firefox, Safari ou Edge)

## ⚙️ Instalação e Execução

### 1. Clonar e Instalar Dependências

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd tech-challenge

# Instalar dependências
npm install
```

### 2. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

**Credenciais de Teste:**
- Email: `teste@email.com`
- Senha: qualquer valor

### 3. Visualizar Documentação de Componentes

```bash
npm run storybook
```

Acesse [http://localhost:6007](http://localhost:6007) para explorar todos os componentes documentados.

## 📦 Build e Deploy

### Build de Produção

```bash
npm run build
```

Gera uma versão otimizada em `.next/`

### Iniciar Servidor de Produção

```bash
npm run start
```

Inicia o servidor em modo produção (requer `npm run build` prévio).

### Build Estático do Storybook

```bash
npm run build-storybook
```

Gera versão estática do Storybook em `storybook-static/`

## 🔍 Qualidade de Código

```bash
npm run lint
```

Verifica erros e avisos de código com ESLint.

## 🏗️ Principais Funcionalidades

### Autenticação
- Fluxo de login/registro com mock de dados
- Proteção de rotas privadas com middleware
- Persistência de sessão com cookies

### Dashboard (Página Inicial)
- Exibição de saldo total da conta
- Extrato das últimas transações
- Visualização de tendências

### Gestão de Transações
- Criar nova transação com categoria
- Editar transação existente
- Remover transação com confirmação
- Filtrar por período e categoria
- Busca por descrição

### Design System
- 18+ componentes reutilizáveis documentados
- Tema consistente com Tailwind CSS
- Componentes responsivos e acessíveis

## 📚 Documentação de Componentes

O projeto inclui documentação completa de todos os componentes através do Storybook:

```bash
npm run storybook
```

**Componentes Documentados:**
- **UI Base:** Button, Input, Card, Badge, Dialog, Select, Avatar, Checkbox, Label, Separator, Popover, Sheet, AlertDialog, Table, Calendar, Chart
- **Componentes de Layout:** Header, Sidebar
- **Componentes Customizados:** VirtualCard

Cada componente possui múltiplas histórias (stories) demonstrando diferentes estados e variações.

## 🔄 Fluxo de Desenvolvimento

1. **Desenvolver** - Execute `npm run dev` e edite os arquivos
2. **Componentes** - Crie stories no Storybook durante o desenvolvimento (`npm run storybook`)
3. **Build** - Valide com `npm run build` antes de commits
4. **Deploy** - O build é otimizado automaticamente para produção

## 🧪 Testes e Validação

```bash
# Executar build de produção
npm run build

# Verificar qualidade de código
npm run lint

# Construir Storybook estático
npm run build-storybook
```

## 📖 Recursos de Aprendizado

- [Documentação Next.js](https://nextjs.org/docs) - Features e API
- [React Documentation](https://react.dev) - Conceitos e hooks
- [Tailwind CSS](https://tailwindcss.com/docs) - Guia de classes
- [Shadcn/ui](https://ui.shadcn.com) - Componentes base
- [Storybook](https://storybook.js.org/docs) - Documentação interativa

## Estrutura de pastas

```text
├── app/                      # CAMADA DE ROTEAMENTO E ORQUESTRAÇÃO
│   │
│   ├── (auth)/               # GRUPO PÚBLICO: Fluxo de Autenticação
│   │   ├── login/
│   │   │   └── page.tsx      # Rota: /login
│   │   ├── registro/
│   │   │   └── page.tsx      # Rota: /registro
│   │   └── layout.tsx    
│   │
│   ├── (private)/            # GRUPO PRIVADO
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Rota: /dashboard (Listagem de transações)
│   │   │   └── dashboard-content.tsx 
│   │   ├── transactions/
│   │   │   └── page.tsx      # Rota: /transactions (Listagem de transações)
│   │   └── layout.tsx        # Layout aplicacao
│   │
│   ├── layout.tsx            # Root Layout (Injeção de fontes e CSS global)
│   ├── globals.css           # Tailwind CSS e classes globais
│   └── page.tsx              # Pagina inicial

│
├── components/               # DESIGN SYSTEM E COMPONENTES ESTRUTURAIS        
│   │
│   ├── ui/                   # Os componentes base do Design System.
│   └── layout/               # Peças visuais que compõem o layout da página.
│
├── features/                 # Domínios de Negócio
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
│   │
│   ├── factories/            # Instâncias singleton dos serviços da aplicação
│   │   └── transaction.factory.ts  # Define qual repositório usar
│   └── utils.ts              # Utilitários genéricos (ex: formatação de moeda, datas, merge de classes)
│
└── mocks/                    # SIMULAÇÃO DE DADOS
    ├── transaction/
    │   ├── data/
    │   │   └── transactions.ts             # Dados iniciais (seed) de transações
    │   └── transaction.repository.mock.ts  # Implementação em memória do ITransactionRepository
    ├── news/
    │   ├── data/
    │   │   └── news.ts        # Dados de noticias
    ├── user/
    │   ├── data/
    │   │   └── news.ts        # Dados de usuarios

```

## 🤝 Contribuindo

Ao contribuir para este projeto, siga as boas práticas de arquitetura descritas acima e garanta que:

1. Todo componente novo tenha uma story correspondente no Storybook
2. O build passa sem erros (`npm run build`)
3. O código segue os padrões do linter (`npm run lint`)
4. A estrutura de pastas não é modificada sem discussão prévia

## 📝 Licença

Este projeto é fornecido para fins educacionais como parte do desafio técnico FIAP.
