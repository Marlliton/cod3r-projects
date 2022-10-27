interface TopicoPubSubProps {
  dados?: any
  emailUsuario?: string
  nomeDoNovoTopicoParaResposta?: string
}

export default class TopicoPubSub{
  private _props: TopicoPubSubProps
  constructor(props: TopicoPubSubProps) {
      this._props = props
  }

  get dados() { return this._props.dados }
  get emailUsuario() { return this._props.emailUsuario }
  get nomeDoNovoTopicoParaResposta() { return this._props.nomeDoNovoTopicoParaResposta }
  get props() { return this._props }
}
