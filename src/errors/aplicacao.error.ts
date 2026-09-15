// Classe base para erros tratados pelo servidor.
// Erros que estendem esta classe são tratados automaticamente pelo tratador de erros.

export class ErroDeAplicacao extends Error {
  public statusCode: number;
  public code: string;

  constructor(codigoHttp: number, codigo: string, mensagem: string) {
    super(mensagem);
    this.statusCode = codigoHttp;
    this.code = codigo;
    this.name = "ErroDeAplicacao";
  }
}
