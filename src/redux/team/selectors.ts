import { AppState } from '@/redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { Team } from '@/types/team'

const selectCache = (state: AppState) => state.team.cache

export const selectTeamId = (state: AppState) => state.team.id

export const selectTeam = createSelector(
  selectCache,
  selectTeamId,
  (cache, teamId) => cache[teamId] || ({} as Team),
)

export const lookupTeam = (teamId?: string) => (state: AppState) =>
  state.team.cache[teamId || state.team.id]
