import { useState } from 'react'
import { isEqual } from '../utils/misc'

export function usePressRegister() {
  const [pressedLeftMouse, setPressedLeftMouse] = useState<
    [number, number] | null
  >(null)
  const [pressedMiddleMouse, setPressedRightMouse] = useState<
    [number, number] | null
  >(null)
  function pressLeftMouse(i: number, j: number) {
    setPressedLeftMouse([i, j])
  }
  function releaseLeftMouse() {
    setPressedLeftMouse(null)
  }

  function pressMiddleMouse(i: number, j: number) {
    setPressedRightMouse([i, j])
  }
  function releaseMiddleMouse() {
    setPressedRightMouse(null)
  }
  function mouseEnter(i: number, j: number) {
    if (pressedLeftMouse !== null) {
      pressLeftMouse(i, j)
    }
    if (pressedMiddleMouse !== null) {
      pressMiddleMouse(i, j)
    }
  }
  function isPressed(i: number, j: number) {
    return (
      isEqual(pressedLeftMouse, [i, j]) ||
      (pressedMiddleMouse != null &&
        Math.abs(pressedMiddleMouse[0] - i) <= 1 &&
        Math.abs(pressedMiddleMouse[1] - j) <= 1)
    )
  }

  return {
    isPressed,
    pressLeftMouse,
    releaseLeftMouse,
    pressMiddleMouse,
    releaseMiddleMouse,
    mouseEnter,
  }
}
