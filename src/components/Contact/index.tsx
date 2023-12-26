import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remove, edit } from '../../store/reducers/contacts'
import ContactClass from '../../models/Contact'
import { Botao, BotaoSalvar } from '../../styles'

type Props = ContactClass

const Contact = ({
  name,
  email: initialEmail,
  phone: initialPhone,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedEmail, setEditedEmail] = useState('')
  const [editedPhone, setEditedPhone] = useState<string>('')

  useEffect(() => {
    if (initialEmail.length > 0) {
      setEditedEmail(initialEmail)
    }
    if (typeof initialPhone === 'number') {
      setEditedPhone(initialPhone.toString())
    }
  }, [initialEmail, initialPhone])

  function cancelEditing() {
    setIsEditing(false)
    setEditedEmail(initialEmail)
    setEditedPhone(initialPhone.toString())
  }

  return (
    <S.Card>
      <label htmlFor={name}>
        <S.Name>
          {isEditing && <em>Editing: </em>}
          {name}
        </S.Name>
      </label>
      <S.Email
        disabled={!isEditing}
        value={editedEmail}
        onChange={(evento) => setEditedEmail(evento.target.value)}
      />
      <S.Phone
        disabled={!isEditing}
        value={editedPhone}
        onChange={(evento) => setEditedPhone(evento.target.value)}
      />
      <S.BarraAcoes>
        {isEditing ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  edit({
                    name,
                    email: editedEmail,
                    phone: parseInt(editedPhone, 10),
                    id
                  })
                )
                setIsEditing(false)
              }}
            >
              Save
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelEditing}>
              Cancel
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setIsEditing(true)}>Edit</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remove(id))}>
              Remove
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Contact
