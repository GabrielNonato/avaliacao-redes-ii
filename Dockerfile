# Etapa de build
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração primeiro para aproveitar cache
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm install

COPY . .

# Expor a porta do Next.js
EXPOSE 3000

# Rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]
