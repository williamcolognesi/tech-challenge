# Transactions — API

Camada de comunicação entre as páginas e o serviço de transações.
Não contém regra de negócio — apenas chama o `TransactionService` e revalida o cache quando necessário.

---

## Queries

Funções assíncronas para **leitura de dados** em Server Components.
Não utilizam `'use server'` pois são chamadas diretamente no servidor.

### `getTransactions(filters?)`

Retorna a lista de transações com filtros opcionais.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `filters.tipo` | `TransactionType` | não |
| `filters.direcao` | `TransactionDirection` | não |
| `filters.descricao` | `string` | não |

```ts
const transactions = await getTransactions({ tipo: TRANSACTION_TYPE.PIX.codigo });
```

---

### `getTransactionById(id)`

Retorna uma transação pelo `id`. Lança erro se não encontrada.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `id` | `number` | sim |

```ts
const transaction = await getTransactionById(1);
```

---

### `getRecentTransactions(limit?)`

Retorna as transações mais recentes ordenadas por `dataCadastro` descendente.

| Parâmetro | Tipo | Padrão |
|---|---|---|
| `limit` | `number` | `5` |

```ts
const recent = await getRecentTransactions();    // últimas 5
const recent = await getRecentTransactions(10);  // últimas 10
```

---

### `getBalance()`

Retorna o saldo atual calculado a partir de todas as transações.
Soma entradas e subtrai saídas.

```ts
const balance = await getBalance(); // ex: 1250.00
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

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `input.valor` | `number` | sim |
| `input.tipo` | `TransactionType` | sim |
| `input.direcao` | `TransactionDirection` | sim |
| `input.descricao` | `string` | não |

```ts
await createTransaction({
  valor: 500,
  tipo: TRANSACTION_TYPE.PIX.codigo,
  direcao: TRANSACTION_DIRECTION.SAIDA.codigo,
  descricao: 'Pagamento fornecedor',
});
```

---

### `updateTransaction(id, input)`

Atualiza os dados de uma transação existente. Lança erro se não encontrada.
Todos os campos do input são opcionais — apenas os informados serão atualizados.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `id` | `number` | sim |
| `input.valor` | `number` | não |
| `input.tipo` | `TransactionType` | não |
| `input.direcao` | `TransactionDirection` | não |
| `input.descricao` | `string` | não |

```ts
await updateTransaction(1, { valor: 750, descricao: 'Pagamento atualizado' });
```

---

### `deleteTransaction(id)`

Remove uma transação pelo `id`. Lança erro se não encontrada.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `id` | `number` | sim |

```ts
await deleteTransaction(1);
```
