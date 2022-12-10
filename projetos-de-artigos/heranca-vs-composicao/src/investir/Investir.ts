import Conta from "../conta/Conta";

export default class Investir {
  aplicarDinheiro(contas: Conta[]) {
    contas.forEach(conta => {
      conta.renderDinheiro();
      console.log(`Novo Saldo: ${conta.getSaldo}`);
    });
  }
}
