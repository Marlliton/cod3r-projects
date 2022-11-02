import { ProvedorPubSub } from "./core/dados/ProvedorPubSub";
import TopicoPubSub from "./core/topicoPubSub/TopicoPubSub";
import { Servicos } from "./service";
import * as dotenv from "dotenv";
dotenv.config();

const servicos = new Servicos({ pubSub: new ProvedorPubSub() });

async function criarTopico() {
  await servicos.pubSub.criarTopico("recuperacaoSenha");
}

async function inscreverInteressado() {
  await servicos.pubSub.criarInscricaoNoTopico(
    "recuperacaoSenha",
    "observadorRecuperarSenha"
  );
}

async function enviarMensagemDeAtualizacao() {
  await servicos.pubSub.enviarMensagem(
    "recuperacaoSenha",
    new TopicoPubSub({
      dados: { status: "Completo", msg: `Uma mensagem de número` },
      emailUsuario: "teste@teste.com",
    })
  );
}

async function escutarAtualizacoes() {
  const res = await servicos.pubSub.escutarMensagens(
    "observadorRecuperarSenha"
  );
  console.log(res);
  process.exit(0);
}

// criarTopico()
// inscreverInteressado()

setTimeout(() => {
  enviarMensagemDeAtualizacao();
}, 3000);

escutarAtualizacoes();
