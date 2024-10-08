import { Bot } from '@/types/chat'
import { User } from '@/types/user'
import { MediaFolder, AvatarSize } from '@/constants/media'

export { AvatarSize }

export const useAvatar = () => {
  const getBotAvatar = (bot: Bot, size: AvatarSize = AvatarSize.XS): string => {
    const name = bot.name.toLowerCase()
    const statics = ['meta', 'flink', 'sophia']
    if (statics.includes(name)) return `/avatar/${name}.jpg`
    if (!bot.avatar_hash) return '/avatar/default.png'
    return ''
  }

  const getUserAvatar = (user: User, size: AvatarSize = AvatarSize.XS): string => {
    if (!user?.profile?.avatar_hash) return '/avatar/default.png'

    const folder = `https://${process.env.STORAGE_HOST}/${MediaFolder.Avatar}`
    const filename = [user.team, user.id, user.profile.avatar_hash].join('-')
    return `${folder}/${filename}_${size}`
  }

  return {
    getBotAvatar,
    getUserAvatar,
  }
}
