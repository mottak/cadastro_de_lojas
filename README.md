# Documentação da API de Usuários

Esta documentação descreve os endpoints disponíveis para a API de Usuários. A API permite a criação, leitura, atualização e exclusão de usuários, além de fornecer uma rota de login que retorna um token JWT para autenticação em outras rotas protegidas.

## Autenticação

Todas as rotas, exceto a rota de login, requerem autenticação por meio de um token JWT. Para obter um token, faça uma solicitação POST para `/login` com as credenciais do usuário.

### Rota de Login

- **URL:** `/login`
- **Método:** POST
- **Parâmetros de Solicitação:**

  - `username` (string) - Nome de usuário do usuário.
  - `password` (string) - Senha do usuário.

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
      "mensagem": "Credenciais inválidas"
    }
    ```

## Recursos de Usuários

### Criar um Usuário

- **URL:** `/usuarios`
- **Método:** POST
- **Parâmetros de Solicitação:**

  - `nome` (string) - Nome do usuário.
  - `email` (string) - Endereço de e-mail do usuário.
  - `senha` (string) - Senha do usuário.

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 201 Created
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Usuário criado com sucesso"
    }
    ```

- **Resposta de Erro:**

  - **Código de Status:** 400 Bad Request
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Erro ao criar usuário: detalhes do erro aqui"
    }
    ```

### Listar Usuários

- **URL:** `/usuarios`
- **Método:** GET

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
    [
      {
        "id": 1,
        "nome": "Nome do Usuário",
        "email": "usuario@email.com"
      },
      {
        "id": 2,
        "nome": "Outro Usuário",
        "email": "outro@email.com"
      }
    ]
    ```

### Obter um Usuário por ID

- **URL:** `/usuarios/{id}`
- **Método:** GET
- **Parâmetros de URL:**

  - `id` (number) - ID do usuário a ser obtido.

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
    {
      "id": 1,
      "nome": "Nome do Usuário",
      "email": "usuario@email.com"
    }
    ```

- **Resposta de Erro:**

  - **Código de Status:** 404 Not Found
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Usuário não encontrado"
    }
    ```

### Atualizar um Usuário

- **URL:** `/usuarios/{id}`
- **Método:** PUT
- **Parâmetros de URL:**

  - `id` (number) - ID do usuário a ser atualizado.
- **Parâmetros de Solicitação:**

  - `nome` (string) - Novo nome do usuário (opcional).
  - `email` (string) - Novo endereço de e-mail do usuário (opcional).
  - `senha` (string) - Nova senha do usuário (opcional).

- **Autenticação Necessária:** Sim (Token JWT)

- **Resposta de Sucesso:**

  - **Código de Status:** 200 OK
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Usuário atualizado com sucesso"
    }
    ```

- **Resposta de Erro:**

  - **Código de Status:** 404 Not Found
  - **Corpo da Resposta:**

    ```json
    {
      "mensagem": "Usuário não encontrado"
    }
    ```

### Excluir um Usuário

- **URL:** `/usuarios/{id}`
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
      "mensagem": "Usuário não encontrado"
    }
    ```

Isso conclui a documentação da sua API de Usuários. Certifique-se de personalizar as descrições e os detalhes conforme necessário e incluir outras informações relevantes, como os tipos de dados esperados e quaisquer restrições.
