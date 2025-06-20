## ⚙️ Configuração do Ambiente

Requisitos:

- Docker e Docker Compose instalados

### 1. Clone o repositório:

```bash
git clone https://github.com/viniblack/challenge-full-stack-web.git
cd challenge-full-stack-web/backend
```

### 2. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Preencha as variáveis conforme necessário:

```env
DATABASE_URL="postgresql://user:password@db:5432/grupoA_db?schema=public"
DB_HOST=db
DB_PORT=5432
DB_USER=user
DB_PASS=password
DB_NAME=grupoA_db
DB_DIALECT=postgres
FRONTEND_URL=http://localhost:3000
PORT=3001
```

### 3. Inicie com Docker Compose:

```bash
docker-compose up -d
```

---

## 🧪 Execução do Projeto

Execute em modo de desenvolvimento com hot reload:

```bash
yarn dev
```

### Para produção

Build:

```bash
yarn build
```

Iniciar servidor:

```bash
yarn start
```

API estará disponível em: `http://localhost:3001`

---

## 📡 Endpoints da API

### 👤 Autenticação e Usuário

- `POST /api/student`: Registro de novo estudante
- `GET /api/student`: Lista todos os estudantes
- `GET /api/student/:id`: Lista estudante especifico
- `PATCH /api/student/:id`: Altera dados do estudante
- `DELETE /api/student/:id`: Delete estudante

### 🔧 Outros

- `GET /`: Informações básicas da API
- `GET /api/health`: Healthcheck

---

## 🔐 Variáveis de Ambiente

| Variável       | Descrição                                                    |
| -------------- | ------------------------------------------------------------ |
| `DATABASE_URL` | String completa de conexão ao banco PostgreSQL               |
| `DB_HOST`      | Endereço ou hostname do servidor onde o banco está hospedado |
| `DB_PORT`      | Porta na qual o banco de dados está escutando conexões       |
| `DB_USER`      | Nome do usuário com permissão para acessar o banco           |
| `DB_PASS`      | Senha do usuário do banco de dados                           |
| `DB_NAME`      | Nome do banco de dados utilizado pela aplicação              |
| `DB_DIALECT`   | Tipo do banco de dados (ex: `postgres`, `mysql`, etc.)       |
| `FRONTEND_URL` | URL permitida para requisições CORS no backend               |
| `PORT`         | Porta em que o servidor backend irá escutar (padrão: `3001`) |

---

## 🧪 Testes Automatizados

### 📁 Estrutura dos testes

Os testes estão localizados na pasta `src/tests` e cobrem:

- **Controllers** (`StudentController`): valida o comportamento das operações de CRUD de estudantes.
- **Schemas** (`studentSchema`): validação de dados de entrada utilizando [Zod](https://zod.dev/).

### 🛠 Tecnologias utilizadas nos testes

- [`Jest`](https://jestjs.io/): framework de testes.
- [`ts-jest`](https://kulshekhar.github.io/ts-jest/): suporte para TypeScript com Jest.
- Mock do `PrismaClient`: simula interações com o banco de dados sem afetar dados reais.

### ▶️ Executar os testes

Antes de rodar os testes, certifique-se de instalar as dependências:

```bash
yarn install
```

Em seguida, execute:

```bash
yarn test
```

Para assistir os testes em tempo real durante o desenvolvimento:

```bash
yarn test:watch
```

### ✅ Cobertura dos testes

Os testes cobrem os seguintes cenários:

- Criação de estudante com dados válidos
- Tentativa de criação com dados duplicados (email, RA ou CPF)
- Busca por estudantes (todos ou por ID)
- Atualização de dados com validação
- Exclusão de estudante
- Validações de schema (campos obrigatórios, formatos, limites, etc.)
