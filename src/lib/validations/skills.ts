import z from "zod";

export const skillSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título deve ter pelo menos 1 caractere  " })
    .max(50, { message: "O título deve ter no máximo 50 caracteres" }),
  image: z.string().url({ message: "A URL da imagem deve ser valida" }),
  stack: z.string().min(2, { message: "A stack deve ter pelo menos 2 caracteres" }),
  type: z.string().min(2, { message: "O tipo deve ter pelo menos 2 caracteres" }),
  subSkils: z
    .array(
      z
        .string()
        .min(2, { message: "A sub skill deve ter pelo menos 2 caracteres" })
        .max(100, { message: "A sub skill deve ter no máximo 50 caracteres" })
    )
    .min(1, { message: "O skill deve ter pelo menos uma sub skill" }),
});
export const skillUpdateSchema = skillSchema.partial();

export type SkillAddFormData = z.infer<typeof skillSchema>;
export type SkillUpdateFormData = z.infer<typeof skillUpdateSchema>;
