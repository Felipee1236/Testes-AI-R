import { expect, browser } from '@wdio/globals'
import ProductsPage from '../pageobjects/products.page'
import ProductDetailsPage from '../pageobjects/product-details.page'

describe('Navegação', () => {
  it('deve listar os produtos da categoria Women > Dress', async () => {
    await ProductsPage.open()
    await ProductsPage.selectCategory('Women', 'Dress')

    await expect(browser).toHaveUrl(expect.stringContaining('/category_products/'))
    await expect(ProductsPage.title).toHaveText(/women\s*-\s*dress products/i)
    await expect(ProductsPage.productCards).toBeElementsArrayOfSize({ gte: 1 })
  })
  it('deve abrir os detalhes de um produto a partir da listagem', async () => {
    await ProductsPage.open()
    const name = await ProductsPage.firstProductName.getText()
    const price = await ProductsPage.firstProductPrice.getText()

    await ProductsPage.openFirstProductDetails()

    await expect(browser).toHaveUrl(expect.stringContaining('/product_details/'))
    await expect(ProductDetailsPage.productName).toHaveText(name)
    await expect(ProductDetailsPage.productPrice).toHaveText(price)
  })
}) 