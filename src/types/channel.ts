export type Channel = {
  id: string
  team: string
  name: string
  is_channel: boolean
  is_general: boolean
  is_random: boolean
  is_archived: boolean
  is_frozen: boolean
  is_im: boolean
  is_mpim: boolean
  is_private: boolean
  is_shared: boolean
  is_read_only: boolean

  created: number
  updated: number
  creator: string
  updater?: string

  user: string
  users: string[]
}
