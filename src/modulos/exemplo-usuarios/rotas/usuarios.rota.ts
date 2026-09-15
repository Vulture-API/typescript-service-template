import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { ControladorDeUsuario } from "@/modulos/exemplo-usuarios/controladores/usuario.controlador.js";
import { esquemaDeCriarUsuario } from "@/modulos/exemplo-usuarios/esquemas/criar-usuario.esquema.js";
import { RepositorioDeUsuarios } from "@/modulos/exemplo-usuarios/repositorios/usuarios.repositorio.js";
import { ServicoDeCriarUsuario } from "@/modulos/exemplo-usuarios/servicos/criar-usuario.servico.js";
import { ServicoDeSelecionarUsuarios } from "@/modulos/exemplo-usuarios/servicos/selecionar-usuarios.servico.js";

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
