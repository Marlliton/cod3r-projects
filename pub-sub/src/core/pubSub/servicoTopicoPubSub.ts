import { RepositorioTopicoPubSub } from "./RepositorioTopicoPubSub";
import TopicoPubSub from "./TopicoPubSub";

export default class servicoPubSub {
  private _repo: RepositorioTopicoPubSub;

  constructor(repo: RepositorioTopicoPubSub) {
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

  async enviarMensagem(nomeOuIdDoTopico: string, topico: TopicoPubSub) {
    return this._repo.enviarMensagem(nomeOuIdDoTopico, topico);
  }

  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito?: any): Promise<void> {
    return this._repo.detetarTopico(nomeOuIdDoTopico, nomeDoInscrito);
  }
}
