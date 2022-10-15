import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleFocus: false
}

export const themeSlice = createSlice(
  {
    name: 'theme',
    initialState,
    reducers: {
      toggleFocus: (state, action) => {
        state.toggleFocus = action.payload
      }
    }
  }
)

export const selectFocus = (state) => state.theme.toggleFocus
export const { toggleFocus } = themeSlice.actions
export default themeSlice.reducer