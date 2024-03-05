import { NextComponentType } from 'next'
import NextLink from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

import { useApi } from '@/hooks/api/use-api'
import { TeamData } from '@/types/signin'
import { Button, Link } from '@nextui-org/react'
import Avatar from '@/components/avatar/Avatar'

export const TeamLink: NextComponentType<{}, {}, { team: TeamData }> = ({ team }) => {
  const teamUrl = `/client/${team.id}`

  return (
    <NextLink href={teamUrl} target="_blank" className="group flex cursor-pointer px-6 py-4">
      <div className="mr-3 mt-1">Avatar</div>
      <div className="w-full">
        <div className="text-lg">{team.name}</div>
        <div className="mt-1 flex items-center">
          <div className="mr-2.5 flex items-center gap-x-0.5">
            {team.profile_photos.map((url, idx) => (
              <Avatar key={idx} src={url || '/avatar/default.png'} size={20} />
            ))}
          </div>
          <div className="text-ss text-black/60">
            <span>
              {team.active_users} {team.active_users > 1 ? 'members' : 'member'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center transition group-hover:translate-x-1">
        <span className="hidden text-lg text-black/80 group-hover:inline">Open</span>
        <i className="mb-[18px] text-5xl font-bold leading-[0px]">→</i>
      </div>
    </NextLink>
  )
}

export const TeamJoin: NextComponentType<{}, {}, { team: TeamData }> = ({ team }) => {
  const router = useRouter()
  const api = useApi('auth')

  const handleJoinTeam = () => {
    api
      .post('teams/join', { json: { team: team.id } })
      .then((res) => res.json<{ ok: true }>())
      .then((data) => data.ok && router.push(`/client/${team.id}`))
  }

  return (
    <div className="group flex cursor-pointer px-6 py-4">
      <div className="mr-3 mt-1">Avatar</div>
      <div className="w-full">
        <div className="text-lg">{team.name}</div>
        <div className="flex items-center">
          <div className="mr-2.5 flex items-center gap-x-0.5">
            {team.profile_photos.map((url, idx) => (
              <Avatar key={idx} src={url || '/avatar/default.png'} size={20} />
            ))}
          </div>
          <div className="text-ss text-black/60">
            <span>
              {team.active_users} {team.active_users > 1 ? 'members' : 'member'}
            </span>
          </div>
        </div>
      </div>
      <Button
        as={Link}
        color="primary"
        variant="bordered"
        className="min-w-[52px] p-2 text-md"
        onPress={handleJoinTeam}
      >
        Join
      </Button>
    </div>
  )
}

export default {
  Link: TeamLink,
  Join: TeamJoin,
}
