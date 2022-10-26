import * as functions from "firebase-functions";

export default class Logger {
  static log(message: string) {
    functions.logger.info(message);
  }
}
