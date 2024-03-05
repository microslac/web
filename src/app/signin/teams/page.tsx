'use client'

import { NextComponentType } from 'next'
import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/api/use-api'
import { TeamData } from '@/types/signin'
import TeamList from '@/components/signin/TeamList'
import TeamItem from '@/components/signin/TeamItem'

type Props = {}

type FindTeamsData = {
  ok: boolean
  confirmed_email: string
  has_valid_cookie: boolean
  current_teams: TeamData[]
  invited_teams: TeamData[]
  domain_enabled_teams: TeamData[]
}

const SigninTeamsPage: NextComponentType<{}, {}, Props> = () => {
  const api = useApi('auth')
  const [findData, setFindData] = useState<FindTeamsData>({} as any)

  useEffect(() => {
    api
      .post('client/find-teams')
      .then(async (resp) => {
        const data = await resp.json<FindTeamsData>()
        setFindData(data)
      })
      .catch((error) => console.log(error))
  }, [api])

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="mb-4 text-4xl font-bold">Welcome back! You look nice to day!</div>
      <div className="mb-8 text-black/60">
        Choose a workspace below to get back to working with your team.
      </div>
      <div className="w-full max-w-[600px]">
        {findData.current_teams?.length > 0 && (
          <TeamList
            label="Workspaces"
            email={findData.confirmed_email}
            teams={findData.current_teams}
            className="mb-10"
          >
            {(team) => <TeamItem.Link team={team} />}
          </TeamList>
        )}
        {findData.invited_teams?.length > 0 && (
          <>
            <h3 className="mb-4 w-full text-left text-lg font-bold">Pending invitations</h3>
            <TeamList
              label="Invitations"
              email={findData.confirmed_email}
              teams={findData.invited_teams}
            >
              {(team) => <TeamItem.Join team={team} />}
            </TeamList>
          </>
        )}
      </div>
    </div>
  )
}

export default SigninTeamsPage
