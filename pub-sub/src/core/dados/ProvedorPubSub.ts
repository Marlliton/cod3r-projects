import { PubSub, Subscription, Topic } from "@google-cloud/pubsub";

interface ProvedorPubSubProps {
  criarTopico(nomeDoTopico: string): Promise<Topic>;
  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito?: any): Promise<void>;
  criarInscricaoNoTopico(
    nomeOuIdDoTopico: string,
    nomeDaInscricao: string
  ): Promise<Subscription>;
  escutarMensagens(nomeInscrito: string): Promise<any>;
  enviarMensagem(nomeOuIdDoTopico: string, msg: any): Promise<void>;
}

// TODO: Remover todos os consoles

class ProvedorPubSub implements ProvedorPubSubProps {
  private _pubSub: PubSub;

  constructor() {
    this._pubSub = new PubSub({ projectId: "pub-sub-formacao-dev" });
  }

  async criarTopico(nomeDoTopico: string): Promise<Topic> {
    const [topic] = await this._pubSub.createTopic(nomeDoTopico);
    console.log("\nO tópico acabou de ser criado. \n\n\n");
    return topic;
  }

  async detetarTopico(
    nomeOuIdDoTopico: string,
    nomeDoInscrito?: any
  ): Promise<void> {
    const temTopico = await this._verificarSeExisteTopico(nomeOuIdDoTopico);
    const temInscrito = await this._verificarSeExisteInscrito(nomeOuIdDoTopico, nomeDoInscrito);

    if (!temTopico) return;
    if (temInscrito) {
      await this._pubSub
        .topic(nomeOuIdDoTopico)
        .subscription(nomeDoInscrito)
        .delete();
    }

    await this._pubSub.topic(nomeOuIdDoTopico).delete();
  }

  async criarInscricaoNoTopico(
    nomeOuIdDoTopico: string,
    nomeDaInscricao: string
  ): Promise<Subscription> {
    const [subscription] = await this._pubSub
      .topic(nomeOuIdDoTopico)
      .createSubscription(nomeDaInscricao);
    return subscription;
  }

  async escutarMensagens(nomeInscrito: string) {
    const inscrito = this._pubSub.subscription(nomeInscrito);

    const lidarComMsg = (msg: any) => {
      console.log(`\nMensagem recebida ${msg.id}:`);
      console.log(`\tDados da msg: ${msg.data}`);

      msg.ack(); // INFORMA QUE A MSG CHEGOU.
      return msg;
    };

    return inscrito.on("message", lidarComMsg);
  }

  async enviarMensagem(nomeOuIdDoTopico: string, msg: any): Promise<void> {
    const data = JSON.stringify(msg);
    await this._pubSub
      .topic(nomeOuIdDoTopico)
      .publishMessage({ data: Buffer.from(data) });
  }

  private _verificarSeExisteTopico(nomeOuIdDoTopico: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._pubSub.topic(nomeOuIdDoTopico).exists((err, existe) => {
        if (err) reject(err);
        resolve(existe!);
      });
    });
  }

  private _verificarSeExisteInscrito(
    nomeOuIdDoTopico: string,
    nomeDoInscrito?: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!nomeDoInscrito) return resolve(false);
      this._pubSub
        .topic(nomeOuIdDoTopico)
        .subscription(nomeDoInscrito)
        .exists((err, existe) => {
          if (err) return reject(err);
          resolve(true);
        });
    });
  }
}

export { ProvedorPubSub };
export type { ProvedorPubSubProps };
