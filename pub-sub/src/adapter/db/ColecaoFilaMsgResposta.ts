import { RepositorioTopicoPubSub } from "../../core/topicoPubSub/RepositorioTopicoPubSub";
import TopicoPubSub from "../../core/topicoPubSub/TopicoPubSub";

export default class ColacaoFilaMsgResposta implements RepositorioTopicoPubSub {
  private _provedor: RepositorioTopicoPubSub;

  constructor(provedor: RepositorioTopicoPubSub) {
    this._provedor = provedor;
  }
  async criarTopico(nomeTopico: string): Promise<any> {
    return await this._provedor.criarTopico(nomeTopico);
  }

  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito?: any): Promise<void> {
    return this._provedor.detetarTopico(nomeOuIdDoTopico, nomeDoInscrito);
  }

  async criarInscricaoNoTopico(nomeOuIdDoTopico: string, nomeInscricao: string) {
    return await this._provedor.criarInscricaoNoTopico(nomeOuIdDoTopico, nomeInscricao);
  }

  async escutarMensagens(nomeInscrito: string) {
    return await this._provedor.escutarMensagens(nomeInscrito);
  }

  async enviarMensagem(nomeOuIdDoTopico: string, topico: TopicoPubSub) {
    return this._provedor.enviarMensagem(nomeOuIdDoTopico, topico);
  }
}
