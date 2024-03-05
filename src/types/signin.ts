import { Team } from '@/types/team'

export interface TeamData extends Team {
  active_users: number
  profile_photos: string[]
  domain: string
}
