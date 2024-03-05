import { NextComponentType } from 'next'
import classnames from 'classnames'

import { useAppSelector } from '@/redux/store'
import { selectTeam } from '@/redux/team'

type Props = {
  className?: string
}

const SidebarTop: NextComponentType<{}, {}, Props> = ({ className }) => {
  const team = useAppSelector(selectTeam)

  return (
    <div
      className={classnames(
        className,
        'flex h-12.5 shrink-0 items-center px-4 text-md font-bold text-black shadow-light',
      )}
    >
      {team.name}
    </div>
  )
}

export default SidebarTop
