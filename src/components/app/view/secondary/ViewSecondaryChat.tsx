import { NextComponentType } from 'next'
import { useEffect } from 'react'

import { useAppDispatch } from '@/redux/store'

import ViewHeader from '@/components/app/view/ViewHeader'
import ChatMessenger from '@/components/chat/ChatMessenger'
import { Bot } from '@/types/chat'
import { setChatId } from '@/redux/chat'
import { clearChat, fetchChats } from '@/redux/chat/actions'

type Props = {
  close: () => void
  bot: Bot
}

const ViewSecondaryChat: NextComponentType<{}, {}, Props> = ({ close, bot }) => {
  const dispatch = useAppDispatch()

  const clear = () => {
    dispatch(clearChat({ bot: bot.id }))
  }

  const actions = (
    <>
      <button
        type="button"
        className="flex h-6 items-center justify-center rounded bg-black/10 p-1 hover:bg-black/20 mr-2"
        onClick={clear}
      >
        clear
      </button>
      <button
        type="button"
        className="flex h-6 items-center justify-center rounded bg-black/10 p-1 hover:bg-black/20"
        onClick={close}
      >
        close
      </button>
    </>
  )

  useEffect(() => {
    dispatch(setChatId(bot.id))
    dispatch(fetchChats())

    return () => {
      dispatch(setChatId(''))
    }
  }, [bot, dispatch])

  return (
    <>
      <ViewHeader className="shrink-0" actions={actions}>
        <div className="flex w-full items-center justify-between">
          <span>chat</span>
        </div>
      </ViewHeader>
      <div className="flex h-full flex-col">
        <ChatMessenger bot={bot} />
      </div>
    </>
  )
}

export default ViewSecondaryChat
