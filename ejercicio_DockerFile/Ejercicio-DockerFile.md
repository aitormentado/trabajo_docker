---
title: Ejercicio DockerFile
author: Aitor Trillo, Álvaro Jiménez y Serena Álvarez
---

# Ejercicio DockerFile

Mostramos el archivo Dockerfile con las opciones necesarias.

![image-20220128094619037](Ejercicio-DockerFile.assets/image-20220128094619037.png)



Con este comando creamos la nueva imagen

```bash
docker build -t varojcalleja/apachalvaro:v1 .
```

![image-20220128094934282](Ejercicio-DockerFile.assets/image-20220128094934282.png)



Subimos la imagen a la cuenta Docker Hub

- Álvaro inicia sesión con su cuenta de Docker Hub 

```bash
docker login varojcalleja
```

- Y sube la imagen creada

```bash
docker push varojcalleja/apachalvaro:v1
```

![image-20220128095516149](Ejercicio-DockerFile.assets/image-20220128095516149.png)

- Imagen subida a Docker Hub

![image-20220128100320523](Ejercicio-DockerFile.assets/image-20220128100320523.png)

Aitor se baja la imagen de Docker Hub

```bash
docker pull varojcalleja/apachalvaro:v1
docker images
```

![image-20220128100821658](Ejercicio-DockerFile.assets/image-20220128100821658.png)

![image-20220128100929552](Ejercicio-DockerFile.assets/image-20220128100929552.png)



Aitor accede al navegador, se ve la web

![image-20220128101027099](Ejercicio-DockerFile.assets/image-20220128101027099.png)
