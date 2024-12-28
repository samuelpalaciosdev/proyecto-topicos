import { z } from "zod";

import { CategoriaChiste, FuenteDelChiste } from "./enums";

// Schema del request del endpoint api/chistes/fuente/:fuente
export const getChisteByFuenteSchema = z.object({
  params: z.object({
    fuente: z.nativeEnum(FuenteDelChiste),
  }),
});

// Schema de los chistes por su Categoria
export const getChistesByCategoriaSchema = z.object({
  query: z.object({
    categoria: z.nativeEnum(CategoriaChiste),
  }),
});

// Schema del request del endpoint api/chistes?puntaje=num
export const getChistesByPuntajeSchema = z.object({
  query: z.object({
    puntaje: z.coerce.number().min(1).max(10),
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
      "Categoría inválida, debe ser: Dad joke, Humor Negro, Chistoso o Malo"
    ),
});

export type ChisteType = z.input<typeof chisteSchema>;
