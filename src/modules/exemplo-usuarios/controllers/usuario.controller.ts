import type { FastifyReply, FastifyRequest } from "fastify";

import type { CriarUsuario } from "@/modules/exemplo-usuarios/schemas/criar-usuario.schema.js";
import type { ServicoDeCriarUsuario } from "@/modules/exemplo-usuarios/services/criar-usuario.service.js";
import type { ServicoDeSelecionarUsuarios } from "@/modules/exemplo-usuarios/services/selecionar-usuarios.service.js";

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
