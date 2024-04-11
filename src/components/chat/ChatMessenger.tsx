import { useCallback, useEffect, useMemo, useRef } from 'react'
import { NextComponentType } from 'next'
import throttle from 'lodash/throttle'
import random from 'lodash/random'
import classnames from 'classnames'
import { RemoteRunnable } from '@langchain/core/runnables/remote'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import { addChat, streamChat } from '@/redux/chat'
import { selectChats } from '@/redux/chat'

import { Bot, ChatType } from '@/types/chat'
import { useChatData } from '@/hooks/chat/use-chat-data'
import { timer } from '@/utils'

import ChatList from '@/components/chat/list/ChatList'
import ChatComposer from '@/components/chat/composer/ChatComposer'

type Props = {
  className?: string
  bot: Bot
}

const ChatMessenger: NextComponentType<{}, {}, Props> = ({ className, bot }) => {
  const messengerRef = useRef<HTMLDivElement>(null)
  const virtualListRef = useRef<HTMLDivElement | null>(null)

  const remoteChain = useMemo(() => new RemoteRunnable({ url: `${process.env.CHAT_URL}/chat` }), [])

  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const { prepareMsg } = useChatData()

  const scrollToBottom = throttle(
    () => {
      if (!virtualListRef.current)
        virtualListRef.current =
          messengerRef.current?.querySelector<HTMLDivElement>('.virtual-list')!
      if (!virtualListRef.current) return

      requestAnimationFrame(
        () => virtualListRef.current?.scrollTo({ top: 1e8, behavior: 'smooth' }),
      )
    },
    2000,
    { trailing: false },
  )

  const handleSend = useCallback(
    async (content: string) => {
      const msg = prepareMsg({ text: content, bot: bot.id, type: ChatType.HUMAN })
      dispatch(addChat(msg))

      const streaming = prepareMsg({ text: '', bot: bot.id, type: ChatType.AI })
      dispatch(addChat(streaming))

      await timer(1000 + random(-400, 100))

      const stream = await remoteChain.stream(
        { input: msg.text },
        { configurable: { bot: msg.bot, user: msg.user } },
      )

      for await (const chunk of stream) {
        dispatch(streamChat({ bot: msg.bot, text: chunk as string }))
        scrollToBottom()
      }
    },
    [bot, dispatch, prepareMsg, remoteChain, scrollToBottom],
  )

  const handleChange = () => {}

  useEffect(() => {
    timer(400).then(() =>
      requestAnimationFrame(() => {
        const virtualList = messengerRef.current?.querySelector<HTMLDivElement>('.virtual-list')
        if (virtualList) {
          virtualList.scrollTo({ top: virtualList.scrollHeight, behavior: 'smooth' })
          timer(400).then(() =>
            virtualList.scrollTo({ top: virtualList.scrollHeight, behavior: 'smooth' }),
          )
        }
      }),
    )
  }, [])

  return (
    <div ref={messengerRef} className={classnames(className, 'flex h-full flex-col')}>
      <ChatList chats={chats} className="flex-1" />
      <ChatComposer
        className="mx-5 mb-1 shrink-0"
        placeholder="Message..."
        onChange={handleChange}
        onSend={handleSend}
      />
      <div className="min-h-[156px]"></div>
    </div>
  )
}

export default ChatMessenger
