import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  theme: 'dark'
}
export const themeSlice = createSlice(
  {
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme: (state) => {
        if (state.theme === 'dark') {
          document.querySelector('html').classList.remove('dark')
          document.querySelector('html').classList.add('light')

          state.theme = 'light';
        } else {
          document.querySelector('html').classList.remove('light')
          document.querySelector('html').classList.add('dark');
          state.theme = 'dark';
        }
      }
    }
  }
)
export const themeState = (state) => state.theme.theme;
export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;