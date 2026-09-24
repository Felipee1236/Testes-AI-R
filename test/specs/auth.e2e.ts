import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import HomePage from '../pageobjects/home.page'
import { createUser, type User } from '../utils/user.factory'
import { registerUser, deleteUser } from '../utils/account.helper'

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
})