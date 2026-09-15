import { randomUUID } from "node:crypto";

import { ErroDeNomeDeUsuarioReservado } from "@/modules/exemplo-usuarios/errors/nome-de-usuario-reservado.error.js";
import type { CriarUsuario } from "@/modules/exemplo-usuarios/schemas/criar-usuario.schema.js";
import type { RepositorioDeUsuarios } from "@/modules/exemplo-usuarios/repositories/usuarios.repository.js";
import type { Usuario } from "@/modules/exemplo-usuarios/types/usuario.type.js";

export class ServicoDeCriarUsuario {
  constructor(private readonly repositorioDeUsuarios: RepositorioDeUsuarios) {}

  async cadastrar(criarUsuario: CriarUsuario): Promise<Usuario> {
    const nomeNormalizado = criarUsuario.nome.trim();

    // Cria um erro conhecido para demonstrar o tratamento de erros da aplicação.
    if (nomeNormalizado.toLowerCase() === "admin") {
      throw new ErroDeNomeDeUsuarioReservado();
    }

    const usuario = {
      id: randomUUID(),
      nome: nomeNormalizado,
      email: criarUsuario.email,
    };

    return this.repositorioDeUsuarios.criar(usuario);
  }
}
