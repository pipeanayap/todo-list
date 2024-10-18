#Imagen Base
from node 

#Crear el directorio donde va a vivir mi aplciación
WORKDIR /app



#Copiar el package.json

COPY package*.json .

#Instalar los node modules

RUN npm install 

#Copiar archivos de mi local a mi contenedor 
            #Los node modules son las librerias que hacen funcionar la app 

COPY . .

RUN npm run build

#Comando de inicio de contenedor 
CMD ["node","dist/index.js"]

#Compilar la aplicacion

