import * as functions from "firebase-functions";

export const enviarEmail = functions.https.onRequest(
  async (request, response) => {

    console.log(`Corpo da mensagem: ${request.body.payload}`);
    console.log(`Semente o body: ${request.body}`);

    const { para, nome, remetente } = request.body;

    if (!para) {
      const error: any = new Error("Endereço de email não fornecido.");
      error.code = 400;
      throw error;
    } else if (!nome) {
      const error: any = new Error("Nome do destinatário não fornecido.");
      error.code = 400;
      throw error;
    } else if (!remetente) {
      const error: any = new Error("Nome do remetente não fornecido.");
      error.code = 400;
      throw error;
    }

    const msg = {
      to: para,
      from: "marlliton.souza1@gmail.com",
      subject: "Teste de envio de email",
      html: template(para, nome, request.body.payload),
    };

    try {

        // Parte do send grid

      response.status(200).send("Postcard Sent!");
    } catch (error) {

      // Lidar com os possíveis erros de envio de email

      response.status((error as any).code).send((error as any).message);
    }

    response.status(204).end();
  }
);

const template = function (to: string, from: string, payload: string) {
  return `<html>
  <head>
    <style>
      .container {
        width: 600px;
        height: 400px;
        background: #4285F4;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div>
        To: ${to}
        <br>
        From: ${from}
      </div>
      <div>
          ${payload}
      </div>
    </div>
  </body>
</html>`;
};
