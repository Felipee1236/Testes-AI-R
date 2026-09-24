import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import HomePage from '../pageobjects/home.page'
import { createUser, type User } from '../utils/user.factory'
import { registerUser, deleteUser } from '../utils/account.helper'
import { loadTestData } from '../utils/data.loader'

interface InvalidLogin {
  cenario: string
  usarEmailCadastrado?: boolean
  email?: string
  password: string
}

const invalidLogins = loadTestData<InvalidLogin[]>('invalid-logins.json')

describe('Autenticação', () => {
  let user: User

  beforeEach(async () => {
    user = createUser()
    await registerUser(user)
    await HomePage.logout()
  })

  afterEach(async () => {
    await deleteUser(user)
  })

  it('deve fazer login com credenciais válidas', async () => {
    await LoginPage.open()
    await LoginPage.login(user.email, user.password)

    await expect(HomePage.loggedInAs).toHaveText(expect.stringContaining(user.name))
  })

  it('deve encerrar a sessão ao fazer logout', async () => {
    await LoginPage.open()
    await LoginPage.login(user.email, user.password)
    await HomePage.logout()

    await expect(HomePage.linkLogout).not.toBeExisting()
    await expect(HomePage.linkLogin).toBeDisplayed()
  })

  for (const caso of invalidLogins) {
    it(`deve exibir erro ao fazer login com ${caso.cenario}`, async () => {
      const email = caso.usarEmailCadastrado ? user.email : (caso.email as string)

      await LoginPage.open()
      await LoginPage.login(email, caso.password)

      await expect(LoginPage.loginErrorMessage).toHaveText('Your email or password is incorrect!')
      await expect(HomePage.linkLogout).not.toBeExisting()
    })
  }
})