# Dificultades

La principal dificultad es que ninguno de los 2 tenía completo dominio en docker. Adaptarnos a express no nos fue díficil porque ya tenemos experiencia manejando apis rest. Para poder hacer el proyecto, tuvimos que ver una serie de tutoriales (especialmente sobre cómo configurar express con typescript) y entender las bases de docker

Además fue un poco cuesta arriba el docker, uno de nosotros usa linux y tuvo muchos problemas con los puertos del proyecto. Tuvimos que aprender bien sobre las imágenes de docker y entender el concepto de su VM.

Asimismo, documentar el proyecto en swagger fue algo complicado, ya que no encontramos tantos tutoriales, a ensayo y error logramos una documentación bastante completa.

# Comentarios Extras

- Usamos Zod para validar los datos de entrada de las rutas.
- Usamos Nextjs para el front, ya luego nos dimos cuenta que swagger se encarga de casi lo mismo que hicimos en el front.

# Tecnologías utilizadas

- Express -> 4.21.2
- Typescript -> 5.7.2
- Zod -> 3.24.1
- Mongoose -> 6.8.3
- Swagger -> 6.2.8
- Nextjs -> 15.1.3

# Cómo correr el proyecto
- El backend usa el puerto 5000, la ruta base es http://localhost:5000/api/chistes/
- El front usa el puerto 3000, para acceder a él http://localhost:3000/

**Agregar .env en la raíz de la carpeta del proyecto con los siguientes datos (en el mismo nivel que el docker-compose.yml):**

```
MONGO_USERNAME=samuelpl0888
MONGO_PASSWORD=R01hKVoPyRdFvJix
MONGO_PORT=27017
MONGO_DB=topicos
MONGO_HOSTNAME=mongo
PORT=5000
```

## En el backend

**Para correr el proyecto completo (Express + Front + Swagger):**

```
docker-compose -f docker-compose.yml up --build
```

**Para correr los tests:**

```
docker compose run --rm web npm run test
```

**Para ver la documentación en swagger:**

```
http://localhost:5000/api/docs/
```

### Tuvimos que usar mongoose 6 por problemas con una computadora

#### Grupo 8
- Daniel Ross
- Samuel Palacios
