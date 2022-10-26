import { RepositorioMsgResposta } from "../../core/msgResposta/RepositorioMsgResposta";

export default class ColacaoFilaMsgResposta implements RepositorioMsgResposta {
  private _provedor: RepositorioMsgResposta;

  constructor(provedor: RepositorioMsgResposta) {
    this._provedor = provedor
  }
  async criarTopico(nomeTopico: string): Promise<any> {
    return await this._provedor.criarTopico(nomeTopico);
  }

  async criarInscricaoNoTopico(nomeOuIdDoTopico: string, nomeInscricao: string) {
    return await this._provedor.criarInscricaoNoTopico(nomeOuIdDoTopico, nomeInscricao)
  }

  async escutarMensagens(nomeInscrito: string) {
    return await this._provedor.escutarMensagens(nomeInscrito);
  }

  async enviarMensagem(nomeOuIdDoTopico: string, msg: any) {
    return this._provedor.enviarMensagem(nomeOuIdDoTopico, msg);
  }
}
