import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { ControladorDeUsuario } from "@/modules/exemplo-usuarios/controllers/usuario.controller.js";
import { esquemaDeCriarUsuario } from "@/modules/exemplo-usuarios/schemas/criar-usuario.schema.js";
import { RepositorioDeUsuarios } from "@/modules/exemplo-usuarios/repositories/usuarios.repository.js";
import { ServicoDeCriarUsuario } from "@/modules/exemplo-usuarios/services/criar-usuario.service.js";
import { ServicoDeSelecionarUsuarios } from "@/modules/exemplo-usuarios/services/selecionar-usuarios.service.js";

export const rotasDeUsuarios: FastifyPluginAsyncZod = async (aplicacao) => {
  const repositorioDeUsuarios = new RepositorioDeUsuarios();
  const servicoDeCriarUsuario = new ServicoDeCriarUsuario(
    repositorioDeUsuarios,
  );
  const servicoDeSelecionarUsuarios = new ServicoDeSelecionarUsuarios(
    repositorioDeUsuarios,
  );
  const controladorDeUsuario = new ControladorDeUsuario(
    servicoDeCriarUsuario,
    servicoDeSelecionarUsuarios,
  );

  aplicacao.post(
    "/",
    {
      schema: {
        // Um corpo fora deste esquema gera um erro de validação.
        body: esquemaDeCriarUsuario,
      },
    },
    controladorDeUsuario.cadastrar,
  );

  aplicacao.get("/", controladorDeUsuario.selecionarTodos);
};
