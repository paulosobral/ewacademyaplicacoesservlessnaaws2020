FROM node:16-slim

# Cria um novo usuário "appuser" e muda para ele
RUN useradd -ms /bin/bash appuser
USER appuser

# Define o diretório de trabalho
WORKDIR /src

# Copia e instala dependências
COPY package.json package-lock.json /src/
RUN npm ci --silent

# Copia todo o código para o container
COPY . .

# Define o comando de inicialização
CMD npm start
