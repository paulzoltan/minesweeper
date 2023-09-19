import './Field.css'
import React from 'react'
import classNames from 'classnames'
import { GiStarProminences } from 'react-icons/gi'
import { LuFlagTriangleRight } from 'react-icons/lu'
import { useField } from '../../hooks/useField'

function Field() {
  const { field, reveal, mark } = useField()
  return (
    <div className='field'>
      {field.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((val, j) => (
            <div
              className={classNames('cell', `cell-color-${val}`, {
                'cell--hidden': val >= 10,
                'cell--marked': val >= 100,
              })}
              key={j}
              onClick={(e) => {
                reveal(i, j)
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                mark(i, j)
              }}
            >
              {val === 9 ? (
                <GiStarProminences />
              ) : val >= 100 ? (
                <LuFlagTriangleRight />
              ) : (
                val.toString()
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
export default Field
