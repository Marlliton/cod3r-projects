import ColacaoFilaMsgResposta from "../adapter/db/ColecaoFilaMsgResposta";
import { ProvedorPubSub } from "../core/dados/ProvedorPubSub";
import servicoMsgResposta from "../core/msgResposta/servicoMsgResposta";

interface ServicosProps {
  pubSub: ProvedorPubSub;
}

class Servicos {
  private _props: ServicosProps;

  constructor(props: ServicosProps) {
    this._props = props;
  }

  get pubSub(): servicoMsgResposta {
    return new servicoMsgResposta(
      new ColacaoFilaMsgResposta(this._props.pubSub)
    );
  }
}

export { Servicos };
export type { ServicosProps };
