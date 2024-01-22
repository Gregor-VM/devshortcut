import renderToString from 'preact-render-to-string'
import { App } from './app'

export function render(url: string) {
  const html = renderToString(<App url={url} />)
  return { html }
}
