import { useState } from 'react'
import { createField } from '../utils/field'
import { uniquePush } from '../utils/misc'

const SIZE = 20
const MINE_NUM = 60

const perception = createField(SIZE, MINE_NUM)

export function useField() {
  const [intelligence, setIntelligence] = useState<IntelligenceT[][]>(
    Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill('hidden'))
  )
  // Helper
  function setInt(
    fun: (i: number, j: number, val: IntelligenceT) => IntelligenceT
  ) {
    setIntelligence((int) =>
      int.map((row, i) => row.map((val, j) => fun(i, j, val)))
    )
  }

  // Helper
  function setIntItem(x: number, y: number, newVal: IntelligenceT) {
    setIntelligence((int) =>
      int.map((row, i) =>
        row.map((originalVal, j) => (x === i && y === j ? newVal : originalVal))
      )
    )
  }

  // Helper
  function iterateNeighbors(
    x: number,
    y: number,
    fun: (i: number, j: number) => void
  ) {
    for (
      let i = Math.max(0, x - 1);
      i <= Math.min(perception.length - 1, x + 1);
      i++
    ) {
      for (
        let j = Math.max(0, y - 1);
        j <= Math.min(perception.length - 1, y + 1);
        j++
      ) {
        fun(i, j)
      }
    }
  }

  function reveal(x: number, y: number) {
    const val = perception[x][y]

    // if it is already revealed, do nothing
    if (intelligence[x][y] === 'revealed') {
      return
    }

    // 'clearCluster' represents a collection of adjacent cells
    // that are free of mines and have no neighboring cells with mines.
    const clearCluster: number[][] = []

    if (val === 0) {
      clearCluster.push([x, y])
    }

    let currentTotal = 0

    cascade()

    setInt((i, j, val) =>
      clearCluster.find(
        (e) => Math.abs(e[0] - i) <= 1 && Math.abs(e[1] - j) <= 1
      ) !== undefined ||
      (x === i && y === j)
        ? 'revealed'
        : val
    )
    // recursive expansion of 'clearCluster'
    function cascade() {
      if (clearCluster.length <= currentTotal) {
        return
      }

      const [x, y] = clearCluster[currentTotal]

      iterateNeighbors(x, y, (i, j) => {
        if (perception[i][j] === 0) {
          uniquePush(clearCluster, [i, j])
        }
      })

      currentTotal++
      cascade()
    }
  }

  function revealNeighbors(x: number, y: number) {
    if (intelligence[x][y] !== 'revealed') {
      return
    }
    let markedCount = 0

    iterateNeighbors(x, y, (i, j) => {
      if (intelligence[i][j] === 'marked') {
        markedCount++
      }
    })

    if (markedCount !== perception[x][y]) {
      return
    }

    iterateNeighbors(x, y, (i, j) => {
      if (intelligence[i][j] === 'hidden') {
        reveal(i, j)
      }
    })
  }

  function mark(x: number, y: number) {
    const int = intelligence[x][y]
    const valids = ['hidden', 'marked']
    if (valids.includes(int)) {
      const newInt = int === 'hidden' ? 'marked' : 'hidden'
      setIntItem(x, y, newInt)
    }
  }

  return {
    perception,
    intelligence,
    reveal,
    revealNeighbors,
    mark,
  }
}
