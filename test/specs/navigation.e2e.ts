import { expect, browser } from '@wdio/globals'
import ProductsPage from '../pageobjects/products.page'

describe('Navegação', () => {
  it('deve listar os produtos da categoria Women > Dress', async () => {
    await ProductsPage.open()
    await ProductsPage.selectCategory('Women', 'Dress')

    await expect(browser).toHaveUrl(expect.stringContaining('/category_products/'))
    await expect(ProductsPage.title).toHaveText('Women - Dress Products', { ignoreCase: true })
    await expect(ProductsPage.productCards).toBeElementsArrayOfSize({ gte: 1 })
  })
})