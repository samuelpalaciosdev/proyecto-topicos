Port forwarding, el puerto en realidad es el 5000 pero accedes a él local con el 3005,
así: http://localhost:5000/ te da el app.get(/)

Para correr el proyecto: docker-compose -f docker-compose.yml up --build

Para correr los tests:  docker compose run --rm web npm run test

https://mongoosejs.com/docs/6.x/docs/models.html // Tuvimos que usar mongoose 6 por mi computadora lol
