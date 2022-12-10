export default class Conta {
  protected saldo: number;
  constructor() {
    this.saldo = 0;
  }

  depositar(valor: number) {
    if (valor < 0) {
      console.log("Valor abaixo de zero.");
      return;
    }
    this.saldo = valor;
  }

  get getSaldo() { return this.saldo }

  renderDinheiro() {
    return (this.saldo *= 1.1);
  }
}
