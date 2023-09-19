import { useState } from 'react'
import { createField } from '../utils/field'

const SIZE = 20
const MINE_NUM = 40

declare global {
  interface Array<T> {
    uniquePush(element: T): void
  }
}
// eslint-disable-next-line no-extend-native
Array.prototype.uniquePush = function <T>(element: T): void {
  // Check if the element is not already in the array
  if (!this.some((item) => isEqual(item, element))) {
    this.push(element)
  }
}

// Helper function to check deep equality for non-primitive elements
function isEqual(a: any, b: any): boolean {
  // Use a deep equality check (you can use a library like Lodash for a more robust comparison)
  return JSON.stringify(a) === JSON.stringify(b)
}

export function useField() {
  const [field, setField] = useState(createField(SIZE, MINE_NUM))

  function reveal(x: number, y: number) {
    const val = field[x][y]

    // if it is already revealed
    if (val < 10 || val >= 100) {
      return
    }

    const blanks: number[][] = []

    if (val === 10) {
      blanks.push([x, y])
    }

    let current = 0

    cascade()

    // each value of the `field` listed in the `blanks` array and their neighbors decreased by 10 (if they are bigger than 10)
    setField((f) =>
      f.map((row, i) =>
        row.map((val, j) =>
          (blanks.find(
            (e) => Math.abs(e[0] - i) <= 1 && Math.abs(e[1] - j) <= 1
          ) !== undefined ||
            (x === i && y === j)) &&
          val >= 10
            ? val - 10
            : val
        )
      )
    )

    function cascade() {
      if (blanks.length <= current) {
        return
      }

      const [x, y] = blanks[current]

      iterateNeighbors(x, y, (i, j) => {
        if (field[i][j] === 10) {
          blanks.uniquePush([i, j])
        }
      })

      current++
      cascade()
    }
    function iterateNeighbors(
      x: number,
      y: number,
      fun: (i: number, j: number) => void
    ) {
      for (
        let i = Math.max(0, x - 1);
        i <= Math.min(field.length - 1, x + 1);
        i++
      ) {
        for (
          let j = Math.max(0, y - 1);
          j <= Math.min(field.length - 1, y + 1);
          j++
        ) {
          fun(i, j)
        }
      }
    }
  }

  function mark(x: number, y: number) {
    console.log('right click')
    const val = field[x][y]
    const newVal = val < 100 ? val + 100 : val - 100
    setField((f) =>
      f.map((row, i) =>
        row.map((val, j) => (x === i && y === j ? newVal : val))
      )
    )
  }

  return { field, reveal, mark }
}
