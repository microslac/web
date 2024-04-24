import { NextComponentType } from 'next'

import { Bot } from '@/types/chat'

import BotAvatar from '@/components/avatar/BotAvatar'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import Link from 'next/link'

type Props = {
  bot: Bot
}

const ChatInfo: NextComponentType<{}, {}, Props> = ({ bot }) => {
  const mapping: Record<string, string> = {
    mistral: 'https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2',
    llama: 'https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct',
    phi: 'https://huggingface.co/microsoft/phi-2',
  }

  const modelLink = mapping[bot.type] || 'https://huggingface.co/models'

  return (
    <div className="w-full p-2">
      <div className="flex items-center">
        <BotAvatar bot={bot} size={48} />
        <div className="mr-auto">
          <div className="font-medium">Model</div>
          <div className="text-black/60">{bot.model}</div>
        </div>
        <div>
          <Link href={modelLink}>
            <IoMdInformationCircleOutline />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChatInfo
