import { NextComponentType } from 'next'
import classnames from 'classnames'

import { Channel } from '@/types/channel'
import ViewHeader from './ViewHeader'
import ViewToolbar from './ViewToolbar'
import ViewContent from './ViewContent'
import { useAppSelector } from '@/redux/store'
import { selectUserMapping } from '@/redux/user'

type Props = {
  className?: string
  channel: Channel
}

const ViewPrimary: NextComponentType<{}, {}, Props> = ({ className, channel }) => {
  const userMapping = useAppSelector(selectUserMapping)

  let channelName = channel.name
  if (channel.is_im) {
    const user = userMapping[channel.user]
    channelName = user.profile.display_name || user.profile.real_name
  } else if (channel.is_mpim) {
    const users = channel.users.map((uid) => userMapping[uid])
    channelName = users
      .map((user) => user.profile.display_name || user.profile.real_name)
      .join(', ')
  }

  return (
    <div className={classnames(className, 'flex h-full flex-col')}>
      <ViewHeader className="shrink-0">
        <div className="flex items-center">{channelName}</div>
      </ViewHeader>
      <ViewToolbar className="shrink-0" />
      <ViewContent className="flex-1" />
    </div>
  )
}

export default ViewPrimary
