import { NextComponentType } from 'next'
import classnames from 'classnames'
import dayjs from 'dayjs'

import { Message } from '@/types/message'
import { useAppSelector } from '@/redux/store'
import { lookupUser } from '@/redux/user'

type Props = {
  className?: string
  message: Message
}

const MessageMeta: NextComponentType<{}, {}, Props> = ({ className, message }) => {
  const user = useAppSelector(lookupUser(message.user))
  const time = dayjs.unix(message.ts).format('HH:mm A')

  return (
    <div className={classnames(className)}>
      <span className="cursor-pointer font-bold text-black/90 hover:underline">
        {user?.profile?.display_name || user?.profile?.real_name}
      </span>
      &nbsp;&nbsp;
      {message.ts && (
        <span className="cursor-pointer text-xs text-black/60 hover:underline">{time}</span>
      )}
    </div>
  )
}

export default MessageMeta
