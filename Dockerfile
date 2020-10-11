###########################################################
# Dockerfile para configurar aplicación en node.js - Express
############################################################

# Establece la imagen base
FROM node:12.18.4

# Información de Metadata
LABEL "appNode"="API REST EVALUATION FOR COMPANY ALM"
LABEL maintainer="devmiguelopz@gmail.com"
LABEL version="1.0"


# Crear directorio de trabajo
RUN mkdir -p /usr/src/app

# Se estable el directorio de trabajo
WORKDIR /usr/src/app

# Se estable el directorio de trabajo
ENV ENVIRONMENT=development
ENV DATA_BASE_URL=mongodb://mongodb:27017/MyEvaluation_User_ALM
ENV PORT=3000


# Instala los paquetes existentes en el package.json
COPY package.json .
RUN npm install --quiet

# Instalación de Nodemon en forma Global
# Al realizarse cambios reiniciar el servidor
RUN npm install nodemon -g --quiet

# Instalación de cross-env en forma Global para el manejo de las variables de entorno
# Al realizarse cambios reiniciar el servidor
RUN npm install cross-env -g --quiet


# Copia la Aplicación
COPY . .

# Expone la aplicación en el puerto 8000
EXPOSE 3000

# Inicia la aplicación al iniciar al contenedor
CMD nodemon -L --watch . server.js
