import { NextComponentType } from 'next'
import classnames from 'classnames'

type Props = {
  className?: string
}

const ViewToolbar: NextComponentType<{}, {}, Props> = ({ className }) => {
  return (
    <div
      className={classnames(
        className,
        'flex h-9 items-center px-4 text-sm text-black/60 shadow-light',
      )}
    >
      Add a bookmark
    </div>
  )
}

export default ViewToolbar
