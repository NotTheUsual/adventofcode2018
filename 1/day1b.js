const fs = require('fs')

function parse(input) {
  const instructions = input.split('\n').filter(i => i).map(Number)
  const frequencies = { 0: true }
  const state = { frequency: 0, index: 0 }

  while (true) {
    const { frequency, index } = state
    state.frequency = frequency + instructions[index]
    if (frequencies[state.frequency]) return state.frequency
    frequencies[state.frequency] = true
    state.index = (index + 1) % instructions.length
  }
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
-1`
, 0)

test(`+3
+3
+4
-2
-4`
, 10)

test(`-6
+3
+8
+5
-6`
, 5)

test(`+7
+7
-2
-7
-4`, 14)

run()
