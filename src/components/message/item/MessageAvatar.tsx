import { NextComponentType } from 'next'
import { noop } from 'remeda'
import classnames from 'classnames'

import { useAppSelector } from '@/redux/store'
import { lookupUser } from '@/redux/user'
import { Message } from '@/types/message'

import UserAvatar from '@/components/avatar/UserAvatar'

type Props = {
  className?: string
  message: Message
  onClick?: () => void
}

const MessageAvatar: NextComponentType<{}, {}, Props> = ({
  className,
  message,
  onClick = noop,
}) => {
  const user = useAppSelector(lookupUser(message.user))

  return (
    <div className={classnames('cursor-pointer', className)} onClick={() => onClick()}>
      <UserAvatar user={user} size={36} />
    </div>
  )
}

export default MessageAvatar
