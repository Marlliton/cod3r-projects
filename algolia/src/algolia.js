
const algoliasearch = require("algoliasearch");
require("dotenv").config();

// Cria um novo index e adiciona um registro
const client = algoliasearch(process.env.APLICATION_ID, process.env.ADMIN_KEY);
const idDoCurso = "forum:inciando-com-html-e-css";
const index = client.initIndex("forum");

async function criarIndex() {
  const record = {
    objectID: idDoCurso,
    autorEmail: "marlliton@email.com",
    autorNome: "Marlliton",
    titulo: "opa...",
    itens: [
      {
        idAula: 1,
        conteudo: "Este é um teste de criação de index",
        nome: "jose",
      },
      { idAula: 2, conteudo: "Este o teste 022", nome: "Pedro" },
      { idAula: 3, conteudo: "Este o teste 03", nome: "Augusto" },
      { idAula: 4, conteudo: "Este o teste 04", nome: "Monica" },
    ],
  };
  await index.saveObject(record).wait();
}

// Pesquisa registros em um index

async function consultar() {
  try {
    index.search("022").then(({ hits }) => console.log(hits));
  } catch (error) {
    console.log("houve um erro: ", error);
  }
}

(async function () {
  // await criarIndex();
  await consultar();  
})();
