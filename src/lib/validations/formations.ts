import z from "zod";

export const formationSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  institution: z.string().min(1, { message: "A instituição é obrigatória" }),
  image: z.string().url({ message: "A URL da imagem deve ser válida" }),
  workload: z.number().positive({ message: "A carga horária deve ser um número positivo" }),
  initialDate: z.date({
    error: () => ({ message: "A data inicial deve ser uma data válida" }),
  }),
  endDate: z.date({
    error: () => ({ message: "A data final deve ser uma data válida" }),
  }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  type: z.string().min(2, { message: "O tipo deve ter pelo menos 2 caracteres" }),
  certificationUrl: z.string().optional(),
  concluded: z.boolean(),
  ownerId: z.string().min(1, { message: "O id do owner deve ser válido" }),
});
export const formationSchemaOptional = formationSchema.partial();

export type FormationAddFormData = z.infer<typeof formationSchema>;
export type FormationUpdateFormData = z.infer<typeof formationSchemaOptional>;
