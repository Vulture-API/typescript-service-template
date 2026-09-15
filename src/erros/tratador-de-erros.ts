import {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";

import { ambiente } from "@/configuracoes/ambiente.js";
import { ErroDeAplicacao } from "@/erros/aplicacao.erro.js";

export function tratarErro(
  erro: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(erro);

  const detalhesDeDesenvolvimento =
    ambiente.NODE_ENV === "development" ? { dev_test: erro } : {};

  // Erros encontrados nas validações do Fastify com Zod nas rotas.
  if (erro.validation) {
    return reply.status(400).send({
      statusCode: 400,
      code: "VALIDATION_ERROR",
      message: "Dados inválidos",
      errors: erro.validation,
      ...detalhesDeDesenvolvimento,
    });
  }

  // Erros conhecidos da aplicação.
  if (erro instanceof ErroDeAplicacao) {
    return reply.status(erro.statusCode).send({
      statusCode: erro.statusCode,
      code: erro.code,
      message: erro.message,
      ...detalhesDeDesenvolvimento,
    });
  }

  // Erros que não foram tratados.
  return reply.status(500).send({
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
    ...detalhesDeDesenvolvimento,
  });
}
