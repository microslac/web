import { User } from '@/types/user'
import { useAppSelector } from '@/redux/store'
import { selectUserMapping } from '@/redux/user'
import { MediaFolder, AvatarSize } from '@/constants/media'

export { AvatarSize }

export const useAvatar = () => {
  const userMapping = useAppSelector(selectUserMapping)

  const getUserAvatar = (user: User, size: AvatarSize = AvatarSize.XS): string => {
    if (!user?.profile?.avatar_hash) return '/avatar/default.png'

    const folder = `https://${process.env.STORAGE_HOST}/${MediaFolder.Avatar}`
    const filename = [user.team, user.id, user.profile.avatar_hash].join('-')
    return `${folder}/${filename}_${size}`
  }

  const lookupUserAvatar = (userId: string, size: AvatarSize = AvatarSize.XS): string => {
    return getUserAvatar(userMapping[userId], size)
  }

  return {
    getUserAvatar,
    lookupUserAvatar,
  }
}
