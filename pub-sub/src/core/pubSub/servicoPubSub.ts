import { RepositorioPubSub } from "./RepositorioPubSub";

export default class servicoPubSub {
  private _repo: RepositorioPubSub;

  constructor(repo: RepositorioPubSub) {
    this._repo = repo;
  }

  async criarTopico(nomeTopico: string): Promise<any> {
    return await this._repo.criarTopico(nomeTopico);
  }

  async criarInscricaoNoTopico(
    nomeOuIdDoTopico: string,
    nomeInscricao: string
  ) {
    return await this._repo.criarInscricaoNoTopico(
      nomeOuIdDoTopico,
      nomeInscricao
    );
  }

  async escutarMensagens(nomeInscrito: string) {
    return await this._repo.escutarMensagens(nomeInscrito);
  }

  async enviarMensagem(nomeOuIdDoTopico: string, msg: any) {
    return this._repo.enviarMensagem(nomeOuIdDoTopico, msg);
  }

  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito?: any): Promise<void> {
    return this._repo.detetarTopico(nomeOuIdDoTopico, nomeDoInscrito);
  }
}
