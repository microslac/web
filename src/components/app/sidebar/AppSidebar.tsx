import { NextComponentType } from 'next'
import { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'
import { noop } from 'remeda'

import { ISidebar } from '@/types/app'
import { Channel } from '@/types/channel'
import { STATIC_SIDEBAR } from '@/constants/app'
import { useAppSelector } from '@/redux/store'
import { selectUserMapping } from '@/redux/user'

import SidebarTop from './SidebarTop'
import SidebarItem from './SidebarItem'
import Avatar from '@/components/avatar/Avatar'
import BotAvatar from '@/components/avatar/BotAvatar'
import { useAvatar } from '@/hooks/media/use-avatar'
import { selectBots } from '@/redux/chat'
import { Bot } from '@/types/chat'

type Props = {
  className?: string
  botId: string
  channelId: string
  channels: Channel[]
  onSelectBot?: (bot: Bot) => void
  onSelectChannel?: (channel: Channel) => void
}

const AppSidebar: NextComponentType<{}, {}, Props> = ({
  className,
  botId,
  channelId,
  channels,
  onSelectBot = noop,
  onSelectChannel = noop,
}) => {
  const bots = useAppSelector(selectBots)
  const users = useAppSelector(selectUserMapping)
  const [selectedId, setSelectedId] = useState<string>(() => channelId)

  const chChannels = useMemo<Channel[]>(
    () => channels.filter((channel) => channel.is_channel),
    [channels],
  )

  const imChannels = useMemo<Channel[]>(
    () => channels.filter((channel) => channel.is_im),
    [channels],
  )

  const mpimChannels = useMemo<Channel[]>(
    () => channels.filter((channel) => channel.is_mpim),
    [channels],
  )

  const handleClickStatic = (item: ISidebar) => {
    // console.log(item)
  }

  const handleClickChannel = (channel: Channel) => {
    onSelectChannel(channel)
  }

  const handleClickBot = (bot: Bot) => {
    onSelectBot(bot)
  }

  useEffect(() => {
    if (channelId) setSelectedId(channelId)
  }, [channelId])

  const { getUserAvatar } = useAvatar()

  return (
    <div
      className={classnames(
        className,
        'flex h-full flex-col border-r border-black/20 text-black/70',
      )}
    >
      <SidebarTop />
      <div className="py-3">
        {STATIC_SIDEBAR.map((item) => (
          <SidebarItem
            key={item.data.id}
            label={item.label}
            isSelected={item.data.id === selectedId}
            onClick={() => handleClickStatic(item)}
          />
        ))}
      </div>

      <div className="py-2">
        {chChannels.map((channel) => (
          <SidebarItem
            key={channel.id}
            isSelected={channel.id === selectedId}
            onClick={() => handleClickChannel(channel)}
            prefix={<Avatar icon="#" />}
          >
            <span>{channel.name}</span>
          </SidebarItem>
        ))}
      </div>

      <div className="py-2">
        {imChannels.map((channel) => (
          <SidebarItem
            key={channel.id}
            isSelected={channel.id === selectedId}
            onClick={() => handleClickChannel(channel)}
            prefix={
              <Avatar
                size={20}
                src={getUserAvatar(users[channel.user])}
                presence={users[channel.user!]?.presence}
              />
            }
          >
            <span>
              {users[channel.user]?.profile.display_name ||
                users[channel.user]?.profile.real_name ||
                '-'}
            </span>
          </SidebarItem>
        ))}

        {mpimChannels.map((channel) => (
          <SidebarItem
            key={channel.id}
            isSelected={channel.id === selectedId}
            onClick={() => handleClickChannel(channel)}
            prefix={<Avatar size={20} src="/avatar/default.png" />}
          >
            <span>{(channel.users || []).map((uid) => users[uid]?.name).join(', ')}</span>
          </SidebarItem>
        ))}
      </div>

      <div className="py-2">
        {Object.values(bots).map((bot) => (
          <SidebarItem
            key={bot.id}
            isHighlight={bot.id === botId}
            onClick={() => handleClickBot(bot)}
            prefix={<BotAvatar size={20} bot={bot} presence={true} />}
          >
            <span>{bot.name}</span>
          </SidebarItem>
        ))}
      </div>
      <div className="h-full"></div>
    </div>
  )
}

export default AppSidebar
