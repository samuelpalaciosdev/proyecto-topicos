import { z } from "zod";

import { FuenteDelChiste } from "./enums";

// Schema del request del endpoint api/chistes?fuente=
export const getChisteSchema = z.object({
  query: z.object({
    fuente: z.nativeEnum(FuenteDelChiste),
  }),
});

export const chisteSchema = z.object({
  texto: z
    .string()
    .trim()
    .max(2000, "Chistes tan largos no dan risa")
    .nonempty("Por favor ingresa el texto del chiste"),

  autor: z.string().trim().optional().default("Se perdió en el Ávila como Led"),

  puntaje: z
    .number()
    .min(1, "El puntaje debe ser mínimo 1")
    .max(10, "El puntaje debe ser como máximo 10"),

  categoria: z
    .enum(["dad joke", "humor negro", "chistoso", "malo"])
    .describe(
      "Categoría inválida, debe ser: Dad joke, Humor Negro, Chistoso o Malo",
    ),
});

export type ChisteType = z.input<typeof chisteSchema>;
