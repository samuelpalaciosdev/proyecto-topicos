/**
 * @swagger
 * /api/chistes:
 *   get:
 *     summary: Trae todos los chistes de la db
 *     description: Obtiene la lista de todos los chistes disponibles en la db
 *     responses:
 *       200:
 *         description: Lista de chistes encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: ObjectId
 *                     description: Id del chiste
 *                   texto:
 *                     type: string
 *                     description: El chiste
 *                   autor:
 *                     type: string
 *                     description: Autor del chiste
 *                   puntaje:
 *                     type: number
 *                     description: Calificación del chiste del 1 al 10
 *                   categoria:
 *                     type: string
 *                     description: Categoría del chiste
 *                     enum:
 *                       - dad-joke
 *                       - humor-negro
 *                       - chistoso
 *                       - malo
 *             examples:
 *               ejemplo1:
 *                 summary: Chistes de la base de datos
 *                 value:
 *                   - _id: "677084827c9016aec3812606"
 *                     texto: "Ahorita creen que si en la medicina homeopática, tú las ves y que: yo tenía una amiga que le faltaba una pierna, le pusimos unas goticas de trululu y le creció de nuevo"
 *                     autor: "Daniel Pistola"
 *                     puntaje: 6
 *                     categoria: "humor-negro"
 *                   - _id: "676f377a3390e7ecad887b2f"
 *                     texto: "Un pana con dos panas, un tercer pana, wao 3 panas"
 *                     autor: "Nanutria"
 *                     puntaje: 8
 *                     categoria: "dad-joke"
 *       404:
 *         description: No se encontraron chistes en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "No se encontraron chistes"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: false
 *       500:
 *         description: Error interno al obtener los chistes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Ocurrió un error al buscar los chistes"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: false
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
