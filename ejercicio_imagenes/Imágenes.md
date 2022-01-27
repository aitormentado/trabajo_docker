---
title: Ejercicio Imágenes
author: Aitor Trillo, Álvaro Jiménez y Serena Álvarez
---

# Ejercicio Imágenes

#### Servidor web

- Pantallazo en el que se muestra el fichero `index.html` desde el navegador

  ```bash
  docker run -d -p 8000:80 --name web -v "$PWD":/var/www/html php:7.4-apache
  docker start web
  docker exec web bash
  root@b5ba40de9f83:/var/wwww/html# nano index.html
  ```

  

![image-20220124093338390](Im%C3%A1genes.assets/image-20220124093338390.png)

- Pantallazo en el que se muestra la salida del script `mes.php` desde el navegador

  ​	

  ```bash
  root@b5ba40de9f83:/var/wwww/html# nano mes.php
  ```

  

![image-20220124093253080](Im%C3%A1genes.assets/image-20220124093253080.png)



- Pantallazo donde se vea el tamaño del contenedor `web` tras crear los ficheros

  ```bash
  docker ps -s
  ```

  

![image-20220124093610329](Im%C3%A1genes.assets/image-20220124093610329.png)



- Pantallazo donde desde un cliente de base de datos se pueda observar que hemos podido conectarnos al servidor de base de datos con el usuario creado y que se ha creado la base de datos prueba

  Se accedió desde `adminer` a la base de datos prueba.

  ```bash
  docker run --detach --name bbdd --env MARiADB_ROOT=root --env MARIADB_DATABASE=prueba --env MARIADB_USER=invitado MARIADB_PASSWORD=invitado mariadb:latest
  docker start bbdd
  docker run --link bbdd.db -p 8080:8080 adminer
  ```

  Login

  ![image-20220124101249962](Im%C3%A1genes.assets/image-20220124101249962.png)

  Pantalla de inicio

  ![image-20220124101229078](Im%C3%A1genes.assets/image-20220124101229078.png)



- Pantallazo donde se comprueba que no se puede eliminar la imagen `mariadb` mientras el contenedor `bbdd` está en creado

  ```bash
  docker rmi mariadb
  ```

  ![image-20220124101853188](Im%C3%A1genes.assets/image-20220124101853188.png)
