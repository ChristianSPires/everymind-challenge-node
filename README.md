# Nunes Sports - Product Management System

## Desafio Everymind - Best Minds 2024.2

Este projeto foi desenvolvido como parte do Desafio Everymind 2024.2, onde o objetivo principal era criar um sistema para exibição, criação, edição e deleção de produtos vendidos pela empresa fictícia Nunes Sports.

## Tecnologias Utilizadas

- **Node.js**: Plataforma utilizada para o desenvolvimento do back-end.
- **Express.js**: Framework utilizado para construir a aplicação web.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados dos produtos.
- **EJS (Embedded JavaScript)**: Motor de template utilizado para renderizar o front-end da aplicação.

## Funcionalidades

- **Exibição de Produtos**: Visualize todos os produtos cadastrados em uma tabela.
- **Criação de Produtos**: Adicione novos produtos ao sistema com nome, código, descrição e preço.
- **Edição de Produtos**: Modifique os detalhes dos produtos já existentes.
- **Deleção de Produtos**: Remova produtos do sistema.

## Estrutura do Banco de Dados

A base de dados contém uma única tabela chamada `products`, com os seguintes campos:

- **Nome do Produto**: `name` (String)
- **Código do Produto**: `id` (Number)
- **Descrição do Produto**: `description` (String)
- **Preço do Produto**: `price` (Number)

## Como Executar o Projeto

### Pré-requisitos

- Node.js e npm instalados na máquina.
- MongoDB rodando localmente ou em um serviço como MongoDB Atlas.

### Passos para Rodar o Projeto

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/ChristianSPires/nunes-sports-product-management
    cd nunes-sports-product-management
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure o Banco de Dados:**

    - Crie um banco de dados no MongoDB chamado `nunes_sports`.
    - Dentro desse banco, crie uma coleção chamada `products`.

4. **Inicie o servidor:**

    ```bash
    npm start
    ```

5. **Acesse a aplicação:**

    Abra o navegador e vá para `http://localhost:3000`.

## Boas Práticas Adotadas

- **Clean Code**: Código limpo, organizado e de fácil manutenção.
- **SOLID**: Aplicação dos princípios SOLID na arquitetura do projeto.
- **Desenvolvimento para grandes volumes transacionais**: Pensado para escalabilidade e eficiência.

## Próximos Passos

- Implementar autenticação de usuários.
- Adicionar paginação e filtros à tabela de produtos.
- Criar testes unitários para garantir a qualidade do código.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

---

**Desenvolvido por [Christian de Souza Pires](https://github.com/ChristianSPires)**

