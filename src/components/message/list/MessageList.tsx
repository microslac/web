import { NextComponentType } from 'next'
import { useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { noop } from 'remeda'

import { ListOnScrollProps } from 'react-window'

import { Message } from '@/types/message'
import MessageItem from '@/components/message/item/MessageItem'
import MessageDivider from '@/components/message/item/MessageDivider'
import VirtualList from '@/components/virtual/VirtualList'
import { VirtualMessage, Divider } from '@/types/virtual'

type Props = {
  className?: string
  messages: Message[]
  onLoadMore?: () => void
}

const MessageList: NextComponentType<{}, {}, Props> = ({
  className,
  messages,
  onLoadMore = noop,
}) => {
  const virtualItems = useMemo<VirtualMessage<Message | Divider>[]>(() => {
    const items: VirtualMessage<Message | Divider>[] = []
    let prevDivider: Divider | undefined = undefined

    for (const message of messages) {
      const currDivider = new Divider(message.ts)
      if (currDivider.isDiff(prevDivider)) {
        prevDivider && items.push({ type: 'divider', data: prevDivider })
        prevDivider = currDivider
      }
      items.push({ type: 'message', data: message })
    }
    prevDivider && items.push({ type: 'divider', data: prevDivider })
    return items
  }, [messages])

  const handleScroll = useCallback(
    (props: ListOnScrollProps) => {
      const { scrollDirection: direction, scrollOffset: offset } = props
      if (direction === 'backward' && offset === 0) onLoadMore()
    },
    [onLoadMore],
  )

  const itemKey = useCallback((index: number, data: VirtualMessage<Message | Divider>[]) => {
    return [data[index].type, data[index].data.ts].join('-')
  }, [])

  return (
    <div className={classnames(className, 'overflow-y-hidden pb-2')}>
      <VirtualList
        className="pt-4"
        itemCount={virtualItems.length}
        onScroll={handleScroll}
        itemData={virtualItems}
        itemKey={itemKey}
        trackId={virtualItems[0]?.data.ts.toString()}
      >
        {({ index }) => {
          const item = virtualItems[virtualItems.length - 1 - index]
          if (item.type == 'divider') return <MessageDivider divider={item.data as Divider} />
          else if (item.type === 'message') return <MessageItem message={item.data as Message} />
        }}
      </VirtualList>
    </div>
  )
}

export default MessageList
