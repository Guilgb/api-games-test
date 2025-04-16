# Games API

![NestJS](https://img.shields.io/badge/NestJS-v10.4.17-red)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18-green)

## Descrição

A **Games API** é uma aplicação backend desenvolvida com o framework [NestJS](https://nestjs.com/). Ela permite gerenciar e buscar informações sobre jogos, integrando-se com a API externa da [RAWG](https://rawg.io/apidocs) e utilizando cache com Redis para otimizar o desempenho.

## Funcionalidades

- **Busca de jogos**:
  - Busca jogos pelo título na API externa (RAWG).
  - Armazena os resultados no banco de dados e no cache (Redis).
- **Listagem de jogos**:
  - Lista os jogos armazenados no banco de dados.
  - Permite filtros por título e plataforma.
- **Cache com Redis**:
  - Reduz o tempo de resposta ao armazenar resultados frequentemente acessados.
- **Documentação com Swagger**:
  - Documentação interativa da API disponível em `/api`.

---

## Tecnologias Utilizadas

- **Framework**: [NestJS](https://nestjs.com/)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL (via TypeORM)
- **Cache**: Redis
- **Integração Externa**: API da RAWG
- **Documentação**: Swagger

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/) (opcional, para rodar serviços em contêineres)

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/age-games-api.git
   cd age-games-api
   ```
2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.
    - Preencha as variáveis necessárias, como credenciais do banco de dados e da API RAWG.

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run start:dev
    ```

5. Acesse a documentação da API:
    - Acesse `http://localhost:3000/api` para visualizar a documentação interativa gerada pelo Swagger.