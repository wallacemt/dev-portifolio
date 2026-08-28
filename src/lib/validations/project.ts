import { z } from "zod";
import { isYoutubeUrl } from "@/utilis/youtube";

const youtubeVideoUrl = z
  .string()
  .url("A url do vídeo deve ser válida")
  .refine(isYoutubeUrl, "A url deve ser um link do YouTube válido");

export const projectAddSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  techs: z.array(z.string()).min(1, "Pelo menos uma tecnologia é obrigatória"),
  screenshots: z.array(z.string()),
  deployment: z.string(),
  backend: z.string().optional(),
  frontend: z.string().optional(),
  previewImage: z.string().url("URL da imagem de preview deve ser válida"),
  logoUrl: z.string().url("URL do logo deve ser válida").optional().or(z.literal("")),
  videos: z.array(youtubeVideoUrl).max(5, "No máximo 5 vídeos são permitidos").optional(),
  lastUpdate: z.date(),
});

export const projectUpdateSchema = projectAddSchema.partial();

export type ProjectAddFormData = z.infer<typeof projectAddSchema>;
export type ProjectUpdateFormData = z.infer<typeof projectUpdateSchema>;
