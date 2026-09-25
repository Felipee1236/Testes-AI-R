import { $, browser } from '@wdio/globals'
import BasePage from './base.page'
import type { User } from '../utils/user.factory'

class SignupPage extends BasePage {
  public get radioMr() {
    return $('#id_gender1')
  }

  public get inputPassword() {
    return $('[data-qa="password"]')
  }

  public get selectDay() {
    return $('[data-qa="days"]')
  }

  public get selectMonth() {
    return $('[data-qa="months"]')
  }

  public get selectYear() {
    return $('[data-qa="years"]')
  }

  public get checkboxNewsletter() {
    return $('#newsletter')
  }

  public get checkboxOffers() {
    return $('#optin')
  }

  public get inputFirstName() {
    return $('[data-qa="first_name"]')
  }

  public get inputLastName() {
    return $('[data-qa="last_name"]')
  }

  public get inputCompany() {
    return $('[data-qa="company"]')
  }

  public get inputAddress() {
    return $('[data-qa="address"]')
  }

  public get selectCountry() {
    return $('[data-qa="country"]')
  }

  public get inputState() {
    return $('[data-qa="state"]')
  }

  public get inputCity() {
    return $('[data-qa="city"]')
  }

  public get inputZipcode() {
    return $('[data-qa="zipcode"]')
  }

  public get inputMobile() {
    return $('[data-qa="mobile_number"]')
  }

  public get btnCreateAccount() {
    return $('[data-qa="create-account"]')
  }

  public async fillAccountInfo(user: User) {
    await this.radioMr.click()
    await this.inputPassword.setValue(user.password, { mask: true })
    await this.selectDay.selectByAttribute('value', user.birthDay)
    await this.selectMonth.selectByVisibleText(user.birthMonth)
    await this.selectYear.selectByAttribute('value', user.birthYear)
    await this.checkboxNewsletter.click()
    await this.checkboxOffers.click()
    await this.inputFirstName.setValue(user.firstName)
    await this.inputLastName.setValue(user.lastName)
    await this.inputCompany.setValue(user.company)
    await this.inputAddress.setValue(user.address)
    await this.selectCountry.selectByVisibleText(user.country)
    await this.inputState.setValue(user.state)
    await this.inputCity.setValue(user.city)
    await this.inputZipcode.setValue(user.zipcode)
    await this.inputMobile.setValue(user.mobile)
  }

  public async submit() {
    await this.btnCreateAccount.click()
  }

  public async isPasswordMissing(): Promise<boolean> {
    const input = await this.inputPassword
    return browser.execute((el) => (el as unknown as HTMLInputElement).validity.valueMissing, input)
  }
}

export default new SignupPage()
