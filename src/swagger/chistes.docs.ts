/**
 * @swagger
 * /api/chistes:
 *   get:
 *     summary: Obtiene chistes
 *     description: Devuelve todos los chistes o los chistes filtrados por categoría si se proporciona el query.
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *           enum:
 *             - dad-joke
 *             - humor-negro
 *             - chistoso
 *             - malo
 *         required: false
 *         description: Categoría de los chistes a buscar. Si no se proporciona, devuelve todos los chistes.
 *     responses:
 *       200:
 *         description: Lista de chistes encontrada exitosamente.
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: '#/components/schemas/AllChistesResponse'
 *               - $ref: '#/components/schemas/ChistesByCategoriaResponse'
 *       400:
 *         description: Parámetro de categoría inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidCategoriaResponse'
 *       404:
 *         description: No se encontraron chistes.
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: '#/components/schemas/NotFoundAllChistesResponse'
 *               - $ref: '#/components/schemas/NotFoundChistesByCategoriaResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al buscar los chistes"
 *                 success:
 *                   type: boolean
 *                   example: false
 * components:
 *   schemas:
 *     AllChistesResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: Id del chiste
 *           texto:
 *             type: string
 *             description: El chiste
 *           autor:
 *             type: string
 *             description: Autor del chiste
 *           puntaje:
 *             type: number
 *             description: Calificación del chiste del 1 al 10
 *           categoria:
 *             type: string
 *             description: Categoría del chiste
 *             enum:
 *               - dad-joke
 *               - humor-negro
 *               - chistoso
 *               - malo
 *     ChistesByCategoriaResponse:
 *       type: object
 *       properties:
 *         chistesCategoria:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AllChistesResponse/items'
 *         cantidad:
 *           type: integer
 *           description: Número total de chistes encontrados
 *     InvalidCategoriaResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Categoría no válida"
 *         success:
 *           type: boolean
 *           example: false
 *     NotFoundAllChistesResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "No se encontraron chistes"
 *         success:
 *           type: boolean
 *           example: false
 *     NotFoundChistesByCategoriaResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "No hay chistes que tengan esta categoría en la DB"
 *         success:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/chistes/fuente/{fuente}:
 *   get:
 *     summary: Obtiene un chiste de una fuente específica
 *     description: Retorna un chiste basado en la fuente proporcionada (chuck, dad, propio)
 *     parameters:
 *       - in: path
 *         name: fuente
 *         required: true
 *         description: La fuente del chiste (chuck, dad, propio)
 *         schema:
 *           type: string
 *           enum:
 *             - chuck
 *             - dad
 *             - propio
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: '#/components/schemas/ChistePropio'
 *               - $ref: '#/components/schemas/ChisteChuck'
 *               - $ref: '#/components/schemas/ChisteDad'
 *       400:
 *         description: Fuente no válida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fuente no válida, debes especificar una fuente (chuck, dad, propio)"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Chiste no encontrado en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aún no hay chistes, cree uno!"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error interno al obtener el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al buscar el chiste"
 *                 success:
 *                   type: boolean
 *                   example: false
 * components:
 *   schemas:
 *     ChistePropio:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Id del chiste
 *         texto:
 *           type: string
 *           description: El chiste
 *         autor:
 *           type: string
 *           description: Autor del chiste
 *         puntaje:
 *           type: integer
 *           description: Calificación del chiste del 1 al 10
 *         categoria:
 *           type: string
 *           description: Categoría del chiste
 *           enum:
 *             - dad-joke
 *             - humor-negro
 *             - chistoso
 *             - malo
 *       example:
 *         _id: "676f2ad4ceb61f7a55a8a8a2"
 *         texto: "pez pez pez pez pez pez 6 peces"
 *         autor: "Se perdió en el Ávila como Led"
 *         puntaje: 5
 *         categoria: "chistoso"
 *     ChisteChuck:
 *       type: object
 *       properties:
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         icon_url:
 *           type: string
 *           format: uri
 *         id:
 *           type: string
 *         updated_at:
 *           type: string
 *           format: date-time
 *         url:
 *           type: string
 *           format: uri
 *         value:
 *           type: string
 *       example:
 *         categories: []
 *         created_at: "2020-01-05 13:42:23.240175"
 *         icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png"
 *         id: "_0VFC1a2TbOYGJwIoAu1cQ"
 *         updated_at: "2020-01-05 13:42:23.240175"
 *         url: "https://api.chucknorris.io/jokes/_0VFC1a2TbOYGJwIoAu1cQ"
 *         value: "People believe we evolved from monkeys. Actually, we evolved backwards from Chuck Norris."
 *     ChisteDad:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id del chiste
 *         joke:
 *           type: string
 *           description: El chiste
 *         status:
 *           type: integer
 *           description: Código de estado HTTP
 *       example:
 *         id: "vkV0L6wcFlb"
 *         joke: "Did you hear about the runner who was criticized? He just took it in stride"
 *         status: 200
 */

/**
 * @swagger
 * /api/chistes:
 *   post:
 *     summary: Crea un nuevo chiste
 *     description: Permite crear un nuevo chiste en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El texto del chiste
 *                 example: "ahorita creen que si en la medicina homeopática, tú las ves y que: yo tenía una amiga que le faltaba una pierna, le pusimos unas goticas de trululu y le creció de nuevo"
 *               autor:
 *                 type: string
 *                 description: El autor del chiste (opcional, por defecto "Se perdió en el Ávila como Led")
 *                 example: "daniel pistola"
 *               puntaje:
 *                 type: integer
 *                 description: La calificación del chiste, del 1 al 10
 *                 example: 8
 *               categoria:
 *                 type: string
 *                 description: Categoría del chiste
 *                 example: "humor-negro"
 *                 enum:
 *                   - "dad-joke"
 *                   - "humor-negro"
 *                   - "chistoso"
 *                   - "malo"
 *             required:
 *               - texto
 *               - puntaje
 *               - categoria
 *     responses:
 *       201:
 *         description: Chiste creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chiste:
 *                   type: object
 *                   description: El chiste creado
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Id del chiste
 *                       example: "677084827c9016aec3812606"
 *                     texto:
 *                       type: string
 *                       description: El texto del chiste
 *                       example: "ahorita creen que si en la medicina homeopática, tú las ves y que: yo tenía una amiga que le faltaba una pierna, le pusimos unas goticas de trululu y le creció de nuevo"
 *                     autor:
 *                       type: string
 *                       description: Autor del chiste
 *                       example: "daniel pistola"
 *                     puntaje:
 *                       type: integer
 *                       description: Calificación del chiste
 *                       example: 6
 *                     categoria:
 *                       type: string
 *                       description: Categoría del chiste
 *                       example: "humor-negro"
 *                     __v:
 *                       type: integer
 *                       description: Version key de mongoose
 *                       example: 0
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Datos inválidos o campos requeridos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos inválidos, por favor intente de nuevo"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error interno al crear el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al crear el chiste"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/chistes/{id}:
 *   put:
 *     summary: Actualiza un chiste existente
 *     description: Permite actualizar los datos de un chiste existente dado su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del chiste a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El nuevo texto del chiste
 *                 example: "Chiste versión 2"
 *               autor:
 *                 type: string
 *                 description: El autor del chiste
 *                 example: "Autor actualizado"
 *               puntaje:
 *                 type: integer
 *                 description: El puntaje actualizado del chiste
 *                 example: 2
 *               categoria:
 *                 type: string
 *                 description: La nueva categoría del chiste
 *                 example: "malo"
 *     responses:
 *       201:
 *         description: Chiste actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chiste:
 *                   type: object
 *                   description: Detalles del chiste actualizado
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       description: Si la actualización fue reconocida
 *                       example: true
 *                     modifiedCount:
 *                       type: integer
 *                       description: Cantidad de documentos modificados
 *                       example: 1
 *                     upsertedId:
 *                       type: string
 *                       nullable: true
 *                       description: Id
 *                       example: null
 *                     upsertedCount:
 *                       type: integer
 *                       description: Cantidad de documentos insertados
 *                       example: 0
 *                     matchedCount:
 *                       type: integer
 *                       description: Cantidad de documentos coincidentes (por id)
 *                       example: 1
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: El id proporcionado no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Id no válido: 123yo"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error interno del servidor al intentar actualizar el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al intentar actualizar el chiste"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/chistes/{id}:
 *   delete:
 *     summary: Elimina un chiste existente
 *     description: Permite eliminar un chiste existente dado su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del chiste a eliminar
 *     responses:
 *       200:
 *         description: Chiste eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chiste eliminado de la base de datos"
 *                 result:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 1
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: No se encontró ningún chiste con ese id en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró ningún chiste con ese id"
 *                 result:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: false
 *                     deletedCount:
 *                       type: integer
 *                       example: 0
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error interno del servidor al intentar eliminar el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al eliminar el chiste"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/chistes/{id}:
 *   get:
 *     summary: Obtiene un chiste por su id
 *     description: Devuelve los datos de un chiste almacenado en la base de datos dado su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id del chiste que se desea obtener
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "677084827c9016aec3812606"
 *                 texto:
 *                   type: string
 *                   example: "ahorita creen que si en la medicina homeopática, tú las ves y que: yo tenía una amiga que le faltaba una pierna, le pusimos unas goticas de trululu y le creció de nuevo"
 *                 autor:
 *                   type: string
 *                   example: "daniel pistola"
 *                 puntaje:
 *                   type: integer
 *                   example: 6
 *                 categoria:
 *                   type: string
 *                   example: "humor-negro"
 *                 __v:
 *                   type: integer
 *                   description: Version key de mongoose
 *                   example: 0
 *       400:
 *         description: El id proporcionado no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Id no válido: {id}"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay chiste con el id: {id}"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al buscar el chiste"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
