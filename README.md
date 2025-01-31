# Instalação e Execução do Projeto NestJS

## Requisitos
- Node.js instalado
- Gerenciador de pacotes `npm` ou `yarn`

## Passos para subir o projeto

1. Confiuração do .env:
Renomeio o `.env.exemple` para `.env`, se preferir altere o JWT_KEY para um código a sua preferência.
   ```sh
   JWT_KEY=secret
   ```

2. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

3. Configure o banco de dados SQLite e execute as migrações do Prisma:
   ```sh
   npm run prisma
   # ou
   yarn prisma
   ```

4. Inicie o servidor:
   ```sh
   npm run start
   # ou
   yarn start
   ```

O projeto estará rodando localmente no http://localhost:3000.
Para acessar a documentação acesse http://localhost:3000/doc.

## Rodar os testes unitários

Execute o comando `npm run test` ou `yarn test` para realizar os testes.