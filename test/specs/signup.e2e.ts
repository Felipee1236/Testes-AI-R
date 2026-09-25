import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SignupPage from '../pageobjects/signup.page'
import AccountPage from '../pageobjects/account.page'
import HomePage from '../pageobjects/home.page'
import { createUser, type User } from '../utils/user.factory'
import { createAccount, deleteAccount } from '../utils/account.api'

describe('Cadastro', () => {
  let createdUser: User | undefined

  beforeEach(() => {
    createdUser = undefined
  })

  afterEach(async () => {
    if (createdUser) {
      await deleteAccount(createdUser)
    }
  })

  it('deve criar uma conta com todos os dados preenchidos', async () => {
    const user = createUser()

    await LoginPage.open()
    await LoginPage.startSignup(user.name, user.email)
    await SignupPage.fillAccountInfo(user)

    await expect(SignupPage.radioMr).toBeSelected()
    await expect(SignupPage.checkboxNewsletter).toBeSelected()
    await expect(SignupPage.checkboxOffers).toBeSelected()
    await expect(SignupPage.selectDay).toHaveValue(user.birthDay)
    await expect(SignupPage.selectedMonth).toHaveText(user.birthMonth)
    await expect(SignupPage.selectYear).toHaveValue(user.birthYear)
    await expect(SignupPage.selectedCountry).toHaveText(user.country)

    await SignupPage.submit()
    createdUser = user

    await expect(AccountPage.titleCreated).toHaveText('Account Created!', { ignoreCase: true })

    await AccountPage.continue()
    await expect(HomePage.loggedInAs).toHaveText(expect.stringContaining(user.name))
  })

  it('não deve enviar o cadastro com a senha em branco', async () => {
    const user = { ...createUser(), password: '' }

    await LoginPage.open()
    await LoginPage.startSignup(user.name, user.email)
    await SignupPage.fillAccountInfo(user)
    await SignupPage.submit()

    await expect(browser).toHaveUrl(expect.stringContaining('/signup'))
    await expect(AccountPage.titleCreated).not.toBeExisting()
    expect(await SignupPage.isPasswordMissing()).toBe(true)
  })

  it('deve exibir erro ao cadastrar com e-mail já existente', async () => {
    const user = createUser()
    await createAccount(user)
    createdUser = user

    await LoginPage.open()
    await LoginPage.startSignup(user.name, user.email)

    await expect(LoginPage.signupErrorMessage).toHaveText('Email Address already exist!')
  })
})