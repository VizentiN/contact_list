import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { BotaoSalvar, MainContainer, Name } from '../../styles'
import { Campo } from '../../styles'
import { Form } from './styles'
import { register } from '../../store/reducers/contacts'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const registerContact = (evento: FormEvent) => {
    evento.preventDefault()
    dispatch(
      register({
        name,
        email,
        phone: parseInt(phone, 10)
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Name>New Contact</Name>
      <Form onSubmit={registerContact}>
        <Campo
          value={name}
          onChange={(evento) => setName(evento.target.value)}
          type="text"
          placeholder="Name"
        />
        <Campo
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          placeholder="E-mail"
        />
        <Campo
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
          type="number"
          placeholder="Phone Number"
        />
        <BotaoSalvar type="submit">Submit</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
