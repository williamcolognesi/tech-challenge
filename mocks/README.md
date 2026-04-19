## Arquivo para simular os dados

Simula a camada de persistência durante o desenvolvimento, sem necessidade de banco de dados.

### Arquivos

- `transaction/data/transactions.ts` — Dados iniciais (seed) de transações
- `transaction/transaction.repository.mock.ts` — Implementação em memória do repositório

### Observação

Substituir o mock pelo banco real não exige alteração nas `features/` ou `services/` — basta atualizar o `lib/transaction.factory.ts` com a nova implementação.
