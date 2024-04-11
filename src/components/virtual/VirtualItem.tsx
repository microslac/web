import { CSSProperties, ReactNode, useCallback } from 'react'
import { NextComponentType } from 'next'

type Props = {
  index: number
  style: CSSProperties
  setRowHeight: (index: number, height: number) => void
  children: ReactNode
}

const VirtualItem: NextComponentType<{}, {}, Props> = ({
  index,
  style,
  children,
  setRowHeight,
}) => {
  const callbackRef = useCallback(
    (element: HTMLDivElement) => {
      requestAnimationFrame(
        () =>
          element?.firstChild &&
          setRowHeight(index, (element.firstChild as HTMLElement).offsetHeight),
      )
    },
    [index, setRowHeight],
  )

  return (
    <div ref={callbackRef} style={style}>
      {children}
    </div>
  )
}

export default VirtualItem
