import { NextComponentType } from 'next'
import { Bot } from '@/types/chat'

import BotMain from './BotMain'

type Props = {
  bot: Bot
}

const BotProfile: NextComponentType<{}, {}, Props> = ({ bot }) => {
  return (
    <div>
      <BotMain bot={bot} />
      <div className="border-t p-4">
        <div className="mb-4 font-bold">Instruction</div>
        <span className="text-black/50">{bot.instruction}</span>
      </div>
    </div>
  )
}

export default BotProfile
