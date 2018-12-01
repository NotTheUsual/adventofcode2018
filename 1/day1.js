const fs = require('fs')

function parse(input) {
  return input
    .split('\n')
    .reduce((sum, instruction) => sum + Number(instruction), 0)
}

function test(input, expected) {
  const result = parse(input)
  const symbol = (result === expected) ? '✅' : '❌'
  console.log(symbol, result, expected)
}

function run() {
  const input = fs.readFileSync('./input1.txt', 'utf8')
  const result = parse(input)
  console.log(`=================
  ${result}
=================`)
}

test(`+1
+1
+1`
, 3)

test(`+1
+1
-2`
, 0)

test(`-1
-2
-3`
, -6)

run()
