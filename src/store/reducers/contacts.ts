import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contact from '../../models/Contact'

type ContactsState = {
  itens: Contact[]
}
const initialState: ContactsState = {
  itens: [
    {
      id: 1,
      name: 'Lucas',
      email: 'lucas.teste@hotmail.com',
      phone: 5599999999999
    },
    {
      id: 2,
      name: 'Eduardo',
      email: 'eduardo.teste@hotmail.com',
      phone: 5599999999999
    },
    {
      id: 3,
      name: 'Carlos',
      email: 'carlos.teste@hotmail.com',
      phone: 5599999999999
    }
  ]
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (contact) => contact.id !== action.payload
      )
    },
    edit: (state, action: PayloadAction<Contact>) => {
      const contactIndex = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (contactIndex >= 0) {
        state.itens[contactIndex] = action.payload
      }
    },
    register: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      const contactAlreadyExist = state.itens.find(
        (tarefa) =>
          tarefa.name.toLocaleLowerCase() ===
          action.payload.name.toLocaleLowerCase()
      )

      if (contactAlreadyExist) {
        alert("It's already exist a contact with this name!")
      } else {
        const lastContact = state.itens[state.itens.length - 1]

        const tarefaNova = {
          ...action.payload,
          id: lastContact ? lastContact.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    }
  }
})

export const { remove, edit, register } = contactsSlice.actions

export default contactsSlice.reducer
