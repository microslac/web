import { NextComponentType } from 'next'
import { Bot } from '@/types/chat'
import ViewHeader from '@/components/app/view/ViewHeader'
import BotProfile from '@/components/bot/profile/BotProfile'

type Props = {
  close: () => void
  bot: Bot
}

const ViewSecondaryBot: NextComponentType<{}, {}, Props> = ({ close, bot }) => {
  const actions = (
    <>
      <button
        type="button"
        className="flex h-6 items-center justify-center rounded bg-black/10 p-1 hover:bg-black/20"
        onClick={close}
      >
        close
      </button>
    </>
  )

  return (
    <>
      <ViewHeader className="shrink-0" actions={actions}>
        <div className="flex w-full items-center justify-between">
          <span>bot</span>
        </div>
      </ViewHeader>
      <BotProfile bot={bot} />
    </>
  )
}

export default ViewSecondaryBot
