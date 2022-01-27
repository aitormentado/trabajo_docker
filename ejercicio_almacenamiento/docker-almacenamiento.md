---
title: Ejercicio - almacenamiento
author: Serena Álvarez Agudo
---

# Ejercicio - almacenamiento



> Tarea realizada por: Serena Álvarez Agudo



## Bind mount para compartir datos



```bash
mkdir saludo
sudo docker run -d --name c1 -v /home/serena/saludo:/var/www/html -p 8181:80 php:7.4-apache
sudo docker run -d --name c2 -v /home/serena/saludo:/var/www/html -p 8282:80 php:7.4-apache
```



1. Pantallazo con la orden correspondiente para arrancar el contenedor c1 (puerto 8181)
   realizando el bind mount solicitado.

   

2. ![Captura de pantalla de 2022-01-24 09-37-40](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-37-40-16430136882713.png)

   

3. Pantallazo con la orden correspondiente para arrancar el contenedor c2 (puerto 8282)
   realizando el bind mount solicitado.

   

4. ![Captura de pantalla de 2022-01-24 09-37-53](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-37-53-16430137021075.png)

   

5. Pantallazo donde se pueda apreciar que accediendo a c1 se puede ver el contenido
   de index.html .

   

   ![Captura de pantalla de 2022-01-24 09-44-06](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-44-06.png)

   

4. Pantallazo donde se pueda apreciar que accediendo a c2 se puede ver el contenido
   de index.html .

   

   ![Captura de pantalla de 2022-01-24 09-43-53](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-43-53-16430138772126.png)

   

5. Otros dos pantallazos donde se vea el acceso al fichero index.html después de
   modificarlo.

   

   ![Captura de pantalla de 2022-01-24 09-36-39](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-36-39-16430139661987.png)

   

   ![Captura de pantalla de 2022-01-24 09-36-52](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-36-52-16430139912419.png)

   

6. Borrar los dos contenedores. Mostrar que se han borrado.

   

   ```bash
   sudo docker stop c1
   sudo docker stop c2
   sudo docker rm c1
   sudo docker rm c2
   sudo docker ps
   ```

   

   ![Captura de pantalla de 2022-01-24 09-49-29](docker-almacenamiento.assets/Captura%20de%20pantalla%20de%202022-01-24%2009-49-29.png)
