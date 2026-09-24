import { $ } from '@wdio/globals'
import BasePage from './base.page'

class HomePage extends BasePage {
  public get linkLogout() {
    return $('a[href="/logout"]')
  }

  public get linkDeleteAccount() {
    return $('a[href="/delete_account"]')
  }

  public get loggedInAs() {
    return $('a*=Logged in as')
  }

  public async deleteAccount() {
    await this.linkDeleteAccount.click()
  }
}

export default new HomePage()