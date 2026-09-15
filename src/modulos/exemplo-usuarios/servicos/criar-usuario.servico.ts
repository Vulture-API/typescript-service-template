import { randomUUID } from "node:crypto";

import { ErroDeNomeDeUsuarioReservado } from "@/modulos/exemplo-usuarios/erros/nome-de-usuario-reservado.erro.js";
import type { CriarUsuario } from "@/modulos/exemplo-usuarios/esquemas/criar-usuario.esquema.js";
import type { RepositorioDeUsuarios } from "@/modulos/exemplo-usuarios/repositorios/usuarios.repositorio.js";
import type { Usuario } from "@/modulos/exemplo-usuarios/tipos/usuario.tipo.js";

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
