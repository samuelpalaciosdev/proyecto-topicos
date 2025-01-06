# Dificultades
La principal dificultad es que ninguno de los 2 tenía completo odominio en Mongoose ni en docker. Adaptarnos a express no nos fue díficil porque tenemos experiencia en el front-end. Para poder hacer el proyecto bien tuvimos que ver una serie de tutoriales y entender las bases de estos lenguajes.

Además fue un poco cuesta arriba el docker, uno de nosotros usa linux y tuvo muchos problemas con los puertos del proyecto. Tuvimos que aprender bien sobre las imágenes de docker y entender el concepto de su VM.

# Tecnologías utilizadas
- Express -> 4.21.2
- Mongoose -> 6.13.5
- Swagger -> 6.2.8
- Nextjs -> 15.1.3
- Typescript -> 5.7.2
- TailwindCSS -> 3.4.1

# Requerimientos para correr el proyecto
Port forwarding, el puerto en realidad es el 5000 pero accedes a él local con el 3005,
así: http://localhost:5000/ te da el app.get(/)

## En el backend
**Para correr el proyecto completo:**
```
docker-compose -f docker-compose.yml up --build
```
Van aparecer las rutas del backend, frontend y el swagger en el build.
**Para correr los tests:**
```
docker compose run --rm web npm run test
```
### Esta es la versión que usamos de Mongoose
https://mongoosejs.com/docs/6.x/docs/models.html // Tuvimos que usar mongoose 6 por problemas con una computadora
