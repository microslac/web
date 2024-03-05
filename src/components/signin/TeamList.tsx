import { NextComponentType } from 'next'
import React from 'react'
import classnames from 'classnames'
import { Card, CardHeader, CardBody } from '@nextui-org/react'

import { TeamData } from '@/types/signin'

type Props = {
  className?: string
  label: string
  email: string
  desc?: string
  teams: TeamData[]
  children: (team: TeamData) => React.ReactNode
}

const TeamList: NextComponentType<{}, {}, Props> = ({
  className,
  label,
  email,
  desc,
  teams,
  children,
}) => {
  return (
    <Card className={classnames('w-full max-w-[600px] border', className)} radius="md" shadow="sm">
      <CardHeader className="flex h-14 items-center border-b-2 px-6">
        <h4>
          {label} for <strong>{email}</strong>
        </h4>
      </CardHeader>
      <CardBody className="p-0">
        {desc && <div className="px-6 pb-1 pt-4 text-sm">{desc}</div>}
        {teams.map((team, idx) => (
          <React.Fragment key={team.id}>
            {idx > 0 && <hr className="ml-6" />}
            {children(team)}
          </React.Fragment>
        ))}
      </CardBody>
    </Card>
  )
}

export default TeamList
