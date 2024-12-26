import { Request, Response } from "express";
import { fetch } from "undici";
import { getChisteSchema } from "../validations/chiste-schema";
import { FuenteDelChiste } from "../validations/enums";
import Chiste from "../models/chiste-model";

export async function getChiste(req: Request, res: Response) {
  try {
    const { fuente } = req.query;

    const fuenteValida = getChisteSchema.safeParse(req);

    // Check si la fuente no es válida
    if (!fuente || !fuenteValida.success) {
      return res.status(400).json({
        mensaje:
          "Fuente no válida, debes especificar una fuente (chuck, dad, propio)",
        success: false,
      });
    }

    if (fuente === FuenteDelChiste.Chuck) {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();

      return res.status(200).json(data);
    } else if (fuente === FuenteDelChiste.Dad) {
      const response = await fetch("https://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json", // Solo quiero el JSON
        },
      });

      const data = await response.json();

      return res.status(200).json(data);
    } else if (fuente === FuenteDelChiste.Propio) {
      const chiste = await Chiste.findOne({}); // Trae un chiste de la db

      // Si no hay chistes en la db
      if (!chiste) {
        return res.status(404).json({
          message: "Aún no hay chistes, cree uno!",
          success: false,
        });
      }

      return res.status(200).json(chiste);
    }

    // Respuesta default (fuente desconocida)
    return res.status(400).json({
      mensaje:
        "Fuente no válida, debes especificar una fuente válida (chuck, dad, propio)",
      success: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error al buscar el chiste. Intenta nuevamente.",
      success: false,
    });
  }
}
