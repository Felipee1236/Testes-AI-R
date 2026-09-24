import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SignupPage from '../pageobjects/signup.page'
import AccountPage from '../pageobjects/account.page'
import HomePage from '../pageobjects/home.page'
import { createUser } from '../utils/user.factory'

describe('Cadastro', () => {
  afterEach(async () => {
    if (await HomePage.linkDeleteAccount.isExisting()) {
      await HomePage.deleteAccount()
    }
  })

  it('deve criar uma conta com todos os dados preenchidos', async () => {
    const user = createUser()

    await LoginPage.open()
    await LoginPage.startSignup(user.name, user.email)
    await SignupPage.fillAccountInfo(user)
    await SignupPage.submit()

    await expect(AccountPage.titleCreated).toHaveText('Account Created!', { ignoreCase: true })

    await AccountPage.continue()
    await expect(HomePage.loggedInAs).toHaveText(expect.stringContaining(user.name))
  })
})