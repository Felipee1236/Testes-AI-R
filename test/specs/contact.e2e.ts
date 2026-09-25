import { expect } from '@wdio/globals'
import ContactPage from '../pageobjects/contact.page'
import { createUser } from '../utils/user.factory'

describe('Contato', () => {
  it('deve enviar o formulário de contato com sucesso', async () => {
    const user = createUser()

    await ContactPage.open()
    await ContactPage.fillForm(
      user.name,
      user.email,
      'Dúvida sobre pedido',
      'Mensagem de teste automatizado.',
    )
    await ContactPage.submitAcceptingConfirmation()

    await expect(ContactPage.successMessage).toHaveText(
      expect.stringContaining('Your details have been submitted successfully'),
    )
  })
})
