import { Request, Response } from 'express';
import { getChisteByFuenteSchema } from '../validations/chiste-schema';
import { FuenteDelChiste } from '../validations/enums';
import Chiste from '../models/chiste-model';
import { fetchChisteChuckNorris, fetchChisteDad } from '../services/services';

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
        mensaje: 'Fuente no válida, debes especificar una fuente (chuck, dad, propio)',
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
            message: 'Aún no hay chistes, cree uno!',
            success: false,
          });
        }

        chiste = chiste[0]; // Aggregate retorna un array
        break;
      default:
        return res.status(400).json({
          mensaje: 'Fuente no válida, debes especificar una fuente válida (chuck, dad, propio)',
          success: false,
        });
    }

    // Retorna el chiste obtenido

    return res.status(200).json(chiste);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ocurrió un error al buscar el chiste. Intenta nuevamente.',
      success: false,
    });
  }
}
