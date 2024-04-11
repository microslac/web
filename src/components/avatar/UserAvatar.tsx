import { NextComponentType } from 'next'
import { AvatarSize, useAvatar } from '@/hooks/media/use-avatar'
import { User } from '@/types/user'

import Avatar from '@/components/avatar/Avatar'

type Props = {
  user: User
  size: number
  avatarSize?: AvatarSize
  presence?: boolean
}

const UserAvatar: NextComponentType<{}, {}, Props> = ({
  user,
  size,
  presence = false,
  avatarSize = AvatarSize.MD,
}) => {
  const { getUserAvatar } = useAvatar()
  const avatarSrc = getUserAvatar(user, avatarSize)

  return (
    <Avatar
      rounded
      size={size}
      src={avatarSrc}
      alt={user?.name}
      presence={presence ? user?.presence : undefined}
    />
  )
}

export default UserAvatar
