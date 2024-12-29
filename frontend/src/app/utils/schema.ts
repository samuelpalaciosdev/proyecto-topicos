import * as z from "zod";

export const formSchema = z
  .object({
    method: z.enum(["GET", "PUT", "POST", "DELETE"]),
    id: z.string().optional(),
    texto: z.string().optional(),
    autor: z.string().optional(),
    puntaje: z.number().min(1).max(10),
    categoria: z.enum(["dad-joke", "humor-negro", "chistoso", "malo"]),
  })
  .superRefine((values, ctx) => {
    if (values.method === "POST" || values.method === "PUT") {
      if (!values.texto) {
        ctx.addIssue({
          code: "custom",
          path: ["texto"],
          message: "El texto es obligatorio para POST y PUT",
        });
      }
      if (!values.autor) {
        ctx.addIssue({
          code: "custom",
          path: ["autor"],
          message: "El autor es obligatorio para POST y PUT",
        });
      }
    }

    // if (values.method === "GET" && !values.id) {
    //   ctx.addIssue({
    //     code: "custom",
    //     path: ["id"],
    //     message: "El ID es obligatorio para GET",
    //   });
    // }
  });
