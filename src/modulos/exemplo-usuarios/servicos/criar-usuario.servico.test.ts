import { describe, expect, it } from "vitest";

import { ErroDeNomeDeUsuarioReservado } from "@/modulos/exemplo-usuarios/erros/nome-de-usuario-reservado.erro.js";
import { RepositorioDeUsuarios } from "@/modulos/exemplo-usuarios/repositorios/usuarios.repositorio.js";
import { ServicoDeCriarUsuario } from "@/modulos/exemplo-usuarios/servicos/criar-usuario.servico.js";

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
