import './Field.css'
import React from 'react'
import classNames from 'classnames'
import { GiStarProminences } from 'react-icons/gi'
import { CgFlag } from 'react-icons/cg'
import { useField } from '../../hooks/useField'
import { usePressRegister } from '../../hooks/usePressRegister'

function Field() {
  const { perception, intelligence, reveal, revealNeighbors, mark } = useField()
  const {
    isPressed,
    pressLeftMouse,
    releaseLeftMouse,
    pressMiddleMouse,
    releaseMiddleMouse,
    mouseEnter,
  } = usePressRegister()
  return (
    <div
      className={classNames('field')}
      onMouseLeave={() => {
        releaseLeftMouse()
        releaseMiddleMouse()
      }}
    >
      {perception.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((val, j) => (
            <button
              className={classNames('cell', `cell-color-${val}`, {
                'cell--hidden': intelligence[i][j] === 'hidden',
                'cell--marked': intelligence[i][j] === 'marked',
                'cell--pressed': isPressed(i, j),
              })}
              key={j}
              onMouseEnter={() => {
                mouseEnter(i, j)
              }}
              onMouseDown={(e) => {
                if (e.button === 0) {
                  pressLeftMouse(i, j)
                }
                if (e.button === 1) {
                  pressMiddleMouse(i, j)
                }
              }}
              onMouseUp={(e) => {
                if (e.button === 0) {
                  releaseLeftMouse()
                  reveal(i, j)
                }
                if (e.button === 1) {
                  revealNeighbors(i, j)
                  releaseMiddleMouse()
                }
                if (e.button === 2) {
                  mark(i, j)
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault()
              }}
            >
              {intelligence[i][j] === 'hidden' ? (
                ''
              ) : intelligence[i][j] === 'marked' ? (
                <CgFlag />
              ) : val === 9 ? (
                <GiStarProminences />
              ) : val === 0 ? (
                ''
              ) : (
                val.toString()
              )}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
export default Field
