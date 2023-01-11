import { configureStore } from '@reduxjs/toolkit'
import { personSlice } from './slices/person'

export const store = configureStore({
  reducer: {
    person: personSlice.reducer
  },
})