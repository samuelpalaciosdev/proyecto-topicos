import express, { Request, Response, NextFunction } from "express";
import z from "zod";
import {
  getChisteCategoria,
  getChistes,
  getChistesByPuntaje,
} from "../controllers/chiste-controller";

export const validation =
  (schema: z.ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Aqui voy a validar que los campos cumplan con el esquema y sean campos validos
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        mensaje: "Verifica los campos y los datos.",
      });
    }
  };

export function queryGetHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { puntaje, categoria } = req.query;

  // Handle Query for Puntaje
  if (puntaje) {
    return getChistesByPuntaje(req, res, next);
  }

  if (categoria) {
    return getChisteCategoria(req, res);
  }

  //   Si no ha query, retorna todas los chistes de la DB
  return getChistes(req, res);
}
