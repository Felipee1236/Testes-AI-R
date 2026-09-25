import { $ } from '@wdio/globals'
import BasePage from './base.page'

class AccountPage extends BasePage {
  public get titleCreated() {
    return $('[data-qa="account-created"]')
  }

  public get btnContinue() {
    return $('[data-qa="continue-button"]')
  }

  public async continue() {
    await this.clickLink(this.btnContinue)
  }
}

export default new AccountPage()
