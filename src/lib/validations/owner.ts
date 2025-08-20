import z from "zod";

export const ownerUpdateSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email({ message: "Email deve ser válido" }),
  avatar: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "A URL do avatar deve ser válida",
    }),
  about: z.string().min(10, { message: "Sobre deve ter pelo menos 10 caracteres" }),
  occupation: z.string().min(1, { message: "A ocupação é obrigatória" }),
  birthDate: z.date({
    message: "A data de nascimento deve ser uma data válida",
  }),
  cvLinkPT: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "A URL do CV em português deve ser válida",
    }),
  cvLinkEN: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "A URL do CV em inglês deve ser válida",
    }),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "A senha deve ter pelo menos 6 caracteres",
    }),
});

export type OwnerUpdateFormData = z.infer<typeof ownerUpdateSchema>;
