import { createAsyncThunk } from '@reduxjs/toolkit'
import { Team } from '@/types/team'
import { User } from '@/types/user'
import { Channel } from '@/types/channel'
import { setupApi, thunkRequest } from '@/services/api'

export type ClientBootResponse = {
  ok: boolean
  team: Team
  ims: Channel[]
  channels: Channel[]
  is_open: string[]
  prefs: object
  url: string
  self: User
  users: User[]
}

export const clientBoot = createAsyncThunk('client/boot', async (teamId: string, thunkAPI) => {
  return thunkRequest(thunkAPI, async () => {
    const api = setupApi()
    const resp = await api.post('client/boot', { json: { team: teamId } })

    return await resp.json<ClientBootResponse>()
  })
})
