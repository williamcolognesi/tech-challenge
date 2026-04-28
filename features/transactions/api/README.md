# Transactions — API

Camada de comunicação entre as páginas e o serviço de transações.
Não contém regra de negócio — apenas chama o `TransactionService` e revalida o cache quando necessário.

---

## Queries

Funções assíncronas para **leitura de dados** em Server Components.
Não utilizam `'use server'` pois são chamadas diretamente no servidor.

### `getTransactions(filters?)`

Retorna a lista de transações com filtros opcionais.

**Retorno:** `Promise<ITransaction[]>`

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `filters.tipo` | `TransactionType` | não |
| `filters.direcao` | `TransactionDirection` | não |
| `filters.categoria` | `TransactionCategory` | não |
| `filters.descricao` | `string` | não |
| `filters.dataInicio` | `Date` | não — filtra por `dataTransacao` |
| `filters.dataFim` | `Date` | não — filtra por `dataTransacao` |

> `dataInicio` não pode ser maior que `dataFim`.

```ts
// buscar todas as transações
const transactions = await getTransactions();

// buscar por tipo
const transactions = await getTransactions({ tipo: TRANSACTION_TYPE.PIX.codigo });

// buscar por categoria
const transactions = await getTransactions({ categoria: TRANSACTION_CATEGORY.ALIMENTACAO.codigo });

// buscar por período
const transactions = await getTransactions({
  dataInicio: new Date('2024-03-01'),
  dataFim: new Date('2024-03-31'),
});

// buscar entradas de março de 2024
const transactions = await getTransactions({
  direcao: TRANSACTION_DIRECTION.ENTRADA.codigo,
  dataInicio: new Date('2024-03-01'),
  dataFim: new Date('2024-03-31'),
});
```

---

### `getTransactionById(id)`

Retorna uma transação pelo `id`. Lança erro se não encontrada.

**Retorno:** `Promise<ITransaction>`

> Lança erro se a transação não for encontrada.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `id` | `number` | sim |

```ts
const transaction = await getTransactionById(1);
```

---

### `getRecentTransactions(limit?)`

Retorna as transações mais recentes ordenadas por `dataTransacao` descendente.

**Retorno:** `Promise<ITransaction[]>`

| Parâmetro | Tipo | Padrão |
|---|---|---|
| `limit` | `number` | `5` |

```ts
const recent = await getRecentTransactions();    // últimas 5
const recent = await getRecentTransactions(10);  // últimas 10
```

---

### `getBalance(filters?)`

Retorna o saldo calculado a partir das transações.
Soma entradas e subtrai saídas do período informado.
Se nenhum filtro for informado, calcula o saldo de todas as transações.

**Retorno:** `Promise<number>`

> `dataInicio` não pode ser maior que `dataFim`.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `filters.tipo` | `TransactionType` | não |
| `filters.direcao` | `TransactionDirection` | não |
| `filters.categoria` | `TransactionCategory` | não |
| `filters.descricao` | `string` | não |
| `filters.dataInicio` | `Date` | não — filtra por `dataTransacao` |
| `filters.dataFim` | `Date` | não — filtra por `dataTransacao` |

```ts
// saldo total
const saldo = await getBalance();

// saldo de alimentação
const saldo = await getBalance({ categoria: TRANSACTION_CATEGORY.ALIMENTACAO.codigo });

// saldo de entradas de março
const saldo = await getBalance({
  direcao: TRANSACTION_DIRECTION.ENTRADA.codigo,
  dataInicio: new Date('2024-03-01'),
  dataFim: new Date('2024-03-31'),
});

// saldo de PIX do mês
const saldo = await getBalance({
  tipo: TRANSACTION_TYPE.PIX.codigo,
  dataInicio: new Date('2024-03-01'),
  dataFim: new Date('2024-03-31'),
});
```

---

## Actions

Funções de **mutação de dados** executadas no servidor via Server Actions.
Utilizam `'use server'` e chamam `revalidatePath` após cada operação para manter as páginas sincronizadas.

Todas as actions revalidam:
- `/dashboard` — dashboard com saldo e extrato recente
- `/transactions` — listagem das transações

---

### `createTransaction(input)`

Cria uma nova transação. Valida se o valor é positivo antes de persistir.

**Retorno:** `Promise<ITransaction>`

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `input.valor` | `number` | sim |
| `input.tipo` | `TransactionType` | sim |
| `input.direcao` | `TransactionDirection` | sim |
| `input.dataTransacao` | `Date` | sim |
| `input.categoria` | `TransactionCategory` | não |
| `input.descricao` | `string` | não |

```ts
await createTransaction({
  valor: 500,
  tipo: TRANSACTION_TYPE.PIX.codigo,
  direcao: TRANSACTION_DIRECTION.SAIDA.codigo,
  dataTransacao: new Date('2024-03-01'),
  categoria: TRANSACTION_CATEGORY.ALIMENTACAO.codigo,
  descricao: 'Supermercado',
});
```

---

### `updateTransaction(id, input)`

Atualiza os dados de uma transação existente. Lança erro se não encontrada.

**Retorno:** `Promise<ITransaction>`

> Lança erro se a transação não for encontrada.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `id` | `number` | sim |
| `input.valor` | `number` | sim |
| `input.tipo` | `TransactionType` | sim |
| `input.direcao` | `TransactionDirection` | sim |
| `input.dataTransacao` | `Date` | sim |
| `input.categoria` | `TransactionCategory` | não |
| `input.descricao` | `string` | não |

```ts
await updateTransaction(1, { 
  valor: 750, 
  tipo: 3, 
  direcao: 2,
  dataTransacao: new Date('2024-03-15'),
  categoria: TRANSACTION_CATEGORY.CASA.codigo,
  descricao: 'Pagamento da fatura' 
});
```

---

### `deleteTransaction(id)`

Remove uma transação pelo `id`. Lança erro se não encontrada.

**Retorno:** `Promise<void>`

> Lança erro se a transação não for encontrada.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `id` | `number` | sim |

```ts
await deleteTransaction(1);
```
