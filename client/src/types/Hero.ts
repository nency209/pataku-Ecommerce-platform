export interface HeroContent {
    subtitle: string
    title: string
    title2?: string
    buttonText: string
    buttonLink: string
    image: string
    badge?: string
}

// Page metadata types
export interface PageMetadata {
    title: string
    description: string
    keywords?: string[]
    ogImage?: string
    canonical?: string
}

export interface ServiceGuarantee {
  icon: string;
  title: string;
  description: string;
}