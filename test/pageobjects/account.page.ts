import { $ } from '@wdio/globals'
import BasePage from './base.page'

class AccountPage extends BasePage {
  public get titleCreated() {
    return $('[data-qa="account-created"]')
  }

  public get titleDeleted() {
    return $('[data-qa="account-deleted"]')
  }

  public get btnContinue() {
    return $('[data-qa="continue-button"]')
  }

  public async continue() {
    await this.btnContinue.click()
  }
}

export default new AccountPage()
