import { PubSub, Subscription, Topic } from "@google-cloud/pubsub";

interface ProvedorPubSubProps {
  criarTopico(nomeDoTopico: string): Promise<Topic>;
  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito?: any): Promise<void>;
  criarInscricaoNoTopico(nomeOuIdDoTopico: string, nomeDaInscricao: string): Promise<Subscription>;
  escutarMensagens(nomeInscrito: string): Promise<any>;
  enviarMensagem(nomeOuIdDoTopico: string, msg: any): Promise<void>;
}

// TODO: Remover todos os consoles

class ProvedorPubSub implements ProvedorPubSubProps {
  private _pubSub: PubSub;

  constructor() {
    this._pubSub = new PubSub({ projectId: process.env.ID });
  }

  async criarTopico(nomeDoTopico: string): Promise<Topic> {
    const [topic] = await this._pubSub.createTopic(nomeDoTopico);
    return topic;
  }

  async detetarTopico(
    nomeOuIdDoTopico: string,
    nomeDoInscrito?: any
  ): Promise<void> {
    const temTopico = await this._verificarSeExisteTopico(nomeOuIdDoTopico);
    const temInscrito = await this._verificarSeExisteInscrito(
      nomeOuIdDoTopico,
      nomeDoInscrito
    );

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
    const inscricao = this._pubSub.subscription(nomeInscrito);
    const msg = await this._converterMsgRecebida(inscricao)
    
    return {
      idMsg: msg.id,
      ...JSON.parse(msg.data)
    }
  }

  async enviarMensagem(nomeOuIdDoTopico: string, msg: any): Promise<void> {
    const data = JSON.stringify(msg.props);
    await this._pubSub
      .topic(nomeOuIdDoTopico)
      .publishMessage({ data: Buffer.from(data) });
  }

  private _converterMsgRecebida(inscricao: Subscription): Promise<any> {
    return new Promise(resolve => {
      inscricao.on("message", msg => {
        
        resolve(msg);
        msg.ack(); // INFORMA QUE A MSG CHEGOU.
      });
    });
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
