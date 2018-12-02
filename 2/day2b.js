const fs = require('fs')

const testInput = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`

function parse(input) {
  const lines = input.split('\n')
  for (let i1 = 0; i1 < lines.length; i1++) {
    for (var i2 = i1 + 1; i2 < lines.length; i2++) {
      const line1 = lines[i1].split('')
      const line2 = lines[i2].split('')
      const [diffIdx, ...others] = line1.reduce((diffs, char, charIdx) => char === line2[charIdx] ? diffs : diffs.concat([charIdx]), [])
      if (diffIdx && others.length === 0) {
        return lines[i1].substring(0, diffIdx) + lines[i1].substring(diffIdx + 1)
      }
    }
  }
}

function run() {
  const input = fs.readFileSync('./input2.txt', 'utf8')
  return parse(input)
}

console.log(parse(testInput))

console.log(run())
