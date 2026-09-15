import { describe, expect, it } from "vitest";

import { RepositorioDeUsuarios } from "@/modules/exemplo-usuarios/repositories/usuarios.repository.js";
import { ServicoDeSelecionarUsuarios } from "@/modules/exemplo-usuarios/services/selecionar-usuarios.service.js";

describe("ServicoDeSelecionarUsuarios", () => {
  it("retorna uma lista vazia quando não existem usuários", async () => {
    const repositorioDeUsuarios = new RepositorioDeUsuarios();
    const servicoDeSelecionarUsuarios = new ServicoDeSelecionarUsuarios(
      repositorioDeUsuarios,
    );

    await expect(servicoDeSelecionarUsuarios.selecionarTodos()).resolves.toEqual(
      [],
    );
  });

  it("seleciona os usuários armazenados no repositório", async () => {
    const repositorioDeUsuarios = new RepositorioDeUsuarios();
    const servicoDeSelecionarUsuarios = new ServicoDeSelecionarUsuarios(
      repositorioDeUsuarios,
    );
    const usuario = {
      id: "usuario-1",
      nome: "Maria",
      email: "maria@example.com",
    };

    await repositorioDeUsuarios.criar(usuario);

    await expect(servicoDeSelecionarUsuarios.selecionarTodos()).resolves.toEqual(
      [usuario],
    );
  });
});
