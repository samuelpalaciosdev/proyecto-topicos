import * as z from "zod";

export const formSchema = z.object({
  method: z.enum(["GET", "PUT", "POST"]),
  id: z.string().optional(),
  texto: z
    .string()
    .max(2000, "El chiste no puede tener más de 2000 caracteres"),
  autor: z.string().optional(),
  puntaje: z.number().min(1).max(10),
  categoria: z.enum(["dad-joke", "humor-negro", "chistoso", "malo"]),
});
