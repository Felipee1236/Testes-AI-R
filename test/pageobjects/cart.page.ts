import { $, $$ } from '@wdio/globals'
import BasePage from './base.page'

class CartPage extends BasePage {
  public get cartItems() {
    return $$('#cart_info_table tbody tr')
  }

  public get btnProceedToCheckout() {
    return $('a.check_out')
  }

  public get checkoutModalMessage() {
    return $('#checkoutModal .modal-body p')
  }

  public get checkoutModalLoginLink() {
    return $('#checkoutModal a[href="/login"]')
  }

  public async proceedToCheckout() {
    await this.btnProceedToCheckout.click()
  }
}

export default new CartPage()