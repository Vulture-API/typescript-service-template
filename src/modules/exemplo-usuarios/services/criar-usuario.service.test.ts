import { describe, expect, it } from "vitest";

import { ErroDeNomeDeUsuarioReservado } from "@/modules/exemplo-usuarios/errors/nome-de-usuario-reservado.error.js";
import { RepositorioDeUsuarios } from "@/modules/exemplo-usuarios/repositories/usuarios.repository.js";
import { ServicoDeCriarUsuario } from "@/modules/exemplo-usuarios/services/criar-usuario.service.js";

describe("ServicoDeCriarUsuario", () => {
  it("cria e persiste um usuário fictício", async () => {
    const repositorioDeUsuarios = new RepositorioDeUsuarios();
    const servicoDeCriarUsuario = new ServicoDeCriarUsuario(
      repositorioDeUsuarios,
    );

    const usuario = await servicoDeCriarUsuario.cadastrar({
      nome: "  Maria  ",
      email: "maria@example.com",
    });

    expect(usuario).toEqual({
      id: expect.any(String),
      nome: "Maria",
      email: "maria@example.com",
    });
    await expect(repositorioDeUsuarios.selecionarTodos()).resolves.toEqual([
      usuario,
    ]);
  });

  it.each(["admin", " ADMIN ", "AdMiN"])(
    "rejeita o nome reservado %s",
    async (nome) => {
      const repositorioDeUsuarios = new RepositorioDeUsuarios();
      const servicoDeCriarUsuario = new ServicoDeCriarUsuario(
        repositorioDeUsuarios,
      );

      await expect(
        servicoDeCriarUsuario.cadastrar({
          nome,
          email: "admin@example.com",
        }),
      ).rejects.toBeInstanceOf(ErroDeNomeDeUsuarioReservado);
    },
  );
});
