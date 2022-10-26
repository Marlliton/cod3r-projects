import ColacaoFilaMsgResposta from "../adapter/db/ColecaoFilaMsgResposta";
import { ProvedorPubSub } from "../core/dados/ProvedorPubSub";
import servicoPubSub from "../core/pubSub/servicoPubSub";

interface ServicosProps {
  pubSub: ProvedorPubSub;
}

class Servicos {
  private _props: ServicosProps;

  constructor(props: ServicosProps) {
    this._props = props;
  }

  get pubSub(): servicoPubSub {
    return new servicoPubSub(
      new ColacaoFilaMsgResposta(this._props.pubSub)
    );
  }
}

export { Servicos };
export type { ServicosProps };
