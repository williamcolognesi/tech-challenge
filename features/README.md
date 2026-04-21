## A regra de cada feature que terá no nosso sistema.

[feature] vai cuidar de TUDO da [feature]:

- components (Componentes acoplados à regra de negócio - exemplo: [Feature]Form, [feature]List)
- hooks (Lógica de estado/actions exemplo: use[feature])
- api (Chamadas de rede isoladas (fetchers para os mocks))
- repositories (Acesso a dados)
- services (Regra de negócio)
- types (Interfaces TypeScript)
- utils (Formatadores ou funções específicas)
