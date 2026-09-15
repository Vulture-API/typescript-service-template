import { ambiente } from "@/configuracoes/ambiente.js";
import { bancoDeDados } from "@/infraestrutura/banco-de-dados.js";
import { construirAplicacao } from "@/app.js";

const aplicacao = construirAplicacao();
let encerrando = false;

async function encerrarAplicacao(sinal: NodeJS.Signals) {
  if (encerrando) return;

  encerrando = true;
  console.log(`Recebido ${sinal}. Encerrando aplicação...`);

  try {
    await aplicacao.close();

    await bancoDeDados.end();

    console.log("Aplicação encerrada.");
  } catch (erro) {
    console.error("Erro ao encerrar aplicação:", erro);
    process.exitCode = 1;
  }
}

process.once("SIGINT", () => {
  void encerrarAplicacao("SIGINT");
});

process.once("SIGTERM", () => {
  void encerrarAplicacao("SIGTERM");
});

await aplicacao.listen({
  port: ambiente.PORT,
});

console.log("Servidor rodando!");
console.log(`http://localhost:${ambiente.PORT}`);