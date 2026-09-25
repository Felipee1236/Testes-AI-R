import { browser } from '@wdio/globals'
import type { ChainablePromiseElement } from 'webdriverio'

export default class BasePage {
  public async open(path: string) {
    await browser.url(path)
  }

  protected async clickLink(element: ChainablePromiseElement) {
    const href = await element.getAttribute('href')
    const urlBefore = await browser.getUrl()

    await element.click()
    await browser.waitUntil(async () => (await browser.getUrl()) !== urlBefore, {
      timeout: 10000,
      timeoutMsg: `A navegação para ${href} não aconteceu`,
    })

    if (href && (await browser.getUrl()).includes('#google_vignette')) {
      await browser.url(href)
    }
  }
}
