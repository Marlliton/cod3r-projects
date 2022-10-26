export interface RepositorioMsgResposta {
  criarTopico(nomeDoTopico: string): Promise<any>;
  criarInscricaoNoTopico( nomeOuIdDoTopico: string, nomeDaInscricao: string
  ): Promise<any>;
  escutarMensagens(nomeInscrito: string): Promise<any>;
  enviarMensagem(nomeOuIdDoTopico: string, msg: any): Promise<void>;
}