import { createFileRoute } from '@tanstack/react-router'
import { recommend } from '~/server/recommendation'

export const Route = createFileRoute('/api/recommend')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { query?: unknown }
          const query = typeof body.query === 'string' ? body.query.trim() : ''

          if (query.length < 3) {
            return Response.json(
              { error: 'برای پیشنهاد بهتر، کمی بیشتر درباره چیزی که می‌خواهی بنویس.' },
              { status: 400 },
            )
          }

          if (query.length > 500) {
            return Response.json({ error: 'سوال خیلی طولانی است.' }, { status: 400 })
          }

          return Response.json(recommend(query), {
            headers: { 'Cache-Control': 'no-store' },
          })
        } catch (error) {
          console.error(JSON.stringify({
            message: 'recommendation request failed',
            error: error instanceof Error ? error.message : String(error),
          }))
          return Response.json({ error: 'نتونستم پیشنهاد رو بسازم. دوباره امتحان کن.' }, { status: 500 })
        }
      },
    },
  },
})
