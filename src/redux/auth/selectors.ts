import { AppState } from '@/redux/store'

export const selectAuth = (state: AppState) => state.auth.auth
