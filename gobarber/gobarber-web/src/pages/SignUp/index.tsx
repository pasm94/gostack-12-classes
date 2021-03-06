import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { Container, Content, Background, AnimationContainer } from './styles'
import logoImg from '../../assets/logo.svg'
import getValidationErrors from '../../utils/getValidationErrors'
import Button from '../../components/Button/index'
import Input from '../../components/Input/index'
import { useToast } from '../../hooks/toast'
import api from '../../services/api'

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({}) // precisa setar pq quando for sucesso ele n vai entrar no catch


      const schema = Yup.object().shape({ // os dados que quero validar serao um objeto, e terao esse formato (shape)
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'), // nao precisa do required, pq se tem que ter 6 digitos
        // no minimo, eh obvio que eh obrigatorio
      })

      await schema.validate(data, {
        abortEarly: false, // retorna todos erros, inves de retornar apenas o primeiro
      })

      await api.post('users', data)

      history.push('/')

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber!'
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente!',
      })
    }
  }, [addToast, history]) // colocar as variaveis externas nas dependencias

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />

            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp