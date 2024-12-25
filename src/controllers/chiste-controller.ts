import { Request, Response } from "express";
import { fetch } from "undici";
import { getChisteSchema } from "../validations/chiste-schema";
import { FuenteDelChiste } from "../validations/enums";
import Chiste from "../models/chiste-model";

export async function getChiste(req: Request, res: Response) {
  try {
    const { fuente } = req.query;

    // Si no se envía el query fuente /api/chistes?fuente
    if (!fuente) {
      return res.status(400).json({
        mensaje:
          "Fuente no válida, debes especificar una fuente (chuck, dad, propio)",
        success: false,
      });
    }

    return res.status(200).json({
      mensaje: `Hola, solicitaste un chiste de la fuente ${fuente}`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error al buscar el chiste. Intenta nuevamente.",
      success: false,
    });
  }
}
