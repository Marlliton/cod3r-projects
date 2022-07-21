import algoliasearch from "algoliasearch";
import "dotenv/config";

// Cria um novo index e adiciona um registro
const client = algoliasearch(
  process.env.APPLICATION_ID!,
  process.env.ADMIN_KEY!
);
const idDoCurso = "inciando-com-html-e-css";
const idDaAula = "id:2o21348upowijefças";

async function addDados(indexName: string) {
  const index = client.initIndex(indexName);
  const record = {
    objectID: idDaAula,
    idDoCurso,
    nomeAula: "Introdução",
    autorEmail: "mairo@email.com",
    autorNome: "Mairo dos Santos",
    titulo: "Outro titulo...",
    itens: [
      {
        conteudo: "Como que eu mudo o tema do vscode?",
        nome: "jose",
      },
      { conteudo: "Uma das formas é de tal jeito", nome: "Pedro" },
      { conteudo: "Outra possibilidade é essa", nome: "Augusto" },
      { conteudo: "você pode fazer tal coisa", nome: "Monica" },
    ],
  };

  await index.setSettings({
    // Filtro por campo => retorna todo o objeto que deu match
    // attributesForFaceting: [
    //   "nomeAula",
    //   "autorNome",
    //   "itens",
    //   "idDoCurso",
    //   "autorEmail",
    //   "titulo",
    // ],

    // Exclui/Oculta determinados campos para não aparecerem nas respostas
    attributesToRetrieve: [
      "*",
      '-idDoCurso',
      '-idDoCurso',
      '-nomeAula',
      '-autorEmail',
      '-autorNome',
      '-titulo',
      '-_highlightResult',
      '-itens',
    ],
  });

  await index.saveObject(record).wait();
}

// Pesquisa registros em um index

async function consultar(indexName: string) {
  const index = client.initIndex(indexName);
  try {
    index
      .search("como eu ", {
        filters: "NOT itens:hidden",
      })
      .then(({ hits }) => console.log(hits));
  } catch (error) {
    console.log("houve um erro: ", error);
  }
}

async function deleteIndex(indexName: string) {
  const index = client.initIndex(indexName);

  await index.delete();
}

(async function () {
  // await deleteIndex("forum:javascript");
  await addDados("forum:javascript");
  await consultar("forum:javascript");
})();
