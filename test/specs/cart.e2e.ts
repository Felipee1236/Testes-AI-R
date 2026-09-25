import { expect } from '@wdio/globals'
import ProductsPage from '../pageobjects/products.page'
import CartPage from '../pageobjects/cart.page'

describe('Carrinho', () => {
  it('deve exigir login ao prosseguir para o checkout sem estar autenticado', async () => {
    await ProductsPage.open()
    await ProductsPage.addFirstProductToCart()
    await ProductsPage.viewCartFromModal()

    await expect(CartPage.cartItems).toBeElementsArrayOfSize({ gte: 1 })

    await CartPage.proceedToCheckout()

    await expect(CartPage.checkoutModalMessage).toHaveText(
      expect.stringContaining('Register / Login account to proceed on checkout'),
    )
    await expect(CartPage.checkoutModalLoginLink).toBeDisplayed()
  })
})
