import { configureStore } from '@reduxjs/toolkit'

import contactsReducer from './reducers/contacts'
import filtroReducer from './reducers/filtro'

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filtro: filtroReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store
