import { $, $$ } from '@wdio/globals'
import BasePage from './base.page'

class ProductsPage extends BasePage {
  public get title() {
    return $('.features_items h2.title')
  }

  public get productCards() {
    return $$('.features_items .product-image-wrapper')
  }

  public get firstProductName() {
    return $('.features_items .productinfo p')
  }

  public get firstProductPrice() {
    return $('.features_items .productinfo h2')
  }

  public get firstViewProductLink() {
    return $('.features_items a[href^="/product_details/"]')
  }

  public get firstAddToCartButton() {
    return $('.features_items .productinfo a[data-product-id]')
  }

  public get cartModalViewCartLink() {
    return $('#cartModal a[href="/view_cart"]')
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
    await link.waitForDisplayed()
    await link.scrollIntoView({ block: 'center' })
    await this.clickLink(link)
  }

  public async openFirstProductDetails() {
    await this.clickLink(this.firstViewProductLink)
  }

  public async addFirstProductToCart() {
    await this.firstAddToCartButton.click()
  }

  public async viewCartFromModal() {
    await this.cartModalViewCartLink.waitForClickable()
    await this.clickLink(this.cartModalViewCartLink)
  }
}

export default new ProductsPage()