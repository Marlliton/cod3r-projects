import * as functions from "firebase-functions";
import admin, { app as _app, initializeApp } from "firebase-admin";
import * as credentials from "../credentials.json";

const env = functions.config();

let app: _app.App = initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});


export { app };
