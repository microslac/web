'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { selectChannel, selectChannels, setChannelId } from '@/redux/channel'
import { selectTeam } from '@/redux/team'
import { fetchMessages } from '@/redux/conversation/actions'

import { Toaster } from 'react-hot-toast'

import { Channel } from '@/types/channel'
import AppNav from '@/components/app/nav/AppNav'
import AppSidebar from '@/components/app/sidebar/AppSidebar'
import ViewPrimary from '@/components/app/view/ViewPrimary'
import ViewSecondary from '@/components/app/view/ViewSecondary'

import { selectUserMapping } from '@/redux/user'

export default function ChannelPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const team = useAppSelector(selectTeam)
  const channel = useAppSelector(selectChannel)
  const channels = useAppSelector(selectChannels)
  const userMapping = useAppSelector(selectUserMapping)

  const handleSelectChannel = (channel: Channel) => {
    const url = `/client/${params.team}/${channel.id}`
    history.pushState({}, '', url)
    dispatch(setChannelId(channel.id))
    dispatch(fetchMessages())
  }

  useEffect(() => {
    if (team && channel) {
      let name = channel.name
      if (channel.is_im) name = userMapping[channel.user].name
      if (channel.is_mpim) name = channel.users.map((uid) => userMapping[uid].name).join(', ')

      document.title = [name, team.name, 'Slac'].join(' - ')
    } else {
      document.title = 'Channel - Slac'
    }
  }, [team, channel, userMapping])

  return (
    <div className="flex h-screen w-screen flex-col">
      <AppNav />
      <div className="flex h-full">
        <AppSidebar
          className="w-[240px]"
          channels={channels}
          channelId={channel.id}
          onSelectChannel={handleSelectChannel}
        />
        <ViewPrimary className="shrink-0 grow" channel={channel} />
        <ViewSecondary className="min-w-[340px] shrink-0 grow-0" />
      </div>
      <Toaster
        position="bottom-center"
        containerStyle={{ bottom: 40 }}
        toastOptions={{
          error: { style: { background: '#27272a', color: '#ffffff' } },
        }}
      />
    </div>
  )
}
