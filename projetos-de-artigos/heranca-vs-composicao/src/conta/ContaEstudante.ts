import Conta from "./Conta";

export default class ContaEstudante extends Conta {
  renderDinheiro(): number {
      throw "Conta estudante não pode render dinheiro";
  }
}