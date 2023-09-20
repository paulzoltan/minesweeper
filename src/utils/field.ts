export function createField(size: number, mineNum: number) {
  // Create `size` * `size` matrix fille with zeros
  function createMatrix() {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(0))
  }

  function addRandomMine() {
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)
    if (field[x][y] !== 9) {
      field[x][y] = 9
    } else {
      addRandomMine()
    }
  }

  function fillField() {
    for (let index = 0; index < mineNum; index++) {
      addRandomMine()
    }
  }

  function minesAround(x: number, y: number) {
    if (field[x][y] === 9) {
      return 9
    }

    let count = 0
    for (let i = Math.max(0, x - 1); i <= Math.min(size - 1, x + 1); i++) {
      for (let j = Math.max(0, y - 1); j <= Math.min(size - 1, y + 1); j++) {
        if (field[i][j] === 9) {
          count++
        }
      }
    }
    return count
  }

  function markFields() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        field[i][j] = minesAround(i, j)
      }
    }
  }

  const field = createMatrix()
  fillField()
  markFields()
  return field
}
