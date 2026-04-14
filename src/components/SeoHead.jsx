import { useEffect } from 'react'

function upsertMeta(attrName, attrValue, content) {
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrName, attrValue)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export function SeoHead({ seo }) {
  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const imageUrl =
      typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : '/og-image.svg'

    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', 'ru_RU')
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:url', currentUrl)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertLink('canonical', currentUrl)
  }, [seo])

  return null
}
