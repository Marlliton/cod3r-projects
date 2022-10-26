import * as functions from "firebase-functions";
import Logger from "../../../util/Logger";
import { v2beta3 } from "@google-cloud/tasks";

// Eu estou usando functions.https para testes, mas aqui ficaria observando o arquivo de emails a ser enviados por exemplo.
export const criarTarefa = functions.https.onRequest(
  async (request, response) => {
    const project = "teste-filas"; // id do projeto
    const queue = "teste-email"; // nome da fila
    const location = "us-central1"; // localização da fila
    const url = "https://us-central1-teste-filas.cloudfunctions.net/enviarEmail"; // url para onde será enviado o task
    const email = "firebase-adminsdk-tru3v@teste-filas.iam.gserviceaccount.com"; // email do serviço de autenticação do GCP
    const payload = request.body.payload ?? "Uma mensagem padrão"; // corpo da menagem
    // date = new Date() // não sei o que é isso ainda

    Logger.log("Função chamada:: ciracaoDeTarefaEmail");

    Logger.log("Iniciando a criação da tarefa");
    await createHttpTaskWithToken({project, queue, location, url, email, payload});
    Logger.log("Criação da tarefa finalizada");
    response.status(204).send();
  }
);

interface EmailProps {
  project: string;
  queue: string;
  location: string;
  url: string;
  email: string;
  payload: string;
}

async function createHttpTaskWithToken(props: EmailProps) {
  const client = new v2beta3.CloudTasksClient();
  Logger.log("Instanciando o cliente do GCP");

  const parent = client.queuePath(props.project, props.location, props.queue);
  Logger.log("Construir a fila");

  const convertedPayload = JSON.stringify(props.payload);
  const body = Buffer.from(convertedPayload).toString("base64");
  Logger.log("converte o corpo da mensagem para base64.");

  const task = {
    httpRequest: {
      httpMethod: "POST",
      url: props.url,
      oidcToken: {
        serviceAccountEmail: props.email,
        audience: new URL(props.url).origin,
      },
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };

  // const convertedDate = new Date(date);
  // const currentDate = new Date();

  // // Schedule time can not be in the past.
  // if (convertedDate < currentDate) {
  //   console.error('Scheduled date in the past.');
  // } else if (convertedDate > currentDate) {
  //   const date_diff_in_seconds = (convertedDate - currentDate) / 1000;
  //   // Restrict schedule time to the 30 day maximum.
  //   if (date_diff_in_seconds > MAX_SCHEDULE_LIMIT) {
  //     console.error('Schedule time is over 30 day maximum.');
  //   }
  //   // Construct future date in Unix time.
  //   const date_in_seconds =
  //     Math.min(date_diff_in_seconds, MAX_SCHEDULE_LIMIT) + Date.now() / 1000;
  //   // Add schedule time to request in Unix time using Timestamp structure.
  //   // https://googleapis.dev/nodejs/tasks/latest/google.protobuf.html#.Timestamp
  //   task.scheduleTime = {
  //     seconds: date_in_seconds,
  //   };
  // }

  try {
    Logger.log("Iniciando tentativa de envio de solicitação para o GCP");
    const request = { parent: parent, task: task };

    const [response] = await client.createTask(request as any);
    Logger.log("Tarefa criada com sucesso");
    Logger.log(`Retorno da tarefa ${response}`);
    return response.name;
  } catch (error) {
    Logger.log(`Ocorreu um erro:: ${Error((error as any).message)}`);
    return error;
  }
}
