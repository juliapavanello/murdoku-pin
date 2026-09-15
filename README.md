# Murdoku

Jogo de lógica baseado em tabuleiro, com foco em dedução e resolução de casos por meio de pistas e marcações.

🎮 **Jogar agora:** https://murdoku-pin-front.onrender.com

## Objetivo

O jogador monta o tabuleiro, marca possibilidades e tenta descobrir a solução correta de cada caso.

## Tecnologias

- HTML, CSS e JavaScript no frontend
- Node.js + Express no backend
- Docker para rodar o servidor

## Como rodar

### 1. Clone o projeto

```bash
git clone <url-do-repositorio>
cd murdoku-pin
```

### 2. Inicie o backend com Docker

```bash
docker compose up
```

### 3. Abra no navegador

Acesse:

```text
http://localhost:5500
```

Ou abra os arquivos HTML locais do projeto conforme a estrutura do fluxo do jogo.

## Deploy

O projeto está hospedado no Render, em dois serviços independentes:

- **Frontend** (Static Site): arquivos HTML/CSS/JS servidos a partir da raiz do projeto
- **Backend** (Web Service com Docker): API REST + WebSocket, buildada a partir de `server/Dockerfile`

O frontend detecta o ambiente automaticamente: em `localhost` usa o backend local (porta 7032), e em produção aponta para o backend hospedado.

> Nota: o plano gratuito do Render coloca o backend em suspensão após 15 minutos sem uso, 
> então a primeira requisição pode demorar alguns segundos.
