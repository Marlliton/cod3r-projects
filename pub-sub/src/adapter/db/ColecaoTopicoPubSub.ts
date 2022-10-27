import { ProvedorPubSubProps } from "../../core/dados/ProvedorPubSub";
import { RepositorioTopicoPubSub } from "../../core/topicoPubSub/RepositorioTopicoPubSub";
import TopicoPubSub from "../../core/topicoPubSub/TopicoPubSub";

export default class ColecaoTopicoPubSub implements RepositorioTopicoPubSub {
  private _provedor: ProvedorPubSubProps;

  constructor(provedor: ProvedorPubSubProps) {
    this._provedor = provedor;
  }
  async criarTopico(nomeTopico: string): Promise<any> {
    return await this._provedor.criarTopico(nomeTopico);
  }

  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito?: any): Promise<void> {
    return this._provedor.detetarTopico(nomeOuIdDoTopico, nomeDoInscrito);
  }

  async criarInscricaoNoTopico(nomeOuIdDoTopico: string, nomeInscricao: string) {
    return await this._provedor.adicionarInscritoNoTopico(nomeOuIdDoTopico, nomeInscricao);
  }

  async escutarMensagens(nomeInscrito: string) {
    return await this._provedor.escutarMensagens(nomeInscrito);
  }

  async enviarMensagem(nomeOuIdDoTopico: string, topico: TopicoPubSub) {
    return this._provedor.enviarMensagem(nomeOuIdDoTopico, topico);
  }
}
