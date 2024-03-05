import { NextComponentType } from 'next'
import classnames from 'classnames'

type Props = {
  className?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

const ViewHeader: NextComponentType<{}, {}, Props> = ({ className, children, actions }) => {
  return (
    <div
      className={classnames(
        className,
        'flex h-12.5 items-center justify-between pl-5 pr-4 shadow-light',
      )}
    >
      <div className="flex text-lg font-bold">{children}</div>
      {actions && <div className="flex">{actions}</div>}
    </div>
  )
}

export default ViewHeader
