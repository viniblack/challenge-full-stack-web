# 🧠 Backend

## 🏗️ Decisão da Arquitetura Utilizada

### Arquitetura Geral

O backend segue uma **arquitetura em camadas (Layered Architecture)**, inspirada nos princípios da **Clean Architecture**, adequada ao desenvolvimento de APIs REST com Node.js e TypeScript.

#### Estrutura por camadas:

1. **Camada de Apresentação** (`/routes`, `/controllers`)
   - `routes`: Define os endpoints da API e redireciona para os controllers.
   - `controllers`: Gerencia as requisições e respostas HTTP, realiza validações iniciais e orquestra os serviços da aplicação.

2. **Camada de Validação** (`/schemas`)
   - Utiliza _Zod_ para validar os dados de entrada, garantindo **type safety** e integridade dos dados de forma centralizada e reutilizável.

3. **Camada de Acesso a Dados** (`/prisma`, `/client.ts`)
   - _Prisma ORM_: Fornece uma abstração segura e eficiente para interação com o banco de dados.
   - `client.ts`: Responsável pela configuração centralizada da conexão com o PostgreSQL.

4. **Camada de Infraestrutura**
   - _Docker_ e scripts auxiliares proporcionam um ambiente replicável entre desenvolvimento e produção.

### Decisões Técnicas Relevantes

- **TypeScript**: Proporciona tipagem estática e reduz bugs em tempo de desenvolvimento.
- **Prisma ORM**: Permite interações seguras com o banco, geração automática de tipos e controle eficiente de migrations.
- **PostgreSQL**: Banco de dados relacional robusto e amplamente adotado.
- **Express.js**: Framework leve e flexível, ideal para construção de APIs RESTful.
- **Docker**: Garante consistência entre ambientes locais e produtivos.

---

## 📦 Bibliotecas de Terceiros Utilizadas

### Dependências de Produção

#### Core

- `express`: Framework web minimalista para criação da API.
- `cors`: Middleware para habilitar CORS.
- `dotenv`: Gerenciador de variáveis de ambiente via `.env`.

#### Banco de Dados

- `@prisma/client`: Cliente gerado pelo Prisma com tipagem automática.
- `prisma`: ORM com suporte a migrations e geração de client.
- `pg`: Driver PostgreSQL nativo.

#### Validação

- `zod`: Biblioteca de schemas e validação com integração nativa com TypeScript.

### Dependências de Desenvolvimento

#### Ferramentas TypeScript

- `typescript`, `tsx`: Compilador e runtime para TypeScript.
- `@types/node`, `@types/express`, `@types/cors`: Tipagens auxiliares para desenvolvimento.

#### Lint & Qualidade

- `eslint`: Ferramenta de linting para manter a qualidade do código.
- `@typescript-eslint/*`: Integração do ESLint com TypeScript.

#### Testes

- `jest`: Framework de testes unitários.
- `ts-jest`: Integração do Jest com TypeScript.
- `supertest`: Biblioteca para testes de integração HTTP.
- `@types/*`: Tipagens para bibliotecas de testes.

### Justificativas das Escolhas

- **Prisma**: Ótima experiência de desenvolvimento, type-safe, integração nativa com TS e suporte robusto a migrations.
- **Zod**: Integração nativa com TypeScript e inferência de tipos superior a alternativas como Joi e Yup.
- **Jest + Supertest**: Stack confiável e amplamente utilizado para testes automatizados.
- **ESLint + TypeScript ESLint**: Essencial para manter padrões de código e evitar erros.
- **tsx**: Substituto moderno do `ts-node`, com melhor performance e suporte a módulos ESM.

---

# 🎨 Frontend

## 🏗️ Decisão da Arquitetura Utilizada

### Arquitetura Geral

O frontend utiliza **Vue 3 com Composition API**, adotando uma arquitetura baseada em componentes. A aplicação é uma SPA moderna com roteamento automático, gerenciamento de estado centralizado e validações compartilhadas com o backend.

#### Estrutura Modular:

1. **Camada de Apresentação** (`/components`, `/layouts`, `/pages`)
   - Componentes reutilizáveis, templates de layout e views baseadas em roteamento automático.

2. **Roteamento** (`/router`, auto-gerado)
   - _Vue Router_ com file-based routing e suporte a type safety.

3. **Gerenciamento de Estado** (`/stores`)
   - _Pinia_ modular e reativa por domínio de negócio.

4. **Comunicação com API** (`/lib/http`)
   - Cliente HTTP centralizado e serviços por entidade (ex: `studentAPI`).

5. **Validação de Dados** (`/validators`)
   - Schemas com _Zod_, garantindo validação consistente com o backend.

6. **Configuração Global** (`/plugins`)
   - Sistema de plugins modular para configurações de bibliotecas e auto-imports.

### Decisões Técnicas Relevantes

- **Vue 3 + Composition API**: Melhor performance, organização e reusabilidade.
- **Vite**: Build tool moderna com HMR nativo e desempenho superior.
- **TypeScript**: Tipagem segura em todo o projeto, inclusive nas rotas.
- **Vuetify 3**: Design System maduro com suporte a Material Design.
- **Pinia**: Store oficial do Vue 3, simples, leve e com tipagem integrada.

---

## 📦 Bibliotecas de Terceiros Utilizadas

### Dependências de Produção

#### Core

- `vue`: Framework JavaScript reativo.
- `vue-router`: Roteamento SPA oficial.

#### UI & Design

- `vuetify`: Componentes UI baseados em Material Design.
- `@mdi/font`, `@fontsource/roboto`: Ícones e fontes otimizadas.

#### Estado & Feedback

- `pinia`: Gerenciamento de estado reativo.
- `vue-toastification`: Sistema de notificações toast.

#### Validação

- `zod`: Validação de schemas compartilhada com backend.

### Dependências de Desenvolvimento

#### Ferramentas de Build

- `vite`, `@vitejs/plugin-vue`: Compilação moderna para projetos Vue 3.

#### Tipagem

- `typescript`, `vue-tsc`: Tipagem estática para SFCs.
- `@tsconfig/node22`, `@vue/tsconfig`: Configurações otimizadas de TypeScript.
- `@types/node`: Tipagens para Node.js.

#### Plugins & Automação

- `unplugin-*`: Auto-imports, roteamento automático e layouts dinâmicos.
- `vite-plugin-vuetify`: Integração otimizada entre Vuetify e Vite.

#### Lint & Qualidade

- `eslint`, `eslint-config-vuetify`: Linting com configurações específicas para Vuetify.

#### Estilização

- `sass-embedded`: Processamento SCSS moderno e performático.

#### Utilitários

- `npm-run-all2`: Execução paralela de scripts npm.

---

# 🔧 Melhorias Futuras

- Criar testes unitários para componentes e páginas do frontend.
- Adicionar filtros nas colunas da tabela de alunos.
- Implementar campo de busca por aluno.
- Adicionar autenticação de usuários.
- Implementar lógica de sessão para usuários autenticados.

---

# ✅ Requisitos Atendidos

- [x] Cadastrar novo aluno
- [x] Listar alunos cadastrados
- [x] Editar cadastro de aluno
- [x] Excluir cadastro de aluno
