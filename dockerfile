# USA NODE LTS
FROM node:20-alpine

# DEFINE O WORKDIR
WORKDIR /usr/src/app

# COPIA OS ARQUIVOS
COPY package*.json ./
RUN npm install

# COPIA O RESTANTE DO PROJETO
COPY . .

# BUILD DO CÓDIGO
RUN npm run build

# EXPOE A PORTA
EXPOSE 4000

# START
CMD ["npm", "run", "start:prod"]