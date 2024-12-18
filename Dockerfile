# Usar uma imagem base do Node.js com suporte a Debian
FROM node:18-bullseye

# Instalar dependências necessárias para o wkhtmltopdf
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    wkhtmltopdf && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos do projeto para o container
COPY . .

# Instalar as dependências do projeto usando Yarn
RUN yarn install

# Expor a porta utilizada pela aplicação
EXPOSE 3000

# Comando para iniciar o servidor com Yarn
CMD ["yarn", "dev"]
