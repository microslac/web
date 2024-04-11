import { NextComponentType } from 'next'
import { AvatarSize, useAvatar } from '@/hooks/media/use-avatar'
import { User } from '@/types/user'

import Avatar from '@/components/avatar/Avatar'
import { Bot } from '@/types/chat'

type Props = {
  bot: Bot
  size?: number
  avatarSize?: AvatarSize
  presence?: boolean
}

const BotAvatar: NextComponentType<{}, {}, Props> = ({
  bot,
  size = 24,
  avatarSize = AvatarSize.MD,
}) => {
  const { getBotAvatar } = useAvatar()
  const avatarSrc = getBotAvatar(bot, avatarSize)

  return <Avatar rounded size={size} src={avatarSrc} alt={bot?.name} />
}

export default BotAvatar
