import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import classnames from 'classnames'
import Image from 'next/image'
import dayjs from 'dayjs'

import { useAvatar, AvatarSize } from '@/hooks/media/use-avatar'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { selectUser } from '@/redux/user'
import { User } from '@/types/user'

import ProfileModal from '@/components/user/profile/ProfileModal'
import { fetchMessages, openConversation } from '@/redux/conversation/actions'
import { useAppParams } from '@/hooks/app/use-app-params'
import { setChannelId } from '@/redux/channel'

type Props = {
  className?: string
  user: User
}

const ProfileMain: NextComponentType<{}, {}, Props> = ({ className, user }) => {
  const self = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const params = useAppParams()

  const { getUserAvatar } = useAvatar()
  const avatarSize: number = AvatarSize.XXL
  const avatarSrc = getUserAvatar(user, avatarSize)
  const localTime = dayjs().format('h:mm A')

  const handleMessage = () => {
    dispatch(openConversation({ users: [user.id] }))
      .unwrap()
      .then((data) => {
        const { channel } = data
        const { team, group, secondary } = params
        let href = `/client/${team}/${channel.id}`
        if (group && secondary) href = `${href}/${group}/${secondary}`
        dispatch(setChannelId(channel.id))
        dispatch(fetchMessages())
        router.push(href)
      })
  }

  return (
    <div className={classnames(className)}>
      <div className={classnames('flex-center px-6 pt-6')}>
        <Image
          alt={user.profile.display_name || user.profile.real_name}
          src={avatarSrc}
          width={avatarSize}
          height={avatarSize}
          className="h-[256px] w-[256px] rounded-md"
        />
      </div>
      <div className="p-4">
        <div>
          <div className="flex w-full justify-between">
            <div className="text-1.5xl/[30px] font-bold">
              {user.profile.display_name || user.profile.real_name}
            </div>
            {self.id === user.id && (
              <ProfileModal user={user}>
                {(onOpen) => (
                  <span
                    className="cursor-pointer font-medium text-link hover:underline"
                    onClick={() => onOpen()}
                  >
                    Edit
                  </span>
                )}
              </ProfileModal>
            )}
          </div>
          {user.profile.title && (
            <div className="cursor-pointer text-lg hover:underline">{user.profile.title}</div>
          )}
        </div>
        <div className="mt-2">
          <div className="flex items-center text-black/80">
            <div
              className={classnames(
                'mr-2 mt-0.5 h-2.5 w-2.5 rounded-full',
                { 'bg-green-500': user.presence === 'active' },
                { 'bg-gray-500': !user.presence || user.presence === 'away' },
              )}
            />
            {user.presence === 'active' && <span>Active</span>}
            {(!user.presence || user.presence === 'away') && <span>Away</span>}
          </div>
          <div className="text-black/80">{localTime} local time</div>
        </div>
        <div className="mt-2 flex items-center">
          {user.id === self.id && (
            <>
              <button
                type="button"
                className="flex min-h-[36px] grow items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
              >
                <span>Set a status</span>
              </button>
              <button
                type="button"
                className="ml-2 flex min-h-[36px] grow items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
              >
                <span>View as</span>
              </button>
            </>
          )}
          {user.id !== self.id && (
            <>
              <button
                type="button"
                className="flex min-h-[36px] grow items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
                onClick={() => handleMessage()}
              >
                <span>Message</span>
              </button>
              <button
                type="button"
                className="ml-2 flex min-h-[36px] grow items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
              >
                <span>Huddle</span>
              </button>
            </>
          )}
          <button
            type="button"
            className="ml-2 flex min-h-[36px] shrink-0 items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
          >
            <span>#</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileMain
