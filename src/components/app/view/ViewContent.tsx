import { NextComponentType } from 'next'
import classnames from 'classnames'

import MessageMessenger from '@/components/message/MessageMessenger'

type Props = {
  className?: string
}

const ViewContent: NextComponentType<{}, {}, Props> = ({ className }) => {
  return (
    <div className={classnames(className, 'flex h-full flex-col')}>
      <MessageMessenger />
    </div>
  )
}

export default ViewContent
