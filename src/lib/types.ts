export type ProductKind = 'headphones' | 'phone' | 'laptop' | 'airfryer'

export type Score = {
  label: string
  value: number
  display: string
}

export type ProductRecommendation = {
  slug: string
  title: string
  brand: string
  kind: ProductKind
  price: number
  oldPrice?: number
  rating: number
  ratingCount: number
  fit: string
  summary: string
  pros: string[]
  con: string
  scores: Score[]
  digikalaUrl: string
}

export type RecommendationResult = {
  query: string
  intent: {
    budget: string
    useCase: string
    priority: string
    category: string
  }
  verdict: {
    kicker: string
    title: string
    subtitle: string
    confidence: 'خیلی بالا' | 'بالا' | 'متوسط'
  }
  winner: ProductRecommendation
  alternatives: Array<{
    label: string
    reason: string
    product: ProductRecommendation
  }>
  reviewSignals: {
    positives: Array<{ label: string; count: number }>
    negatives: Array<{ label: string; count: number }>
  }
  refinements: string[]
  freshness: string
}
