import Conta from "./conta/Conta";
import ContaEstudante from "./conta/ContaEstudante";
import Investir from "./investir/Investir";

const conta = new Conta();
const contaEstudante = new ContaEstudante();

const investir = new Investir();

investir.aplicarDinheiro([conta, contaEstudante]);

