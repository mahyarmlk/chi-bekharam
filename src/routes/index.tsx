import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { ProductKind, ProductRecommendation, RecommendationResult } from '~/lib/types'

export const Route = createFileRoute('/')({
  component: Home,
})

const examples = [
  'هدفون تا ۵ میلیون برای متال',
  'گوشی تا ۳۰ میلیون برای عکاسی',
  'لپ‌تاپ برنامه‌نویسی تا ۷۰ میلیون',
  'ایر فرایر تا ۱۰ میلیون برای دو نفر',
]

const formatPrice = (price: number) => `${new Intl.NumberFormat('fa-IR').format(price)} تومان`

function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<RecommendationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  async function search(nextQuery = query) {
    const q = nextQuery.trim()
    if (!q || loading) return
    setQuery(q)
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const payload = await response.json() as RecommendationResult | { error: string }
      if (!response.ok || 'error' in payload) throw new Error('error' in payload ? payload.error : 'خطای نامشخص')
      setResult(payload)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'یه مشکلی پیش اومد. دوباره امتحان کن.')
    } finally {
      setLoading(false)
    }
  }

  function refine(text: string) {
    const next = `${result?.query ?? query}، ${text}`
    void search(next)
  }

  return (
    <>
      <header className="topbar">
        <div className="container nav-inner">
          <a href="/" className="logo" aria-label="چی‌بخرم؟">
            <span>چ</span><b>چی‌بخرم؟</b>
          </a>
          <div className="nav-note">نسخه آزمایشی</div>
        </div>
      </header>

      <main>
        <section className={`hero ${result ? 'hero-compact' : ''}`}>
          <div className="container hero-inner">
            {!result && <div className="overline"><i /> خرید راحت‌تر، تصمیم مطمئن‌تر</div>}
            <h1>{result ? 'یه چیز دیگه می‌خوای؟' : <>یه جواب.<br /><em>نه صدتا محصول.</em></>}</h1>
            {!result && <p className="hero-copy">بودجه، استفاده و چیزهایی که برات مهمه رو بگو. ما می‌گیم کدوم رو بخری — و چرا.</p>}

            <div className="ask-card">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void search()
                  }
                }}
                rows={1}
                placeholder="مثلاً هدفون تا ۵ میلیون برای متال می‌خوام..."
                aria-label="چی می‌خوای بخری؟"
              />
              <button className="send" onClick={() => void search()} disabled={loading || query.trim().length < 2} aria-label="پیشنهاد بده">
                {loading ? <span className="spinner" /> : <ArrowLeft />}
              </button>
            </div>
            <div className="ask-hint">Enter برای جستجو · هرچقدر طبیعی‌تر بنویسی بهتره</div>
            {error && <div className="error">{error}</div>}

            {!result && (
              <div className="examples" aria-label="نمونه سوال‌ها">
                {examples.map((example) => (
                  <button key={example} onClick={() => void search(example)}>{example}<ArrowUpLeft /></button>
                ))}
              </div>
            )}
          </div>
        </section>

        {loading && !result && <LoadingResult />}

        {result && (
          <div className="results" ref={resultsRef}>
            <section className="intent-strip">
              <div className="container intent-inner">
                <span className="intent-label">چیزی که فهمیدیم</span>
                <div className="intent-chips">
                  <span>{result.intent.category}</span>
                  <span>{result.intent.budget}</span>
                  <span>{result.intent.useCase}</span>
                  <span>{result.intent.priority}</span>
                </div>
              </div>
            </section>

            <section className="recommendation-section">
              <div className="container result-container">
                <div className="verdict-copy">
                  <div className="section-kicker"><Spark /> پیشنهاد من</div>
                  <p className="verdict-kicker">{result.verdict.kicker}</p>
                  <h2>{result.verdict.title}</h2>
                  <p className="verdict-subtitle">{result.verdict.subtitle}</p>
                  <div className="confidence"><span /> تطابق با نیاز تو: <b>{result.verdict.confidence}</b></div>
                </div>

                <WinnerCard product={result.winner} />

                <div className="reason-grid">
                  <div className="reason-card positive">
                    <div className="reason-heading"><CheckCircle /> چرا این؟</div>
                    <ul>{result.winner.pros.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div className="reason-card caution">
                    <div className="reason-heading"><InfoCircle /> قبل از خرید بدون</div>
                    <p>{result.winner.con}</p>
                  </div>
                </div>

                <section className="fit-card">
                  <div className="fit-head">
                    <div><span>این محصول برای تو</span><h3>چقدر خوبه؟</h3></div>
                    <span className="fit-badge">بدون امتیاز الکی AI</span>
                  </div>
                  <div className="score-list">
                    {result.winner.scores.map((score) => (
                      <div className="score-row" key={score.label}>
                        <span>{score.label}</span>
                        <div className="score-track"><i style={{ width: `${score.value}%` }} /></div>
                        <b>{score.display}</b>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>

            <section className="alternatives-section">
              <div className="container result-container">
                <div className="section-title">
                  <span>اگر انتخاب اول دقیقاً مناسب نبود</span>
                  <h2>دو دلیل برای انتخاب یه چیز دیگه.</h2>
                </div>
                <div className="alternative-grid">
                  {result.alternatives.map((alt, index) => (
                    <AlternativeCard key={`${alt.label}-${index}`} {...alt} />
                  ))}
                </div>
              </div>
            </section>

            <section className="signals-section">
              <div className="container result-container signal-grid">
                <div className="signals-copy">
                  <div className="section-kicker">خلاصه نظر خریدارها</div>
                  <h2>صدها نظر،<br />بدون اسکرول بی‌پایان.</h2>
                  <p>در نسخه واقعی، نظرها به سیگنال‌های قابل تصمیم تبدیل می‌شن؛ نه یک پاراگراف مبهم ساخته‌شده توسط AI.</p>
                </div>
                <div className="signal-card">
                  <div className="signal-column">
                    <span className="signal-title good">بیشتر تعریف کردن از</span>
                    {result.reviewSignals.positives.map((item) => <Signal key={item.label} {...item} positive />)}
                  </div>
                  <div className="signal-divider" />
                  <div className="signal-column">
                    <span className="signal-title bad">بیشتر ایراد گرفتن از</span>
                    {result.reviewSignals.negatives.map((item) => <Signal key={item.label} {...item} />)}
                  </div>
                </div>
              </div>
            </section>

            <section className="refine-section">
              <div className="container result-container refine-card">
                <span>یه چیز رو عوض کنیم؟</span>
                <h2>بدون شروع دوباره، پیشنهاد رو دقیق‌تر کن.</h2>
                <div className="refine-buttons">
                  {result.refinements.map((item) => <button key={item} onClick={() => refine(item)} disabled={loading}>{item}<ArrowLeft /></button>)}
                </div>
              </div>
            </section>

            <section className="trust-section">
              <div className="container trust-inner">
                <Shield />
                <p><b>شفافیت مهمه.</b> این MVP با داده ساختگی کار می‌کنه. نسخه واقعی قیمت، موجودی و مشخصات رو از منبع داده مجاز می‌گیره و لینک خرید، لینک همکاری در فروش خواهد بود.</p>
                <span>{result.freshness}</span>
              </div>
            </section>
          </div>
        )}

        {!result && <LandingProof />}
      </main>

      <footer>
        <div className="container footer-inner"><span>چی‌بخرم؟</span><span>یه جواب، نه صدتا محصول.</span></div>
      </footer>
    </>
  )
}

function WinnerCard({ product }: { product: ProductRecommendation }) {
  return (
    <article className="winner-card">
      <div className="product-art-wrap">
        <div className="best-pill">انتخاب اول</div>
        <ProductArt kind={product.kind} />
      </div>
      <div className="winner-details">
        <span className="brand">{product.brand}</span>
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <div className="rating"><Star /> <b>{product.rating.toLocaleString('fa-IR')}</b><span>از {product.ratingCount.toLocaleString('fa-IR')} نظر</span></div>
        <div className="price-block">
          <div>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <span>قیمت نمایشی</span>
        </div>
        <a className="button buy-button" href={`/go/${product.slug}`} target="_blank" rel="noreferrer">مشاهده در دیجی‌کالا <ArrowUpLeft /></a>
        <div className="affiliate-note">با خرید از این لینک ممکنه ما کمیسیون بگیریم؛ قیمت برای تو فرقی نمی‌کنه.</div>
      </div>
    </article>
  )
}

function AlternativeCard({ label, reason, product }: { label: string; reason: string; product: ProductRecommendation }) {
  return (
    <article className="alternative-card">
      <div className="alt-art"><ProductArt kind={product.kind} compact /></div>
      <div className="alt-copy">
        <span className="alt-label">{label}</span>
        <h3>{product.title}</h3>
        <p>{reason}</p>
        <div className="alt-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <a href={`/go/${product.slug}`} target="_blank" rel="noreferrer" aria-label={`مشاهده ${product.title}`}><ArrowUpLeft /></a>
        </div>
      </div>
    </article>
  )
}

function Signal({ label, count, positive = false }: { label: string; count: number; positive?: boolean }) {
  return (
    <div className="signal-item">
      <span className={positive ? 'plus' : 'minus'}>{positive ? '+' : '−'}</span>
      <div><b>{label}</b><small>{count.toLocaleString('fa-IR')} اشاره</small></div>
    </div>
  )
}

function ProductArt({ kind, compact = false }: { kind: ProductKind; compact?: boolean }) {
  const className = compact ? 'product-art compact' : 'product-art'
  if (kind === 'phone') return <div className={className}><svg viewBox="0 0 220 220" aria-hidden="true"><rect x="66" y="24" width="88" height="172" rx="18" fill="none" stroke="currentColor" strokeWidth="8"/><circle cx="87" cy="49" r="10"/><circle cx="113" cy="49" r="10"/><circle cx="87" cy="75" r="10"/><path d="M101 183h18" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/></svg></div>
  if (kind === 'laptop') return <div className={className}><svg viewBox="0 0 220 220" aria-hidden="true"><rect x="48" y="44" width="124" height="92" rx="10" fill="none" stroke="currentColor" strokeWidth="8"/><path d="M31 158h158l-15 18H46z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/><circle cx="110" cy="90" r="7"/></svg></div>
  if (kind === 'airfryer') return <div className={className}><svg viewBox="0 0 220 220" aria-hidden="true"><rect x="56" y="30" width="108" height="154" rx="32" fill="none" stroke="currentColor" strokeWidth="8"/><circle cx="110" cy="69" r="19" fill="none" stroke="currentColor" strokeWidth="7"/><path d="M78 111h64v42H78zM98 153v19h24v-19" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/></svg></div>
  return <div className={className}><svg viewBox="0 0 220 220" aria-hidden="true"><path d="M52 116V96c0-39 25-66 58-66s58 27 58 66v20" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/><rect x="40" y="104" width="34" height="72" rx="15" fill="currentColor"/><rect x="146" y="104" width="34" height="72" rx="15" fill="currentColor"/><path d="M74 158c8 17 21 26 36 26s28-9 36-26" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/></svg></div>
}

function LandingProof() {
  return (
    <section className="landing-proof">
      <div className="container proof-grid">
        <div className="proof-copy"><span>چرا چی‌بخرم؟</span><h2>فروشگاه بهت گزینه می‌ده.<br />ما بهت <em>تصمیم</em> می‌دیم.</h2></div>
        <div className="proof-items">
          <div><b>۰۱</b><h3>نیازت رو می‌فهمیم</h3><p>نه فقط دسته‌بندی و فیلتر؛ کاربرد، بودجه و ترجیح واقعی.</p></div>
          <div><b>۰۲</b><h3>یک انتخاب اصلی</h3><p>به جای قایم شدن پشت ده گزینه، مسئولیت پیشنهاد رو می‌پذیریم.</p></div>
          <div><b>۰۳</b><h3>نقطه ضعف رو هم می‌گیم</h3><p>اعتماد از جایی شروع می‌شه که فقط تعریف نکنیم.</p></div>
        </div>
      </div>
    </section>
  )
}

function LoadingResult() {
  return <div className="container loading-result"><div /><div /><div /></div>
}

function ArrowLeft() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function ArrowUpLeft() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 17 7 7m0 0v8m0-8h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function Spark() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10 5.2-.6 9.4-4.8 10-10Z" fill="currentColor"/></svg> }
function Star() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9L12 3Z" fill="currentColor"/></svg> }
function CheckCircle() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m8 12 2.5 2.5L16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function InfoCircle() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 11v6M12 7.5h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> }
function Shield() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.8 2.9 8.5 7 10 4.1-1.5 7-5.2 7-10V6l-7-3Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> }
