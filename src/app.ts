import "@/configuracoes/zod.configuracao.js";

import cookie from "@fastify/cookie";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { tratarErro } from "@/erros/tratador-de-erros.js";
import { rotasDeUsuarios } from "@/modulos/exemplo-usuarios/rotas/usuarios.rota.js";

export function construirAplicacao() {
  const aplicacao = Fastify({
    logger: false,
  }).withTypeProvider<ZodTypeProvider>();

  aplicacao.setValidatorCompiler(validatorCompiler);
  aplicacao.setSerializerCompiler(serializerCompiler);
  aplicacao.setErrorHandler(tratarErro);

  aplicacao.register(cookie);
  aplicacao.register(rotasDeUsuarios, { prefix: "/api/usuarios" });

  return aplicacao;
}
