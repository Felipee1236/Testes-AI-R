import { $ } from '@wdio/globals'
import BasePage from './base.page'

class LoginPage extends BasePage {
  public get inputEmail() {
    return $('[data-qa="login-email"]')
  }

  public get inputPassword() {
    return $('[data-qa="login-password"]')
  }

  public get btnLogin() {
    return $('[data-qa="login-button"]')
  }

  public async open() {
    await super.open('/login')
  }

  public async login(email: string, password: string) {
    await this.inputEmail.setValue(email)
    await this.inputPassword.setValue(password)
    await this.btnLogin.click()
  }
  public get inputSignupName() {
    return $('[data-qa="signup-name"]')
  }

  public get inputSignupEmail() {
    return $('[data-qa="signup-email"]')
  }

  public get btnSignup() {
    return $('[data-qa="signup-button"]')
  }

  public async startSignup(name: string, email: string) {
    await this.inputSignupName.setValue(name)
    await this.inputSignupEmail.setValue(email)
    await this.btnSignup.click()
  }
  public get loginErrorMessage() {
    return $('form[action="/login"] p')
  }

  public get signupErrorMessage() {
    return $('form[action="/signup"] p')
  }
}

export default new LoginPage()
