// avancado.test.js
const {
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
} = require('./avancado');

describe('🚀 Suíte de Testes Unitários Avançados - Parte 2', () => {
  // 1. ehPalindromo (1 teste)
  test('1. Deve identificar palíndromos e rejeitar palavras comuns ou vazias', () => {
    expect(ehPalindromo('radar')).toBe(true);
    expect(ehPalindromo('Arara')).toBe(true);
    expect(ehPalindromo('javascript')).toBe(false);
    expect(ehPalindromo('')).toBe(false);
  });

  // 2. contarVogais (1 teste)
  test('2. Deve contar vogais acentuadas, comuns e retornar 0 quando não houver', () => {
    expect(contarVogais('programação')).toBe(5);
    expect(contarVogais('computador')).toBe(4);
    expect(contarVogais('xyz')).toBe(0);
  });

  // 3. calcularFatorial (1 teste)
  test('3. Deve calcular fatorial positivo, casos base e lançar erro para negativos', () => {
    expect(calcularFatorial(5)).toBe(120);
    expect(calcularFatorial(0)).toBe(1);
    expect(calcularFatorial(1)).toBe(1);
    expect(() => calcularFatorial(-5)).toThrow('Não existe fatorial de número negativo');
  });

  // 4. removerDuplicatas (1 teste)
  test('4. Deve remover duplicatas de arrays numéricos e de strings', () => {
    expect(removerDuplicatas([1, 1, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(removerDuplicatas(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });

  // 5. agendarConsulta (1 teste)
  test('5. Deve agendar em dias úteis e bloquear sábados e domingos', () => {
    const segunda = new Date(2026, 9, 26);
    const sabado = new Date(2026, 9, 24);
    const domingo = new Date(2026, 9, 25);

    expect(agendarConsulta(segunda)).toBe('Consulta agendada com sucesso');
    expect(() => agendarConsulta(sabado)).toThrow('Clínica fechada aos finais de semana');
    expect(() => agendarConsulta(domingo)).toThrow('Clínica fechada aos finais de semana');
  });

  // 6. formatarMoeda (1 teste)
  test('6. Deve formatar valores para Real brasileiro e rejeitar valores inválidos', () => {
    expect(formatarMoeda(100)).toBe('R$ 100,00');
    expect(formatarMoeda(15.5)).toBe('R$ 15,50');
    expect(() => formatarMoeda('abc')).toThrow('Valor inválido');
  });

  // 7. validarCpfBasico (1 teste)
  test('7. Deve validar CPFs com 11 dígitos e rejeitar repetidos ou curtos', () => {
    expect(validarCpfBasico('12345678901')).toBe(true);
    expect(validarCpfBasico('123.456.789-01')).toBe(true);
    expect(validarCpfBasico('11111111111')).toBe(false);
    expect(validarCpfBasico('12345')).toBe(false);
  });

  // 8. calcularIngresso (1 teste)
  test('8. Deve calcular ingresso integral e meia-entrada não cumulativa', () => {
    expect(calcularIngresso(25, false, 1)).toBe(40);
    expect(calcularIngresso(25, true, 1)).toBe(20);
    expect(calcularIngresso(65, false, 1)).toBe(20);
    expect(calcularIngresso(30, false, 3)).toBe(20);
    expect(calcularIngresso(65, true, 3)).toBe(20);
  });

  // 9. Classe ContaBancaria (5 testes)
  describe('9. Suíte da Classe ContaBancaria', () => {
    let conta;

    beforeEach(() => {
      conta = new ContaBancaria('Lucas');
    });

    test('Deve iniciar com saldo zero', () => {
      expect(conta.obterSaldo()).toBe(0);
    });

    test('Deve atualizar o saldo após depósito válido', () => {
      conta.depositar(150);
      expect(conta.obterSaldo()).toBe(150);
    });

    test('Deve lançar erro ao depositar valor negativo ou zero', () => {
      expect(() => conta.depositar(-50)).toThrow('Valor de depósito deve ser positivo');
    });

    test('Deve realizar saque válido e atualizar saldo', () => {
      conta.depositar(200);
      conta.sacar(80);
      expect(conta.obterSaldo()).toBe(120);
    });

    test('Deve lançar erro ao sacar valor maior que o saldo', () => {
      conta.depositar(50);
      expect(() => conta.sacar(100)).toThrow('Saldo insuficiente');
    });
  });

  // 10. Consulta Assíncrona de Clima com Mock (2 testes)
  describe('10. Suíte de Clima Assíncrono com Mock', () => {
    test('Deve retornar a temperatura formatada com sucesso', async () => {
      const servicoMock = {
        buscar: jest.fn().mockResolvedValue({ temperatura: 28 })
      };

      const resultado = await obterClima('São Paulo', servicoMock);

      expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
      expect(servicoMock.buscar).toHaveBeenCalledWith('São Paulo');
      expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
    });

    test('Deve lançar erro tratado em caso de falha na API', async () => {
      const servicoMockComFalha = {
        buscar: jest.fn().mockRejectedValue(new Error('Network Offline'))
      };

      await expect(obterClima('Curitiba', servicoMockComFalha)).rejects.toThrow(
        'Falha ao buscar dados climáticos'
      );
    });
  });
});