import ColecaoTopicoPubSub from "../adapter/db/ColecaoTopicoPubSub";
import { ProvedorPubSub } from "../core/dados/ProvedorPubSub";
import servicoPubSub from "../core/topicoPubSub/servicoTopicoPubSub";

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
      new ColecaoTopicoPubSub(this._props.pubSub)
    );
  }
}

export { Servicos };
export type { ServicosProps };
