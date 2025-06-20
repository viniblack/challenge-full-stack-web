## Configuração do Ambiente

### Pré-requisitos

- Node.js instalado (versão recomendada: 22+)
- Yarn, npm ou pnpm como gerenciador de pacotes

### Passos para configurar

1. Clone o repositório:

```bash
git clone https://github.com/viniblack/challenge-full-stack-web.git
cd challenge-full-stack-web/frontend
```

2. Instale as dependências:

```bash
yarn install
# ou npm install
# ou pnpm install
```

---

## Execução do Projeto

Para iniciar o servidor de desenvolvimento:

```bash
yarn dev
# ou npm run dev
# ou pnpm dev
```

O frontend estará disponível em:
[http://localhost:3000](http://localhost:3000)

---

## Rotas Principais

* **`/`** — Página inicial (Home)
* **`/students`** — Lista de alunos
* **`/students/create`** — Cadastro de novos alunos
* **`/students/:id/edit`** — Edição de aluno existente

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do diretório `frontend` com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

- **`NEXT_PUBLIC_API_URL`**: URL base da API backend para as requisições.
