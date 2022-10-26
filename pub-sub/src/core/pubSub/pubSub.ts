interface FilaMsgRespostaProps {
  dados?: any
  emailUsuario?: string
  nomeDoNovoTopicoParaResposta?: string
}

export default class FilaMsgResposta{
  private _props: FilaMsgRespostaProps
  constructor(props: FilaMsgRespostaProps) {
      this._props = props
  }

  get dados() { return this._props.dados }
  get emailUsuario() { return this._props.emailUsuario }
  get nomeDoNovoTopicoParaResposta() { return this._props.nomeDoNovoTopicoParaResposta }
}
