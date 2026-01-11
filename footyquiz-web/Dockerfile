# Development için Node.js base image
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Port 3000'i aç
EXPOSE 3000

# Development server'ı başlat
CMD ["npm", "start"]