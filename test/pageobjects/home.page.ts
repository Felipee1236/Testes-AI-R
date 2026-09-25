import { $ } from '@wdio/globals'
import BasePage from './base.page'

class HomePage extends BasePage {
  public get linkLogin() {
    return $('a[href="/login"]')
  }

  public get linkLogout() {
    return $('a[href="/logout"]')
  }

  public get linkDeleteAccount() {
    return $('a[href="/delete_account"]')
  }

  public get loggedInAs() {
    return $('a*=Logged in as')
  }

  public async logout() {
    await this.clickLink(this.linkLogout)
  }

  public async deleteAccount() {
    await this.clickLink(this.linkDeleteAccount)
  }
}

export default new HomePage()