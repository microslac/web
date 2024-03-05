import { NextComponentType } from 'next'
import classnames from 'classnames'
import * as R from 'remeda'

import { User } from '@/types/user'
import {
  ProfileSection as IProfileSection,
  ProfileSectionType,
  ProfileElementType,
  ProfileElementKey,
} from '@/types/user/profile'

import ProfileMain from './ProfileMain'
import ProfileSection from './ProfileSection'

type Props = {
  className?: string
  user: User
}

const UserProfile: NextComponentType<{}, {}, Props> = ({ className, user }) => {
  const sections: IProfileSection[] = [
    {
      order: 1,
      id: 'contact',
      label: 'Contact Information',
      type: ProfileSectionType.Contact,
      elements: [
        {
          id: 'email',
          label: 'Email Address',
          text: user.profile.email,
          key: ProfileElementKey.Email,
          type: ProfileElementType.Text,
          icon: '#',
        },
        {
          id: 'phone',
          label: 'Mobile Phone',
          text: user.profile.phone || '-',
          key: ProfileElementKey.Phone,
          type: ProfileElementType.Text,
          icon: '#',
        },
      ],
    },
    {
      order: 2,
      id: 'affiliations',
      label: 'Affiliations',
      type: ProfileSectionType.Affiliations,
      elements: [
        {
          id: 'organization',
          label: 'Organization',
          text: 'Slac',
          key: ProfileElementKey.Organization,
          type: ProfileElementType.Text,
        },
        {
          id: 'division',
          label: 'Division',
          text: '-',
          key: ProfileElementKey.Division,
          type: ProfileElementType.Text,
        },
      ],
    },
  ]

  const orderedSections = R.sortBy(sections, (section) => section.order)

  return (
    <div className={classnames(className)}>
      <ProfileMain user={user} />
      {orderedSections.map((section, index) => (
        <ProfileSection key={section.id || index} section={section} />
      ))}
    </div>
  )
}

export default UserProfile
