#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - add         : addition (a + b)
 *  - subtract    : subtraction (a - b)
 *  - multiply    : multiplication (a * b)
 *  - divide      : division (a / b)
 *  - modulo      : remainder (a % b)
 *  - power       : exponentiation (a ** b)
 *  - sqrt        : square root (unary)
 *
 * The arithmetic functions are exported for unit testing.
 *
 * Usage examples:
 *   node src/calculator.js add 2 3       # outputs 5
 *   node src/calculator.js subtract 5 2  # outputs 3
 *   node src/calculator.js multiply 3 4  # outputs 12
 *   node src/calculator.js divide 8 2    # outputs 4
 *   node src/calculator.js modulo 10 3   # outputs 1
 *   node src/calculator.js power 2 8     # outputs 256
 *   node src/calculator.js sqrt 9        # outputs 3
 *
 * Exit codes:
 *   0 - success
 *   1 - invalid input or error
 */

function printHelp() {
  console.log('Usage: node src/calculator.js <operation> <num1> [num2]');
  console.log('Operations: add, subtract, multiply, divide, modulo, power, sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js sqrt 9');
}

function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// Exported arithmetic functions for unit testing
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const args = argv.slice(2);
  const opRaw = args[0];
  const operation = opRaw ? opRaw.toLowerCase() : null;

  if (!operation) {
    console.error('Error: missing operation.');
    printHelp();
    process.exit(1);
  }

  // Unary operation: sqrt
  if (operation === 'sqrt' || operation === 'squareroot') {
    const nRaw = args[1];
    if (nRaw === undefined) {
      console.error('Error: missing numeric argument for sqrt.');
      printHelp();
      process.exit(1);
    }
    const n = parseNumber(nRaw);
    if (n === null) {
      console.error('Error: argument must be a valid number.');
      process.exit(1);
    }

    try {
      const result = squareRoot(n);
      console.log(result);
      process.exit(0);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }

  // Binary operations: need two args
  const aRaw = args[1];
  const bRaw = args[2];

  if (aRaw === undefined || bRaw === undefined) {
    console.error('Error: missing numeric arguments.');
    printHelp();
    process.exit(1);
  }

  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);

  if (a === null || b === null) {
    console.error('Error: both arguments must be valid numbers.');
    process.exit(1);
  }

  let result;
  try {
    switch (operation) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
      case 'modulo':
        result = modulo(a, b);
        break;
      case 'power':
        result = power(a, b);
        break;
      default:
        console.error(`Error: unknown operation '${opRaw}'.`);
        printHelp();
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  console.log(result);
  process.exit(0);
}

// Export functions for testing
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
};

if (require.main === module) {
  main(process.argv);
}
