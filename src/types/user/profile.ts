export enum ProfileElementType {
  Text = 'text',
  Link = 'link',
}

export enum ProfileElementKey {
  Email = 'email',
  Phone = 'phone',
  Organization = 'organization',
  Timezone = 'timezone',
  Title = 'title',
  Division = 'division',
  Department = 'department',
}

export enum ProfileSectionType {
  Header = 'header',
  Contact = 'contact',
  People = 'people',
  Affiliations = 'affiliations',
  Additional = 'additional',
  Others = 'others',
}

export type ProfileElement = {
  id: string
  label: string
  text: string
  icon?: string
  key: ProfileElementKey
  type: ProfileElementType
}

export type ProfileSection = {
  id: string
  label: string
  order: number
  type: ProfileSectionType
  elements: ProfileElement[]
}
