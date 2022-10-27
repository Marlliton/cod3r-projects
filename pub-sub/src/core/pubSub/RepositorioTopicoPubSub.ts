import TopicoPubSub from "./TopicoPubSub";

export interface RepositorioTopicoPubSub {
  criarTopico(nomeDoTopico: string): Promise<any>;
  detetarTopico(nomeOuIdDoTopico: string, nomeDoInscrito: any): Promise<void>;
  criarInscricaoNoTopico( nomeOuIdDoTopico: string, nomeDaInscricao: string): Promise<any>;
  escutarMensagens(nomeInscrito: string): Promise<any>;
  enviarMensagem(nomeOuIdDoTopico: string, topico: TopicoPubSub): Promise<void>;
}