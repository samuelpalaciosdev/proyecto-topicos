import * as z from "zod";

export const formSchema = z.object({
  method: z.enum(["GET", "PUT", "POST"]),
  id: z.string(),
  texto: z.string().min(1, "El autor es obligatorio"),
  autor: z.string().min(1, "El autor es obligatorio"),
  puntaje: z.number().min(1).max(10),
  categoria: z.enum(["dad-joke", "humor-negro", "chistoso", "malo"]),
});
