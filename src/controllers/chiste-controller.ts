import { Request, Response, NextFunction } from "express";
import { checkValidObjectId } from "../utils/check-object-id";
import {
  chisteSchema,
  ChisteType,
  getChisteByFuenteSchema,
  getChistesByPuntajeSchema,
} from "../validations/chiste-schema";
import { FuenteDelChiste } from "../validations/enums";
import Chiste from "../models/chiste-model";
import { fetchChisteChuckNorris, fetchChisteDad } from "../services/services";

// /api/chistes/fuente/:fuente
export async function getChisteByFuente(req: Request, res: Response) {
  try {
    const { fuente } = req.params;

    const fuenteValida = getChisteByFuenteSchema.safeParse({
      params: req.params,
    });

    // Check si la fuente no es válida
    if (!fuente || !fuenteValida.success) {
      return res.status(400).json({
        mensaje:
          "Fuente no válida, debes especificar una fuente (chuck, dad, propio)",
        success: false,
      });
    }

    let chiste;

    // Según la fuente proporcionada en  /api/chistes/fuente:fuente, consigue el chiste
    switch (fuente) {
      case FuenteDelChiste.Chuck:
        chiste = await fetchChisteChuckNorris();
        break;
      case FuenteDelChiste.Dad:
        chiste = await fetchChisteDad();
        break;
      case FuenteDelChiste.Propio:
        chiste = await Chiste.aggregate([{ $sample: { size: 1 } }]); // Trae un chiste random de la db

        // Si no hay chistes en la db
        if (!chiste) {
          return res.status(404).json({
            message: "Aún no hay chistes, cree uno!",
            success: false,
          });
        }

        chiste = chiste[0]; // Aggregate retorna un array
        break;
      default:
        return res.status(400).json({
          mensaje:
            "Fuente no válida, debes especificar una fuente válida (chuck, dad, propio)",
          success: false,
        });
    }

    // Retorna el chiste obtenido

    return res.status(200).json(chiste);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error al buscar el chiste. Intenta nuevamente.",
      success: false,
    });
  }
}

export async function createChiste(req: Request, res: Response) {
  try {
    const {
      texto,
      autor = "Se perdió en el Ávila como Led",
      puntaje,
      categoria,
    } = req.body;

    if (!texto || !puntaje || !categoria) {
      return res.status(400).send({
        mensaje: "Por favor introduzca todos los campos requeridos",
        success: false,
      });
    }

    const dataValida = chisteSchema.safeParse(req.body);

    // Ref: hacer funcion de retorno de errores de zod especificando campo
    if (!dataValida.success) {
      return res.status(400).send({
        mensaje: "Datos inválido, por favor intente de nuevo",
        success: false,
      });
    }

    const chiste = await Chiste.create(req.body);

    return res.status(201).json({
      chiste,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error al crear el chiste. Intenta nuevamente.",
      success: false,
    });
  }
}

/**
 * @swagger
 * 3er Requerimiento: Put
 * * Ya tiene un middleware que verifica los campos
 * * La idea es agarrar los datos del request, y reeemplazar únicamente los retribuidos por el usuario
 * query = Tiene el id buscado
 * body = tiene los datos retribuidos por el usuario
 *
 */

export async function putChiste(req: Request, res: Response) {
  try {
    // Agarro los datos de una vez
    const query = { _id: req.params.id };
    const body = { $set: req.body };

    // Check si el id es un id válido de la DB
    if (!checkValidObjectId(query._id)) {
      return res.status(400).json({
        mensaje: `Id no válido: ${query._id}`,
        success: false,
      });
    }

    const chiste = await Chiste.updateOne(query, body);

    return res.status(201).json({
      chiste,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      mensaje: "Ocurrio un error al buscar",
      success: false,
    });
  }
}

/**
 * @swagger
 * 4to Requerimiento: Delete por ID
 *  Se busca el chiste por ID, si es conseguido, se elimina de la DB
 */

export async function deleteChisteById(req: Request, res: Response) {
  try {
    const query = { _id: req.params.id };

    // Check si el id es un id válido de mongoose
    if (!checkValidObjectId(query._id)) {
      return res.status(400).json({
        mensaje: `Id no válido: ${query._id}`,
        success: false,
      });
    }

    const result = await Chiste.deleteOne(query);

    // Aqui vou a checkear si se borro en efecto
    if (result.deletedCount === 1) {
      return res.status(200).json({
        message: "Chiste eliminado de la Base de Datos",
        result,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "No hubieron chistes encontrados con ese ID.",
        result,
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      mensaje: "Ocurrio un error al intentar eliminar el chiste.",
      success: false,
    });
  }
}

export async function getChisteById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Check si el id es un id válido de mongoose
    if (!checkValidObjectId(id)) {
      return res.status(400).json({
        mensaje: `Id no válido: ${id}`,
        success: false,
      });
    }

    const chiste = await Chiste.findById(id);

    if (!chiste) {
      return res.status(404).send({
        mensaje: `No hay chiste con el id: ${id}`,
        success: false,
      });
    }

    return res.status(200).json(chiste);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error al buscar el chiste. Intenta nuevamente.",
      success: false,
    });
  }
}

// /api/chistes?puntaje=num
export async function getChistesByPuntaje(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { puntaje } = req.query;

    // Validar cuando pase el query de puntaje
    if (puntaje) {
      const puntajeValido = getChistesByPuntajeSchema.safeParse({
        query: req.query,
      });

      if (!puntajeValido.success) {
        return res.status(400).json({
          mensaje: "Puntaje no válido, debe ser del 1 al 10",
          success: false,
        });
      }

      const chistes = await Chiste.find({ puntaje });

      // Check si no hay chistes con el puntaje dado
      if (chistes.length === 0) {
        return res.status(404).json({
          mensaje: `No se encontraron chistes con el puntaje: ${puntaje}`,
          success: false,
        });
      }

      return res.status(200).json(chistes);
    }

    next(); // Llama al siguiente controlador (getChisteById) para que de el error de id no conocido
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje:
        "Ocurrió un error al buscar chistes con el puntaje dado. Intenta nuevamente.",
      success: false,
    });
  }
}
