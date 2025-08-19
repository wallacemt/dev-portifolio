import { z } from "zod";

export const projectAddSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  techs: z.array(z.string()).min(1, "Pelo menos uma tecnologia é obrigatória"),
  screenshots: z.array(z.string()),
  deployment: z.string(),
  backend: z.string().optional(),
  frontend: z.string().optional(),
  previewImage: z.string().url("URL da imagem de preview deve ser válida"),
  lastUpdate: z.date(),
});

export const projectUpdateSchema = projectAddSchema.partial();

export type ProjectAddFormData = z.infer<typeof projectAddSchema>;
export type ProjectUpdateFormData = z.infer<typeof projectUpdateSchema>;
