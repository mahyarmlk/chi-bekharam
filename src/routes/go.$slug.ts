import { createFileRoute } from '@tanstack/react-router'
import { findProduct } from '~/server/recommendation'

export const Route = createFileRoute('/go/$slug')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const product = findProduct(params.slug)
        if (!product) return new Response('Product not found', { status: 404 })

        console.log(JSON.stringify({
          message: 'outbound product click',
          product: product.slug,
          destination: 'digikala',
        }))

        return Response.redirect(product.digikalaUrl, 302)
      },
    },
  },
})
