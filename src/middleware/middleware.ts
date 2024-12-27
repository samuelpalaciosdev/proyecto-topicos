import express, { Request, Response, NextFunction } from "express";
import z from "zod";
import { chisteSchema, ChisteType } from "../validations/chiste-schema";

export const validation = (schema: z.ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // Aqui voy a validar que los campos cumplan con el esquema y sean campos validos
        req.body = schema.parse(req.body);
        next();
    } catch(err) {
       console.error(err);
       return res.status(400).json({
        mensaje: "Verifica los campos y los datos."
       })
    }
}