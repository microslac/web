import {
  CSSProperties,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { NextComponentType } from 'next'
import { ListItemKeySelector, ListOnScrollProps, VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import classnames from 'classnames'
import { noop } from 'remeda'

import VirtualItem from '@/components/virtual/VirtualItem'

const PADDING = 20
const addPadding = (prop: string, value = PADDING) => `${parseFloat(prop) + value}px`

// eslint-disable-next-line react/display-name
const innerElementType = forwardRef(
  ({ style, ...rest }: { style: CSSProperties }, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      {...rest}
      style={{ ...style, height: addPadding(style.height as string, PADDING * 2) }}
    />
  ),
)

type Props<T = any> = {
  className?: string
  itemCount: number
  children: ({ index }: { index: number }) => ReactNode
  onScroll?: (props: ListOnScrollProps) => void
  trackId?: string
  itemKey?: ListItemKeySelector<T>
  itemData?: T
}

const VirtualList: NextComponentType<{}, {}, Props> = ({
  className,
  children,
  itemCount,
  onScroll = noop,
  itemKey,
  itemData,
  trackId,
}) => {
  const heights = useRef<Record<number, number>>({})
  const listRef = useRef<VariableSizeList | null>(null)
  const callbackRef = useCallback((list: VariableSizeList) => {
    if (list) {
      listRef.current = list
      listRef.current?.scrollTo(1e6)
    }
  }, [])

  const getRowHeight = useCallback((index: number) => {
    return heights.current[index] || 52
  }, [])

  const setRowHeight = useCallback((index: number, height: number) => {
    listRef.current?.resetAfterIndex?.(0)
    heights.current = { ...heights.current, [index]: height }
  }, [])

  useEffect(() => {
    listRef.current?.scrollToItem(itemCount - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackId])

  // TODO: set this value to 2
  const STATIC_OVER_SCAN_COUNT = 14

  return (
    <AutoSizer className={classnames(className)}>
      {({ height, width }) => (
        <VariableSizeList
          ref={callbackRef}
          width={width}
          height={height - PADDING}
          itemCount={itemCount}
          itemSize={getRowHeight}
          estimatedItemSize={100}
          onScroll={onScroll}
          itemKey={itemKey}
          itemData={itemData}
          overscanCount={STATIC_OVER_SCAN_COUNT}
          className="virtual-list"
        >
          {({ style, index }) => (
            <VirtualItem index={index} style={style} setRowHeight={setRowHeight}>
              {children({ index })}
            </VirtualItem>
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  )
}

export default VirtualList
