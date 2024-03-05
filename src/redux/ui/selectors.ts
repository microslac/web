import { AppState } from '@/redux/store'

export const selectView = (state: AppState) => state.ui.view
