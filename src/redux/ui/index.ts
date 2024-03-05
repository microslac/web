import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '@/redux/store'
import { PrimaryView, SecondaryView } from '@/constants/ui'

export interface UIState {
  view: {
    primary: PrimaryView
    secondary: SecondaryView
  }
}

const initialState: UIState = {
  view: {
    primary: PrimaryView.None,
    secondary: SecondaryView.None,
  },
}

const hydrate = createAction<AppState>(HYDRATE)

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPrimaryView: (state, action: PayloadAction<PrimaryView>) => {
      state.view.primary = action.payload
    },
    setSecondaryView: (state, action: PayloadAction<SecondaryView>) => {
      state.view.secondary = action.payload
    },
  },
})

export * from './selectors'

export const { setPrimaryView, setSecondaryView } = uiSlice.actions
