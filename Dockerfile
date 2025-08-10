# Etapa de build
FROM node:18-alpine

# Instalar git (necessário para clonar repositório)
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /app

# Clonar o repositório direto do GitHub (mude para o seu link)
RUN git clone https://github.com/GabrielNonato/avaliacao-redes-ii.git .

# Instalar dependências
RUN npm install

# Expor a porta do Next.js
EXPOSE 3000

# Rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]
