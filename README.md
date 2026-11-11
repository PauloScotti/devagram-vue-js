# Devagram — Web (Vue)

Interface web de uma rede social de fotos, no estilo Instagram: cadastro e login, feed de quem você segue, busca de usuários, perfil, curtidas, comentários e publicação de fotos.

Feita com Vue 3 e Vite, consome a [API do Devagram](https://github.com/PauloScotti/devagram-nextjs). Nasceu como projeto da formação Devaria e foi atualizada para as versões atuais do Vue e do Vite.

## Stack

| Camada    | Tecnologia                  |
| --------- | --------------------------- |
| Framework | Vue 3, Vue Router 5, Pinia  |
| Build     | Vite 8, TypeScript          |
| Estilos   | Sass                        |
| HTTP      | axios                       |
| Testes    | Vitest                      |

## Como rodar

```bash
npm install
cp .env.example .env   # aponte VITE_VUE_PUBLIC_API_URL para a API
npm run dev
```

É preciso ter a API rodando; `VITE_VUE_PUBLIC_API_URL` é o endereço dela, sem `/api` no fim.

## Telas

| Rota           | O que é                             |
| -------------- | ----------------------------------- |
| `/`            | Login ou, com sessão ativa, o feed  |
| `/cadastro`    | Criar conta, com foto opcional      |
| `/usuario/:id` | Perfil de outro usuário             |
| `/perfil`      | O próprio perfil                    |
| `/editar`      | Editar nome e foto                  |
| `/publicacao`  | Publicar uma foto                   |

## Estrutura

```
src/assets/      estilos, fontes e imagens
src/components/  componentes de interface
src/router/      rotas e proteção das telas que exigem login
src/services/    chamadas à API e sessão
src/stores/      estado do token (Pinia)
src/views/       telas
```

## Verificação

```bash
npm run type-check
```

```bash
npm test
```

```bash
npm run build
```

## Sessão

O token fica no `localStorage` e vai no cabeçalho `Authorization` de cada requisição. Quando a API responde 401 com uma sessão ativa (token expirado ou inválido), a sessão é encerrada e o usuário volta para o login.
