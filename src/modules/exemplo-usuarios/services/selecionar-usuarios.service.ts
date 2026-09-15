import type { RepositorioDeUsuarios } from "@/modules/exemplo-usuarios/repositories/usuarios.repository.js";
import type { Usuario } from "@/modules/exemplo-usuarios/types/usuario.type.js";

export class ServicoDeSelecionarUsuarios {
  constructor(private readonly repositorioDeUsuarios: RepositorioDeUsuarios) {}

  async selecionarTodos(): Promise<Usuario[]> {
    return this.repositorioDeUsuarios.selecionarTodos();
  }
}
