const fs = require('fs')

function test(input, output) {
  const symbol = (input.twos === output.twos && input.threes === output.threes)
    ? '✅' : '❌'
  console.log(symbol, input, output)
}

const createStore = () => new Proxy({}, { get: (target, name) => name in target ? target[name] : 0 })

function countLetters(input) {
  const counts = input.split('').reduce((store, letter) => {
    store[letter] += 1
    return store
  }, createStore())
  return Object.keys(counts).reduce((totals, letter) => {
    if (totals.twos && totals.threes) return totals
    if (counts[letter] === 3) totals.threes = true
    if (counts[letter] === 2) totals.twos = true
    return totals
  }, { twos: false, threes: false })
}

function checksum(input) {
  return input.split('\n').filter(i => i).reduce((counts, line) => {
    const letters = countLetters(line)
    if (letters.twos) counts.twos += 1
    if (letters.threes) counts.threes += 1
    return counts
  }, { twos: 0, threes: 0 })
}

test(countLetters('abcdef'), { twos: false, threes: false })
test(countLetters('bababc'), { twos: true, threes: true })
test(countLetters('abbcde'), { twos: true, threes: false })
test(countLetters('abcccd'), { twos: false, threes: true })
test(countLetters('aabcdd'), { twos: true, threes: false })

test(checksum(`abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`), { twos: 4, threes: 3 })

function run() {
  const input = fs.readFileSync('./input2.txt', 'utf8')
  const { twos, threes } = checksum(input)
  console.log(`=================
  ${twos * threes}
=================`)
}

run()
