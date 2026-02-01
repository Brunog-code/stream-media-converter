# Base leve com Node
FROM node:20-slim

# Instalar ffmpeg (obrigatório)
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

# Criar pasta do app
WORKDIR /app

# Copiar package.json primeiro (melhor cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o restante
COPY . .

# 🔥 Compilar TypeScript
RUN npm run build

# ✅ Criar pasta do multer
RUN mkdir -p tmp/videos

# Expor porta do Express
EXPOSE 3333

# Rodar servidor
CMD ["npm", "start"]
