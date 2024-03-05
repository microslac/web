export type User = {
  id: string
  name: string
  team: string
  created: number
  updated: number

  profile: UserProfile
  presence: UserPresence
}

export type UserProfile = {
  team: string
  first_name: string
  last_name: string
  real_name: string
  display_name: string
  avatar_hash: string

  email: string
  phone: string
  skype: string
  title: string

  status_text: string
  status_emoji: string
  status_expiration: number
  status_emoji_display_info: string[]
}

export type UserPresence = 'active' | 'away'
