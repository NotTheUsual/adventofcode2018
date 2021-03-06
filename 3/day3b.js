const fs = require('fs')

const testInput = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`

function Grid() {
  this._ids = {}
  this._grid = Array.from({ length: 1000 }, (v, i) => Array.from({ length: 1000 }, (v, i) => []))
}

Grid.prototype.mark = function({ id, x, y, width, height }) {
  this._ids[id] = 'unmatched'
  for (let iY = y; iY < (y + height); iY++) {
    for (let iX = x; iX < (x + width); iX++) {
      this._grid[iY][iX].push(id)
    }
  }
};

Grid.prototype.count = function() {
  return this._grid.reduce((totalSum, row) => {
    return totalSum + row.reduce((rowSum, cell) => (cell.length > 1) ? rowSum + 1 : rowSum, 0)
  }, 0)
};

Grid.prototype.findUnmatching = function() {
  this._grid.forEach(row => {
    row.forEach(cell => {
      if (cell.length > 1) {
        cell.forEach(id => this._ids[id] = 'matched')
      }
    })
  })
  return Object.keys(this._ids).find(id => this._ids[id] === 'unmatched')
};

function parse(input) {
  const lines = input.split('\n').filter(i => i).map(line => {
    const [id, __, coords, area] = line.split(' ')
    const [ x, y ] = coords.split(',')
    const [ width, height ] = area.split('x')
    return {
      id,
      x: parseInt(x),
      y: parseInt(y.replace(/\D/, '')),
      width: parseInt(width),
      height: parseInt(height)
    }
  })
  return lines
}

function process(input) {
  const lines = parse(input)
  const grid = new Grid()
  lines.forEach(line => grid.mark(line))
  return grid.findUnmatching()
}

function test(input, expected) {
  const result = process(input)
  const symbol = (result === expected) ? '✅' : '❌'
  console.log(symbol, result, expected)
}

function run() {
  const input = fs.readFileSync('./input3.txt', 'utf8')
  return process(input)
}

test(testInput, '#3')
console.log(run())
