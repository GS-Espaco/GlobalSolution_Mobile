# Justificativa das Principais Decisões Técnicas

## 1. Arquitetura de telas e navegação

O frontend foi desenvolvido em React Native com TypeScript utilizando React Navigation para organizar o fluxo do aplicativo. A estrutura foi dividida em telas com responsabilidades bem definidas:

- **Login**: autenticação inicial do usuário.
- **Main**: tela de apresentação do projeto Greenhouse.
- **Base**: listagem e gerenciamento das bases cadastradas.
- **CreateBase**: cadastro de novas bases.
- **Greenhouse (Estufa)**: visualização e monitoramento de uma base específica.

A navegação baseada em rotas tipadas (`RootStackParamList`) foi adotada para garantir maior segurança durante o desenvolvimento. Dessa forma, parâmetros obrigatórios, como o `id` enviado para a tela de monitoramento, são validados em tempo de compilação, reduzindo erros de navegação.

A separação das telas também facilita a manutenção do projeto, permitindo que cada funcionalidade evolua de forma independente.

---

## 2. Consumo e tipagem dos dados

Tanto frontend quanto backend utilizam TypeScript, garantindo consistência entre os modelos de dados.

### Modelos utilizados

**Base**
- id
- nome
- localizacao
- estado
- temperatura

**Local**
- id
- nome

Além disso, o sistema utiliza o enum `EstadoBase`, responsável por representar os possíveis estados de uma estufa:

- Morta
- Congelada
- Normal
- Temperatura Alta
- Queimada
- Aguada

No frontend foi criada uma camada de serviços (`services/api.ts`) responsável por centralizar todas as chamadas HTTP. Essa decisão evita duplicação de código e simplifica futuras alterações de URL, autenticação ou tratamento de erros.

O consumo dos dados ocorre através de endpoints REST:

### Bases
- GET /bases
- GET /bases/:id
- POST /bases
- PUT /bases/:id
- DELETE /bases/:id

### Locais
- GET /locais
- POST /locais

A tela de criação de bases consome os locais cadastrados para preencher um componente Picker, evitando digitação manual e reduzindo inconsistências nos dados de localização.

Outra decisão importante foi manter a regra de negócio do cálculo do estado da estufa exclusivamente no backend. Sempre que a temperatura é atualizada, o servidor recalcula automaticamente o estado da base através da função `calcularEstado()`. Dessa forma, a regra permanece centralizada e não depende da implementação do aplicativo cliente.

---

## 3. Persistência dos dados

Para a persistência foi escolhida uma abordagem baseada em arquivos JSON:

- `bases.json`
- `locais.json`

Essa decisão foi tomada por ser um projeto acadêmico de pequeno porte, onde não existe necessidade de infraestrutura de banco de dados. O uso de arquivos JSON oferece:

- Implementação simples.
- Facilidade de visualização dos dados.
- Menor complexidade de configuração.
- Persistência entre reinicializações da API.

As bases são persistidas porque representam as estufas monitoradas pelo sistema e armazenam informações críticas para o funcionamento da aplicação, como localização, temperatura e estado atual.

Os locais também são persistidos para servir como catálogo de regiões disponíveis para cadastro das bases, garantindo padronização dos dados inseridos pelos usuários.

Os identificadores são gerados utilizando `Date.now()`, fornecendo uma solução simples e suficiente para o volume de dados esperado no projeto.

---

## 4. Separação entre frontend e backend

O projeto foi estruturado em dois módulos independentes:

### Frontend
Responsável pela interface do usuário, navegação, formulários e exibição das informações das estufas.

### Backend
Responsável pelas regras de negócio, autenticação simplificada, operações CRUD e persistência dos dados.

Essa separação segue uma arquitetura cliente-servidor, promovendo maior organização, reutilização da API por diferentes clientes e facilidade de manutenção futura.

Como resultado, a aplicação apresenta uma estrutura escalável, com responsabilidades bem definidas, tipagem consistente entre as camadas e centralização das regras de negócio no backend.
