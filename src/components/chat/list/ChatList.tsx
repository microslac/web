import { NextComponentType } from 'next'
import { useCallback, useMemo } from 'react'
import { noop } from 'remeda'
import classnames from 'classnames'

import { ListOnScrollProps } from 'react-window'

import { Chat } from '@/types/chat'
import { VirtualMessage } from '@/types/virtual'
import ChatItem from '@/components/chat/item/ChatItem'
import VirtualList from '@/components/virtual/VirtualList'

type Props = {
  className?: string
  onLoadMore?: () => void
  chats: Chat[]
}

type VirtualListRef = {
  scrollToBottom: () => void
}

const ChatList: NextComponentType<{}, {}, Props> = ({ className, onLoadMore = noop, chats }) => {
  const virtualItems = useMemo<VirtualMessage<Chat>[]>(() => {
    return chats.map((msg) => ({ type: 'msg', data: msg }))
  }, [chats])

  const handleScroll = useCallback(
    (props: ListOnScrollProps) => {
      const { scrollDirection: direction, scrollOffset: offset } = props
      if (direction === 'backward' && offset === 0) onLoadMore()
    },
    [onLoadMore],
  )

  const itemKey = useCallback((index: number, data: VirtualMessage<Chat>[]) => {
    return [data[index].data.ts, data[index].data.client_msg_id].join('-')
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
          return <ChatItem chat={item.data} />
        }}
      </VirtualList>
    </div>
  )
}

export default ChatList
