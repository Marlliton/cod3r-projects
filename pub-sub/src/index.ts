import { ProvedorPubSub } from "./core/dados/ProvedorPubSub";
import { Servicos } from "./service";

const servicos = new Servicos({ pubSub: new ProvedorPubSub() });

async function criarTopico() {
  await servicos.pubSub.criarTopico("recuperacaoSenha")
}

async function inscreverInteressado() {
  await servicos.pubSub.criarInscricaoNoTopico("recuperacaoSenha", "observadorRecuperarSenha")
}

let contador = 0
async function enviarMensagemDeAtualizacao() {
  await servicos.pubSub.enviarMensagem("recuperacaoSenha", {
    status: "Sucesso",
    msg: `Senha Recuperada ${contador}`,
  })
}

async function escutarAtualizacoes() {
  await servicos.pubSub.escutarMensagens("observadorRecuperarSenha")
}


// criarTopico()
// inscreverInteressado()

setInterval(() => {
  enviarMensagemDeAtualizacao()
  contador++
}, 2000)

escutarAtualizacoes()





































// let contador = 0;
// const servicoResposta = new ServicoResposta();

// async function criarTopicoECriarUmInscrito() {
//   await servicoResposta.criarTopico("teste5");

//   await servicoResposta.enviarMensagem("teste5", "Fluxo processado");
// }

// // criarTopicoECriarUmInscrito()

// servicoResposta.criarSubscricaoNoTopico("teste5", "observador");

// async function enviarMensagem() {
//   await servicoResposta.enviarMensagem("teste5", {
//     status: "Vem do banco",
//     msg: `Uma msg de sucesso. N° ${contador}`,
//   });
// }

// setInterval(() => {
//   enviarMensagem();
//   contador++;
// }, 2000);

// servicoResposta.escutarMensagens("observador");
