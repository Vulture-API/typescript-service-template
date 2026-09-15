import type { FastifyInstance } from "fastify";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { construirAplicacao } from "@/app.js";

describe("rotas de usuários", () => {
  let aplicacao: FastifyInstance;

  beforeEach(() => {
    aplicacao = construirAplicacao();
  });

  afterEach(async () => {
    await aplicacao.close();
  });

  it("cria um usuário pela rota com o prefixo /api", async () => {
    const resposta = await aplicacao.inject({
      method: "POST",
      url: "/api/usuarios",
      payload: {
        nome: "Maria",
        email: "maria@example.com",
      },
    });

    expect(resposta.statusCode).toBe(201);
    expect(resposta.json()).toEqual({
      id: expect.any(String),
      nome: "Maria",
      email: "maria@example.com",
    });
  });

  it("não expõe a rota sem o prefixo /api", async () => {
    const resposta = await aplicacao.inject({
      method: "POST",
      url: "/usuarios",
      payload: {
        nome: "Maria",
        email: "maria@example.com",
      },
    });

    expect(resposta.statusCode).toBe(404);
  });

  it("retorna um erro de validação para um corpo inválido", async () => {
    const resposta = await aplicacao.inject({
      method: "POST",
      url: "/api/usuarios",
      payload: {
        nome: "Ma",
        email: "email-invalido",
      },
    });

    expect(resposta.statusCode).toBe(400);
    expect(resposta.json()).toMatchObject({
      statusCode: 400,
      code: "VALIDATION_ERROR",
      message: "Dados inválidos",
    });
  });

  it("retorna o erro de negócio para um nome reservado", async () => {
    const resposta = await aplicacao.inject({
      method: "POST",
      url: "/api/usuarios",
      payload: {
        nome: " ADMIN ",
        email: "admin@example.com",
      },
    });

    expect(resposta.statusCode).toBe(422);
    expect(resposta.json()).toEqual({
      statusCode: 422,
      code: "NOME_DE_USUARIO_RESERVADO",
      message: "O nome de usuário informado é reservado.",
    });
  });

  it("retorna uma lista vazia quando não existem usuários", async () => {
    const resposta = await aplicacao.inject({
      method: "GET",
      url: "/api/usuarios",
    });

    expect(resposta.statusCode).toBe(200);
    expect(resposta.json()).toEqual([]);
  });

  it("lista os usuários criados na mesma aplicação", async () => {
    const respostaDeCriacao = await aplicacao.inject({
      method: "POST",
      url: "/api/usuarios",
      payload: {
        nome: "Maria",
        email: "maria@example.com",
      },
    });

    const respostaDeSelecao = await aplicacao.inject({
      method: "GET",
      url: "/api/usuarios",
    });

    expect(respostaDeSelecao.statusCode).toBe(200);
    expect(respostaDeSelecao.json()).toEqual([respostaDeCriacao.json()]);
  });
});
