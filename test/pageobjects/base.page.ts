import { browser } from '@wdio/globals'
import { addStep } from '@wdio/allure-reporter'
import type { ChainablePromiseElement } from 'webdriverio'

export default class BasePage {
  public async open(path: string) {
    await browser.url(path)
  }

  protected async check(element: ChainablePromiseElement) {
    if (!(await element.isSelected())) {
      await element.click()
    }
  }

  protected async clickLink(element: ChainablePromiseElement) {
    const href = await element.getAttribute('href')
    const urlBefore = await browser.getUrl()

    await element.click()
    await browser.waitUntil(async () => (await browser.getUrl()) !== urlBefore, {
      timeoutMsg: `A navegação para ${href} não aconteceu`,
    })

    if (href && (await browser.getUrl()).includes('#google_vignette')) {
      const message = `Anúncio intersticial interceptou o clique; navegação direta para ${href}`
      console.warn(message)
      await addStep(message)
      await browser.url(href)
    }
  }
}
