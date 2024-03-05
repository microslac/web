import { NextComponentType } from 'next'
import classnames from 'classnames'

import { ProfileElement, ProfileElementKey } from '@/types/user/profile'

type Props = {
  className?: string
  element: ProfileElement
}

const ProfileField: NextComponentType<{}, {}, Props> = ({ className, element }) => {
  let text = <div>{element.text}</div>
  if (element.key === ProfileElementKey.Email)
    text = (
      <a href={`mailto:${element.text}`} className="text-link">
        {element.text}
      </a>
    )
  else if (element.key === ProfileElementKey.Phone)
    text = (
      <a href={`tel:${element.text}`} className="text-link">
        {element.text}
      </a>
    )

  return (
    <div className={classnames('flex items-center', className)}>
      {element.icon && (
        <div className="flex-center mr-2 h-9 w-9 rounded bg-black/5">{element.icon}</div>
      )}
      <div>
        <div className="text-ss font-bold text-black/50">{element.label}</div>
        {text}
      </div>
    </div>
  )
}

export default ProfileField
