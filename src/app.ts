import "@/config/zod.config.js";

import cookie from "@fastify/cookie";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { tratarErro } from "@/errors/tratador-de-erros.js";
import { rotasDeUsuarios } from "@/modules/exemplo-usuarios/routes/usuarios.route.js";

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
