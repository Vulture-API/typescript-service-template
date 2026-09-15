import type { FastifyReply, FastifyRequest } from "fastify";

import type { CriarUsuario } from "@/modulos/exemplo-usuarios/esquemas/criar-usuario.esquema.js";
import type { ServicoDeCriarUsuario } from "@/modulos/exemplo-usuarios/servicos/criar-usuario.servico.js";
import type { ServicoDeSelecionarUsuarios } from "@/modulos/exemplo-usuarios/servicos/selecionar-usuarios.servico.js";

export class ControladorDeUsuario {
  constructor(
    private readonly servicoDeCriarUsuario: ServicoDeCriarUsuario,
    private readonly servicoDeSelecionarUsuarios: ServicoDeSelecionarUsuarios,
  ) {}

  cadastrar = async (
    request: FastifyRequest<{ Body: CriarUsuario }>,
    reply: FastifyReply,
  ) => {
    const usuario = await this.servicoDeCriarUsuario.cadastrar(request.body);

    return reply.status(201).send(usuario);
  };

  selecionarTodos = async (request: FastifyRequest, reply: FastifyReply) => {
    const usuarios = await this.servicoDeSelecionarUsuarios.selecionarTodos();

    return reply.status(200).send(usuarios);
  };
}
