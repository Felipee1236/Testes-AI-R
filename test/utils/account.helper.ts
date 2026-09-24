import LoginPage from '../pageobjects/login.page'
import SignupPage from '../pageobjects/signup.page'
import AccountPage from '../pageobjects/account.page'
import HomePage from '../pageobjects/home.page'
import type { User } from './user.factory'

export async function registerUser(user: User) {
  await LoginPage.open()
  await LoginPage.startSignup(user.name, user.email)
  await SignupPage.fillAccountInfo(user)
  await SignupPage.submit()
  await AccountPage.continue()
}

export async function deleteUser(user: User) {
  if (!(await HomePage.linkDeleteAccount.isExisting())) {
    await LoginPage.open()
    await LoginPage.login(user.email, user.password)
  }
  await HomePage.deleteAccount()
}
