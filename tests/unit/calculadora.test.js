const calculadora = require("../../models/calculadora.js");

test("Somar 2 + 2 deveria retornar 4", () => {
  const soma = calculadora.somar(2, 2);
  expect(soma).toBe(4);
});

test("Somar 5 + 100 deveria retornar 5", () => {
  const soma = calculadora.somar(5, 100);
  expect(soma).toBe(105);
});

test("Somar 'banana' + 100 deveria retornar 'Erro'", () => {
  const soma = calculadora.somar("banana", 100);
  expect(soma).toBe("Erro");
});

test("Somar 20 + 'uva' deveria retornar 'Erro'", () => {
  const soma = calculadora.somar(20, "uva");
  expect(soma).toBe("Erro");
});
