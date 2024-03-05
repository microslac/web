import { NextComponentType } from 'next'
import classnames from 'classnames'
import UserAvatar from '@/components/avatar/UserAvatar'
import { useAppSelector } from '@/redux/store'
import { selectUser } from '@/redux/user'
import { SecondaryView } from '@/constants/ui'
import { selectTeamId } from '@/redux/team'
import { selectChannelId } from '@/redux/channel'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
}

const AppNav: NextComponentType<{}, {}, Props> = ({ className }) => {
  const router = useRouter()
  const self = useAppSelector(selectUser)
  const teamId = useAppSelector(selectTeamId)
  const channelId = useAppSelector(selectChannelId)

  const handleClickAvatar = () => {
    const profileUrl = `/client/${teamId}/${channelId}/${SecondaryView.Profile}/${self.id}`
    router.push(profileUrl)
  }

  return (
    <div
      className={classnames(
        className,
        'relative z-[10] flex h-[44px] items-center justify-between px-4 text-black shadow-light',
      )}
    >
      <span className="text-lg font-semibold">Slac</span>
      <div className="cursor-pointer" onClick={() => handleClickAvatar()}>
        <UserAvatar user={self} size={26} presence={true} />
      </div>
    </div>
  )
}

export default AppNav
