# hapi-homebanking

Sistema bancário simples utilizando HapiJS

# Como rodar

Para roda é necessário rodar yarn dev

# ENV

- PORT porta onde vai rodar o servidor HAPI
- USER_FILE local onde vai ser salvo o arquivo de dados
- SECRET secret jwt

# Rotas

- POST /subscribe - rota pública que permite criar conta de utilizador (utilizador é identificado pelo email e password)
- POST /login - rota pública para obter token jwt para acesso a rotas privadas.
- GET /funds - rota privada que permite ao utilizador logado saber o seu saldo.
- PUT /funds - rota privada que permite ao utilizador adicionar fundos a sua conta.
- DELETE /funds - rota privada que permite ao utilizador retirar fundos da conta.
