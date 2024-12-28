import express, { Request, Response, NextFunction } from "express";
import z from "zod";
import {
  getChistesByCategoria,
  getChistes,
  getChistesByPuntaje,
} from "../controllers/chiste-controller";

export const validation =
  (schema: z.ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida que los campos cumplan con el esquema
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        message: "Por favor, verifica los datos e intenta nuevamente",
      });
    }
  };

// Dependiendo del query en api/chistes?$query llama a su controlador
export function queryGetHandler(req: Request, res: Response) {
  const { puntaje, categoria } = req.query;

  // Handle Query for Puntaje
  if (puntaje) {
    return getChistesByPuntaje(req, res);
  }

  if (categoria) {
    return getChistesByCategoria(req, res);
  }

  // Si no ha query, retorna todas los chistes de la DB
  return getChistes(req, res);
}
