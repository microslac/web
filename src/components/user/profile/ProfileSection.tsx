import { NextComponentType } from 'next'
import classnames from 'classnames'

import { ProfileSection } from '@/types/user/profile'

import ProfileField from './ProfileField'

type Props = {
  className?: string
  children?: React.ReactNode
  section: ProfileSection
}

const ProfileSection: NextComponentType<{}, {}, Props> = ({ className, children, section }) => {
  if (section.elements.length === 0) return null

  return (
    <div className={classnames('border-t p-4', className)}>
      <div className="mb-4 font-bold">{section.label}</div>
      {section.elements.map((element, index) => (
        <ProfileField
          key={element.id}
          element={element}
          className={classnames({
            'pt-2': index !== 0,
            'pb-2': index !== section.elements.length - 1,
          })}
        />
      ))}
    </div>
  )
}

export default ProfileSection
