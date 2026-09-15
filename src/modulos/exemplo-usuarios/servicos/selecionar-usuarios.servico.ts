import type { RepositorioDeUsuarios } from "@/modulos/exemplo-usuarios/repositorios/usuarios.repositorio.js";
import type { Usuario } from "@/modulos/exemplo-usuarios/tipos/usuario.tipo.js";

export class ServicoDeSelecionarUsuarios {
  constructor(private readonly repositorioDeUsuarios: RepositorioDeUsuarios) {}

  async selecionarTodos(): Promise<Usuario[]> {
    return this.repositorioDeUsuarios.selecionarTodos();
  }
}
