# API de  de cadastro de Usuários e Lojas

A API permite a criação, leitura, atualização e exclusão de usuários, além de fornecer uma rota de login que retorna um token JWT para autenticação em outras rotas protegidas.

## Dando inicio

### Pré-requisitos
 - Node
 - npm
 - Docker

### Instalação

Clone o repositório:

 ```bash
 git clone git@github.com:mottak/cadastro_de_lojas.git
 cd cadastro_de_lojas
 ```

Instale as dependencias:

```bash
 npm install
```

Suba o banco de dados postgress usando docker-compose:

```bash
docker-compose up -d
```

Gere as migrates do prisma:

```bash
npm run db:migrate
```

Popule o banco de dados com as seeds disponiveis no projeto:

```bash
npm run db:seed
```



## Autenticação

Todas as rotas, exceto a rota de login e listar usuários, requerem autenticação por meio de um token JWT. Para obter um token, faça uma solicitação POST para `/login` com as credenciais do usuário.

### Rota de Login

- **URL:** `/login`
- **Método:** POST
- **Parâmetros de Solicitação:**

```json
{
  "email": "email@email.com",
  "password": "password"
}
```

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

  ```json
  {
    "token": "seu-token-jwt-aqui"
  }
  ```

- **Resposta de Erro:**

  - **Código de Status:** 401 Unauthorized
  - **Corpo da Resposta:**

  ```json
  {
    "mensagem": "Invalid password."
  }
  ```

## Recursos de Usuários

### Criar um Usuário

- **URL:** `/user`
- **Método:** POST
- **Parâmetros de Solicitação:**

```json
{
  "name": "Seu nome",
  "email": "email@email.com",
  "password": "password"
}
```

- **Autenticação Necessária:** Não

- **Resposta de Sucesso:**

  - **Código de Status:** 201 Created
  - **Corpo da Resposta:**

  ```json
  {
    "id": "1",
    "name": "Seu nome",
    "email": "email@email.com",
  }
  ```

- **Resposta de Erro:**

  - **Código de Status:** 400 Bad Request
  - **Corpo da Resposta:**
  Existem diferentes mensagens de erro para cada tipo de erro:

    - Não informar o nome no corpo da requisição:

    ```json
    {
      "message": "\"name\" is required"
    }
    ```
  
    - Nome com menos de 3 letras:

    ```json
    {
      "message": "\"name\" length must be at least 3 characters long"
    }
    ```
    - Não informar o email no corpo da requisição:

    ```json
    {
      "message": "\"email\" is required"
    }
    ```
  
    - Email com formato inválido:

    ```json
    {
      "message": "\"name\" length must be at least 3 characters long"

    }
    ```

      - Não informar a senha no corpo da requisição:

    ```json
    {
      "message": "\"password\" is required"
    }
    ```
  
    - Senha com menos de 6 caracteres:

    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"

    }
    ```

### Listar Usuários

- **URL:** `/users`
- **Método:** GET

- **Autenticação Necessária:** Não

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
    [
      {
        "id": 9,
        "name": "Bob",
        "email": "bob@email.com"
      },
      {
        "id": 10,
        "name": "Maria",
        "email": "maria@email.com"
      }
    ]
    ```

### Atualizar um Usuário

- **URL:** `/user/name/{id}`
- **Método:** PUT
- **Parâmetros de URL:**

  - `id` (number) - ID do usuário a ser atualizado.
- **Parâmetros de Solicitação:**

  - `nome` (string) - Novo nome do usuário.
 

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
     {
        "id": 10,
        "name": "Maria",
        "email": "maria@email.com"
      }
    ```

- **Resposta de Erro:**

  - **Código de Status:** 404 Not Found
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Provid a valid id."
    }
    ```

- **URL:** `/user/email/{id}`
- **Método:** PUT
- **Parâmetros de URL:**

  - `id` (number) - ID do usuário a ser atualizado.
- **Parâmetros de Solicitação:**

  - `email` (string) - Novo endereço de e-mail do usuário.
 

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
     {
        "id": 10,
        "name": "Maria",
        "email": "maria@email.com"
      }
    ```

- **Resposta de Erro:**

  - **Código de Status:** 404 Not Found
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Provid a valid id."
    }
    ```
  
- **URL:** `/user/password/{id}`
- **Método:** PUT
- **Parâmetros de URL:**

  - `id` (number) - ID do usuário a ser atualizado.
- **Parâmetros de Solicitação:**

  - `password` (string) - Nova senha do usuário.
 

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
      { "message": "Password successfully changed."}
    ```

- **Resposta de Erro:**

  - **Código de Status:** 404 Not Found
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Provid a valid id."
    }
    ```

### Excluir um Usuário

- **URL:** `/user/{id}`
- **Método:** DELETE
- **Parâmetros de URL:**

  - `id` (number) - ID do usuário a ser excluído.

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 204 No Content

- **Resposta de Erro:**

  - **Código de Status:** 404 Not Found
  - **Corpo da Resposta:**

     ```json
    {
      "mensagem": "Provid a valid id."
    }
    ```

