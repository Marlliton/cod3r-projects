import { criarTarefa } from "./trigger/email/criarTarefa/email";
import { enviarEmail } from "./trigger/email/envarEmail/email";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export { criarTarefa, enviarEmail };
