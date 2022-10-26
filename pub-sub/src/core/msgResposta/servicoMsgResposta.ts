import { RepositorioMsgResposta } from "./RepositorioMsgResposta";

export default class servicoMsgResposta {
  private _repo: RepositorioMsgResposta;

  constructor(repo: RepositorioMsgResposta) {
    this._repo = repo
  }

  async criarTopico(nomeTopico: string): Promise<any> {
    return await this._repo.criarTopico(nomeTopico);
  }

  async criarInscricaoNoTopico(nomeOuIdDoTopico: string, nomeInscricao: string) {
    return await this._repo.criarInscricaoNoTopico(nomeOuIdDoTopico, nomeInscricao)
  }

  async escutarMensagens(nomeInscrito: string) {
    return await this._repo.escutarMensagens(nomeInscrito);
  }

  async enviarMensagem(nomeOuIdDoTopico: string, msg: any) {
    return this._repo.enviarMensagem(nomeOuIdDoTopico, msg);
  }
}
