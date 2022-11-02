import { readFile } from "node:fs";

function lerArquivo(caminho) {
  return new Promise((resolve, reject) => {
    readFile(caminho, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

console.log("Tem que ser executado antes de mostrar o resultado.\n");

const resultado = await lerArquivo("./exemplo.txt");
console.log(resultado);

console.log("\nTem que ser executado DEPOIS de mostrar o resultado.");
