import { RepositorioPubSub } from "../../core/pubSub/RepositorioPubSub";

export default class ColacaoFilaMsgResposta implements RepositorioPubSub {
  private _provedor: RepositorioPubSub;

  constructor(provedor: RepositorioPubSub) {
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

  async enviarMensagem(nomeOuIdDoTopico: string, msg: any) {
    return this._provedor.enviarMensagem(nomeOuIdDoTopico, msg);
  }
}
