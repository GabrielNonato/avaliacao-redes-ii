FROM node:18-alpine

# Instalar git
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /app

# Clonar o repositório diretamente na pasta /app
RUN git clone https://github.com/GabrielNonato/avaliacao-redes-ii.git . \
    && git checkout main

# Instalar dependências
RUN npm install

# Expor a porta do Next.js
EXPOSE 3000

# Rodar aplicação
CMD ["npm", "run", "dev"]
