const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator arithmetic functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  // Additional cases
  test('addition with negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
    expect(add(-2, 3)).toBe(1);
  });

  test('subtraction with floats', () => {
    expect(subtract(5.5, 1.2)).toBeCloseTo(4.3, 5);
  });

  test('multiplication by zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });

  test('division by zero should throw', () => {
    expect(() => divide(1, 0)).toThrow('division by zero');
  });

  test('division with non-integer result', () => {
    expect(divide(7, 2)).toBeCloseTo(3.5, 10);
  });

  // New tests for extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero should throw', () => {
    expect(() => modulo(5, 0)).toThrow('modulo by zero');
  });

  test('power: 2 ** 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(2, 8)).toBe(256);
  });

  test('power with negative exponent', () => {
    expect(power(2, -1)).toBeCloseTo(0.5, 10);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative number should throw', () => {
    expect(() => squareRoot(-4)).toThrow('square root of negative number');
  });
});
