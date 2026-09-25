import { $, browser } from '@wdio/globals'
import BasePage from './base.page'

class ContactPage extends BasePage {
  public get inputName() {
    return $('[data-qa="name"]')
  }

  public get inputEmail() {
    return $('[data-qa="email"]')
  }

  public get inputSubject() {
    return $('[data-qa="subject"]')
  }

  public get inputMessage() {
    return $('[data-qa="message"]')
  }

  public get btnSubmit() {
    return $('[data-qa="submit-button"]')
  }

  public get successMessage() {
    return $('.contact-form .status.alert-success')
  }

  public async open() {
    await super.open('/contact_us')
  }

  public async fillForm(name: string, email: string, subject: string, message: string) {
    await this.inputName.setValue(name)
    await this.inputEmail.setValue(email)
    await this.inputSubject.setValue(subject)
    await this.inputMessage.setValue(message)
  }

  public async submitAcceptingConfirmation() {
    browser.once('dialog', (dialog) => dialog.accept())
    await this.btnSubmit.click()
  }
}

export default new ContactPage()
