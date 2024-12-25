import { z } from "zod";

import { FuenteDelChiste } from "./enums";

// Schema del request del endpoint api/chistes?fuente=
export const getChisteSchema = z.object({
  query: z.object({
    fuente: z.nativeEnum(FuenteDelChiste),
  }),
});
