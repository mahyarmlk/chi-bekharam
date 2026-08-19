import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: 'چی‌بخرم؟ — یه جواب، نه صدتا محصول' },
      {
        name: 'description',
        content: 'بگو چی می‌خوای بخری و بودجه‌ات چقدره؛ چی‌بخرم؟ بهترین انتخاب را با دلیل، نقطه‌ضعف و جایگزین‌ها پیشنهاد می‌دهد.',
      },
      { name: 'theme-color', content: '#f8f7f4' },
      { property: 'og:title', content: 'چی‌بخرم؟ — دستیار تصمیم خرید' },
      { property: 'og:description', content: 'یه جواب، نه صدتا محصول.' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  notFoundComponent: () => (
    <main className="empty-page">
      <a href="/" className="logo" aria-label="خانه"><span>چ</span><b>چی‌بخرم؟</b></a>
      <h1>این صفحه رو پیدا نکردم.</h1>
      <a className="button button-dark" href="/">برگرد به خانه</a>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
