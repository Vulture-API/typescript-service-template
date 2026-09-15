import { ErroDeAplicacao } from "@/erros/aplicacao.erro.js";

export class ErroDeNomeDeUsuarioReservado extends ErroDeAplicacao {
  constructor() {
    super(
      422,
      "NOME_DE_USUARIO_RESERVADO",
      "O nome de usuário informado é reservado.",
    );
  }
}
