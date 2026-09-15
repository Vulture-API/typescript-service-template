import z from "zod";

export const esquemaDeCriarUsuario = z.object({
  nome: z.string().trim().min(3),
  email: z.email(),
});

export type CriarUsuario = z.infer<typeof esquemaDeCriarUsuario>;
