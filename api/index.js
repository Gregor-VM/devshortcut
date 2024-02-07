import fs from 'node:fs/promises'
import express from 'express'
import router from '../server/routes.js'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const cwd = process.cwd()

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile(`${cwd}/dist/client/index.html`, 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile(`${cwd}/dist/client/.vite/ssr-manifest.json`, 'utf-8')
  : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true, watch: {ignored: ['**/src/examples/**']} },
    appType: 'custom',
    base,
    optimizeDeps: {
      exclude: ['src/examples', 'src/examples/*']
    } 
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv(`${cwd}/dist/client`, { extensions: [] }))
}

app.use(router);

// Serve HTML
app.use('*', async (req, res) => {

  try {
    const url = req.originalUrl.replace(base, '')
    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('../index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import(`${cwd}/dist/server/entry-server.js`)).render
    }

    const rendered = await render(url, ssrManifest)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    res.end(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

export default app;
