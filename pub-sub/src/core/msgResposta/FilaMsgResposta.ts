interface FilaMsgRespostaProps {
  status?: string
  mensagem?: string
  id?: string
}

export default class FilaMsgResposta{
  private _props: FilaMsgRespostaProps
  constructor(props: FilaMsgRespostaProps) {
      this._props = props
  }

  get id() { return this._props.id }
  get mensagem() { return this._props.mensagem }
  get status() { return this._props.status }
  get props() { return this._props }
}