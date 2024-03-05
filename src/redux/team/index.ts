import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/redux/store'

import { Team } from '@/types/team'
import { clientBoot } from '@/redux/client/actions'

export interface TeamState {
  id: string
  cache: { [key: string]: Team }
}

const initialState: TeamState = {
  cache: {},
  id: '',
}

const hydrate = createAction<AppState>(HYDRATE)

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeamId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.team,
        }
      })
      .addCase(clientBoot.fulfilled, (state, action) => {
        const { team } = action.payload
        state.cache[team.id] = team
        state.id = team.id
      })
  },
})

export * from './selectors'
