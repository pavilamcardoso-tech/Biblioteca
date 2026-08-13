# Sistema de Biblioteca

Sistema de gestão de acervo para bibliotecas, com controle de livros, leitores e empréstimos.

## Tecnologias

**Backend**
- PHP 8.2
- Laravel 12
- MySQL

**Frontend**
- React
- Vite
- Axios

## Funcionalidades

- Cadastro, edição, exclusão e listagem de livros
- Cadastro, edição, exclusão e listagem de leitores
- Registro de empréstimos, com controle automático de quantidade disponível
- Registro de devoluções
- Bloqueio de empréstimo quando não há exemplares disponíveis

## Estrutura do projeto

biblioteca/
├── app/ Backend Laravel (Models, Controllers)
├── database/migrations/ Migrations do banco de dados
├── routes/api.php Rotas da API
└── frontend/ Frontend React
└── src/
├── components/ Componentes de tela (formulários e listas)
└── services/ Configuração do Axios (conexão com a API)


## Como rodar o projeto localmente

O projeto tem duas partes que precisam rodar ao mesmo tempo, em terminais separados.

### 1. Backend (Laravel)

```bash
cd biblioteca
composer install
cp .env.example .env
php artisan key:generate
```

Configure as credenciais do banco de dados MySQL no arquivo `.env`, depois rode as migrations:

```bash
php artisan migrate
```

Inicie o servidor:

```bash
php artisan serve
```

A API estará disponível em `http://127.0.0.1:8000`.

### 2. Frontend (React)

Em outro terminal:

```bash
cd biblioteca/frontend
npm install
npm run dev
```

O sistema estará disponível em `http://localhost:5173`.

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/livros` | Lista todos os livros |
| POST | `/api/livros` | Cadastra um novo livro |
| GET | `/api/livros/{id}` | Detalhes de um livro |
| PUT | `/api/livros/{id}` | Atualiza um livro |
| DELETE | `/api/livros/{id}` | Remove um livro |
| GET | `/api/leitores` | Lista todos os leitores |
| POST | `/api/leitores` | Cadastra um novo leitor |
| PUT | `/api/leitores/{id}` | Atualiza um leitor |
| DELETE | `/api/leitores/{id}` | Remove um leitor |
| GET | `/api/emprestimos` | Lista todos os empréstimos |
| POST | `/api/emprestimos` | Registra um novo empréstimo |
| PATCH | `/api/emprestimos/{id}/devolver` | Registra a devolução |
| DELETE | `/api/emprestimos/{id}` | Remove um empréstimo |
