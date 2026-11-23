// avancado.js

// 1. Verificador de Palíndromo (ignora maiúsculas e espaços)
function ehPalindromo(palavra) {
  if (!palavra) return false;
  const formatada = palavra.toLowerCase().trim();
  const invertida = formatada.split('').reverse().join('');
  return formatada === invertida;
}

// 2. Contador de Vogais (usando Expressão Regular)
function contarVogais(texto) {
  const correspondencias = texto.match(/[aeiouáéíóúâêôãõ]/gi);
  return correspondencias ? correspondencias.length : 0;
}

// 3. Calculadora de Fatorial (com tratamento de exceção para números negativos)
function calcularFatorial(n) {
  if (n < 0) throw new Error('Não existe fatorial de número negativo');
  if (n === 0 || n === 1) return 1;
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

// 4. Removedor de Duplicatas (utilizando Set)
function removerDuplicatas(array) {
  return [...new Set(array)];
}

// 5. Validador de Agendamento em Dias Úteis (bloqueia finais de semana)
function agendarConsulta(dataDaConsulta) {
  const diaSemana = dataDaConsulta.getDay(); // 0 = Domingo, 6 = Sábado
  if (diaSemana === 0 || diaSemana === 6) {
    throw new Error('Clínica fechada aos finais de semana');
  }
  return 'Consulta agendada com sucesso';
}

// 6. Formatador de Moeda Brasileira Simplificado (R$ 0,00)
function formatarMoeda(valor) {
  if (isNaN(valor)) throw new Error('Valor inválido');
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

// 7. Validador de CPF Básico (Tamanho de 11 dígitos e rejeição de repetidos)
function validarCpfBasico(cpf) {
  const apenasNumeros = cpf.replace(/\D/g, '');
  if (apenasNumeros.length !== 11) return false;

  const todosIguais = apenasNumeros.split('').every(c => c === apenasNumeros[0]);
  if (todosIguais) return false;

  return true;
}

// 8. Cálculo de Ingresso de Cinema (Ingresso R$ 40; Quarta-feira, estudante ou >= 60 paga meia; não cumulativo)
function calcularIngresso(idade, ehEstudante, diaDaSemana) {
  const precoBase = 40;
  const temDesconto = diaDaSemana === 3 || ehEstudante || idade >= 60;
  return temDesconto ? precoBase / 2 : precoBase;
}

// 9. Classe ContaBancaria (Orientação a Objetos)
class ContaBancaria {
  constructor(titular) {
    this.titular = titular;
    this.saldo = 0;
  }

  depositar(valor) {
    if (valor <= 0) throw new Error('Valor de depósito deve ser positivo');
    this.saldo += valor;
  }

  sacar(valor) {
    if (valor > this.saldo) throw new Error('Saldo insuficiente');
    this.saldo -= valor;
  }

  obterSaldo() {
    return this.saldo;
  }
}

// 10. Consulta de Clima Assíncrona com Serviço Externo
async function obterClima(cidade, servicoClima) {
  try {
    const resposta = await servicoClima.buscar(cidade);
    return `A temperatura em ${cidade} é de ${resposta.temperatura}°C`;
  } catch (erro) {
    throw new Error('Falha ao buscar dados climáticos');
  }
}

module.exports = {
  ehPalindromo,
  contarVogais,
  calcularFatorial,
  removerDuplicatas,
  agendarConsulta,
  formatarMoeda,
  validarCpfBasico,
  calcularIngresso,
  ContaBancaria,
  obterClima
};