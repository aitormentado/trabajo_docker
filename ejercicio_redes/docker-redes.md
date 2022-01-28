---
title: Ejercicio - redes
author: Serena Álvarez Agudo
---

# Ejercicio - redes



> Tarea realizada por: Serena Álvarez Agudo



## Despliegue de contenedores en red: Adminer y MariaDB

1. Crea una red bridge `redbd`

   ```bash
   sudo docker network create -d bridge redbd   
   sudo docker network ls
   ```

![Captura de pantalla de 2022-01-28 08-46-21](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2008-46-21.png)



2. Crea un contenedor con una imagen de `mariaDB` que estará en la red `redbd` . Este contenedor se ejecutará en segundo plano, y será accesible a través del puerto 3306. (Es necesario definir la contraseña del usuario `root` y un volumen de datos persistente)

   ```bash
   sudo docker run -d -p 3306:80 --name mdbDocker -v "$PWD":/etc/mysql/conf.d  --network redbd -d --env MARIADB_ROOT_PASSWORD=admin mariadb
   ```

   

3. Crear un contenedor con `Adminer` que se pueda conectar al contenedor de la BD

   ```bash
   sudo docker run --link mdbDocker --network redbd -p 8080:8080 adminer
   ```



4. Comprobar que el contenedor Adminer puede conectar con el contenedor mysql
   abriendo un navegador web y accediendo a la URL: http://localhost:8080

   ![Captura de pantalla de 2022-01-28 09-14-48](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-14-48.png)

   

5. Pantallazos donde se vean los contenedores creados y en ejecución.

   ![Captura de pantalla de 2022-01-28 09-34-46](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-34-46.png)



6. Pantallazo donde se vea el acceso a la BD a través de la interfaz web de Adminer.

   ![Captura de pantalla de 2022-01-28 09-36-22](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-36-22.png)![Captura de pantalla de 2022-01-28 09-21-14](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-21-14.png)

7.  Pantallazo donde se vea la creación de una BD con la interfaz web Adminer.

   

   ![Captura de pantalla de 2022-01-28 09-23-15](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-23-15.png)

   

![Captura de pantalla de 2022-01-28 09-23-34](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-23-34.png)



8. Pantallazo donde se entre a la consola del servidor web en modo texto y se compruebe que se ha creado la BD.

   ![Captura de pantalla de 2022-01-28 09-33-26](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-33-26.png)



9. Borrar los contenedores la red y los volúmenes utilizados

   ```bash
   sudo docker stop mdbDocker
   sudo docker rm mdbDocker
   sudo docker stop mdbAdminer
   sudo docker rm mdbAdminer
   sudo docker ps
   sudo docker network rm redbd
   sudo docker network ls
   ```

![Captura de pantalla de 2022-01-28 09-49-15](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-49-15.png)



![Captura de pantalla de 2022-01-28 09-50-26](docker-redes.assets/Captura%20de%20pantalla%20de%202022-01-28%2009-50-26.png)
