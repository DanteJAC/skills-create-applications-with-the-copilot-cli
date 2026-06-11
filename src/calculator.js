#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - add       : addition (a + b)
 *  - subtract  : subtraction (a - b)
 *  - multiply  : multiplication (a * b)
 *  - divide    : division (a / b)
 *
 * The arithmetic functions are exported for unit testing.
 *
 * Usage examples:
 *   node src/calculator.js add 2 3       # outputs 5
 *   node src/calculator.js subtract 5 2  # outputs 3
 *   node src/calculator.js multiply 3 4  # outputs 12
 *   node src/calculator.js divide 8 2    # outputs 4
 *
 * Exit codes:
 *   0 - success
 *   1 - invalid input or error (e.g., division by zero)
 */

function printHelp() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide');
  console.log('Example: node src/calculator.js add 2 3');
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

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const [,, op, aRaw, bRaw] = argv;

  if (!op || aRaw === undefined || bRaw === undefined) {
    console.error('Error: missing arguments.');
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
  const operation = op.toLowerCase();

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
      default:
        console.error(`Error: unknown operation '${op}'.`);
        printHelp();
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  // Print result to stdout
  console.log(result);
  process.exit(0);
}

// Export functions for testing
module.exports = {
  add,
  subtract,
  multiply,
  divide,
};

if (require.main === module) {
  main(process.argv);
}
