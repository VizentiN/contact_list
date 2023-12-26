import { useSelector } from 'react-redux'

import Contact from '../../components/Contact'
import { MainContainer, Name } from '../../styles'
import { RootReducer } from '../../store'

const ContactList = () => {
  const { itens } = useSelector((state: RootReducer) => state.contacts)
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  const contactFilter = () => {
    let filterContacts = itens
    if (termo !== undefined) {
      filterContacts = filterContacts.filter(
        (item) => item.name.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      return filterContacts
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    const mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    return mensagem + complementacao
  }

  const contacts = contactFilter()
  const mensagem = exibeResultadoFiltragem(contacts.length)

  return (
    <MainContainer>
      <Name as="p">{mensagem}</Name>
      <ul>
        {contacts.map((c) => (
          <li key={c.name}>
            <Contact id={c.id} name={c.name} email={c.email} phone={c.phone} />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}
export default ContactList
function filterContacts() {
  throw new Error('Function not implemented.')
}
