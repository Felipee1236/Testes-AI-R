import { $ } from '@wdio/globals'
import BasePage from './base.page'

class ProductDetailsPage extends BasePage {
  public get productName() {
    return $('.product-information h2')
  }

  public get productPrice() {
    return $('.product-information span span')
  }
}

export default new ProductDetailsPage()