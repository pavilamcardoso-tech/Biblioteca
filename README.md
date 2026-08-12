# 📚 Sistema de Biblioteca

Sistema de gerenciamento de biblioteca desenvolvido como projeto acadêmico, utilizando **Laravel** e **MySQL**.

O projeto tem como objetivo permitir o gerenciamento de livros, usuários e empréstimos, oferecendo uma API REST para realizar as operações do sistema.

## 🚀 Tecnologias

* **PHP 8.2**
* **Laravel 12**
* **MySQL**
* **Composer**
* **Laravel Eloquent**
* **REST API**
* **Git e GitHub**

## 📌 Funcionalidades

### 📖 Livros

* Cadastro de livros
* Listagem de livros
* Visualização de um livro
* Edição de livros
* Exclusão de livros
* Controle da quantidade total de exemplares
* Controle da quantidade disponível

### 👤 Usuários

Utilização do sistema de usuários padrão do Laravel, com informações como:

* Nome
* E-mail
* Senha

### 📚 Empréstimos

O sistema está sendo desenvolvido para permitir:

* Registrar empréstimos
* Relacionar usuários e livros
* Verificar a disponibilidade do livro
* Diminuir automaticamente a quantidade disponível
* Registrar devoluções
* Aumentar novamente a quantidade disponível
* Controlar o status do empréstimo

## 🗂️ Estrutura do projeto

```text
BIBLIOTECA/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   └── Models/
├── database/
│   └── migrations/
├── routes/
│   └── api.php
├── resources/
├── public/
├── config/
├── .env.example
├── artisan
├── composer.json
└── package.json
```

## 🔌 API

Atualmente, a API possui endpoints para gerenciamento de livros e empréstimos.

### Livros

```text
GET     /api/livros
POST    /api/livros
GET     /api/livros/{id}
PUT     /api/livros/{id}
DELETE  /api/livros/{id}
```

### Empréstimos

```text
GET     /api/emprestimos
POST    /api/emprestimos
GET     /api/emprestimos/{id}
PUT     /api/emprestimos/{id}
DELETE  /api/emprestimos/{id}
```

## ⚙️ Como executar o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd BIBLIOTECA
```

Instale as dependências do PHP:

```bash
composer install
```

Crie o arquivo `.env`:

```bash
copy .env.example .env
```

Gere a chave da aplicação:

```bash
php artisan key:generate
```

Configure as informações do banco de dados no arquivo `.env`.

Execute as migrations:

```bash
php artisan migrate
```

Inicie o servidor Laravel:

```bash
php artisan serve
```

O projeto ficará disponível em:

```text
http://127.0.0.1:8000
```

## 🛠️ Status do projeto

🚧 **Em desenvolvimento**

O projeto está sendo desenvolvido gradualmente, com implementação do gerenciamento de livros, usuários e empréstimos.

## 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de praticar conceitos de **desenvolvimento backend, APIs REST, Laravel, banco de dados relacionais, migrations, Eloquent ORM e arquitetura de aplicações web**.

---

Desenvolvido como projeto acadêmico. 📚💻
