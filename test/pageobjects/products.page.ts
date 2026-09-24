import { $, $$ } from '@wdio/globals'
import BasePage from './base.page'

class ProductsPage extends BasePage {
  public get title() {
    return $('.features_items h2.title')
  }

  public get productCards() {
    return $$('.features_items .product-image-wrapper')
  }

  public categoryToggle(category: string) {
    return $(`a[href="#${category}"]`)
  }

  public subcategoryLink(category: string, subcategory: string) {
    return $(`#${category}`).$(`a*=${subcategory}`)
  }

  public async open() {
    await super.open('/products')
  }

  public async selectCategory(category: string, subcategory: string) {
    await this.categoryToggle(category).click()

    const link = this.subcategoryLink(category, subcategory)
    await link.waitForClickable()
    await link.click()
  }
}

export default new ProductsPage()