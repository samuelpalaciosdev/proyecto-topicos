import { z } from "zod";

import { FuenteDelChiste } from "./enums";

// Schema del request del endpoint api/chistes/fuente/:fuente
export const getChisteByFuenteSchema = z.object({
  params: z.object({
    fuente: z.nativeEnum(FuenteDelChiste),
  }),
});
