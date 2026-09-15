import type { Usuario } from "@/modules/exemplo-usuarios/types/usuario.type.js";

// aqui cria as funções e as queries do banco que serão executadas
export class RepositorioDeUsuarios {
  private readonly usuarios: Usuario[] = [];

  async criar(usuario: Usuario): Promise<Usuario> {
    this.usuarios.push(usuario);

    return usuario;
  }
	// exemplo
	// async criar(usuario: Usuario): Promise<Usuario> {
  //   const resultado = await bancoDeDados.query<Usuario>(
  //     `
  //       INSERT INTO usuarios (id, nome, email)
  //       VALUES ($1, $2, $3)
  //       RETURNING id, nome, email
  //     `,
  //     [usuario.id, usuario.nome, usuario.email],
  //   );

  //   return resultado.rows[0]!;
  // }

  async selecionarTodos(): Promise<Usuario[]> {
    return [...this.usuarios];
  }
}
