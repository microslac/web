export type Message = {
  team: string
  channel: string
  user: string
  text: string
  type: string
  subtype?: string
  ts: number
  client_msg_id: string
}
