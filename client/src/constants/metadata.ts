
import { Metadata } from 'next'
import { siteConfig } from '@/constants'

export const defaultMetadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        'furniture',
        'home decor',
        'accent chair',
        'sofa',
        'living room',
        'pataku',
        'online shopping',
        'luxury furniture',
        'affordable furniture',
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@pataku',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
}

export function generateMetadata(
    title?: string,
    description?: string,
    keywords?: string[],
    image?: string
): Metadata {
    return {
        title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
        description: description || siteConfig.description,
        keywords: keywords || defaultMetadata.keywords,
        openGraph: {
            ...defaultMetadata.openGraph,
            title: title || siteConfig.name,
            description: description || siteConfig.description,
            images: image ? [{ url: image, width: 1200, height: 630, alt: title || siteConfig.name }] : defaultMetadata.openGraph?.images,
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: title || siteConfig.name,
            description: description || siteConfig.description,
            images: image ? [image] : defaultMetadata.twitter?.images,
        },
    }
}

// Page-specific metadata
export const homePageMetadata: Metadata = generateMetadata(
    'Home',
    'Discover beautiful and luxurious furniture at affordable prices. Shop our collection of accent chairs, sofas, and home decor.',
    ['furniture', 'home decor', 'accent chair', 'sofa', 'living room', 'luxury furniture']
)

export const shopPageMetadata: Metadata = generateMetadata(
    'Shop',
    'Browse our complete collection of furniture and home decor items. Find the perfect pieces for your home.',
    ['shop', 'furniture', 'home decor', 'buy furniture', 'online store']
)

export const productPageMetadata: Metadata = generateMetadata(
    'Products',
    'Explore our product catalog featuring high-quality furniture and home accessories.',
    ['products', 'furniture catalog', 'home accessories', 'furniture items']
)

export const contactPageMetadata: Metadata = generateMetadata(
    'Contact Us',
    'Get in touch with Pataku. We\'re here to help with your furniture and home decor needs.',
    ['contact', 'customer service', 'support', 'help', 'get in touch']
)

export const blogPageMetadata: Metadata = generateMetadata(
    'Blog',
    'Read our latest articles on home decor, furniture trends, and interior design tips.',
    ['blog', 'home decor tips', 'furniture trends', 'interior design', 'articles']
)

// Wishlist Page Metadata
export const wishlistPageMetadata: Metadata = generateMetadata(
  "Wishlist",
  "View and manage your saved favorite products on Pataku.",
  ["wishlist", "favorites", "saved products", "furniture wishlist"]
)

// Cart Page Metadata
export const cartPageMetadata: Metadata = generateMetadata(
  "Cart",
  "Review the items in your shopping cart and proceed to checkout.",
  ["cart", "shopping cart", "checkout", "furniture cart"]
)

// About Page Metadata
export const aboutPageMetadata: Metadata = generateMetadata(
  "About Us",
  "Learn more about Pataku, our mission, and our commitment to providing luxury and affordable furniture.",
  ["about", "about pataku", "company info", "furniture brand"]
)

// Shipping Policy Metadata
export const shippingPolicyMetadata: Metadata = generateMetadata(
  "Shipping Policy",
  "Read Pataku's shipping policy including delivery timelines, charges, and more.",
  ["shipping", "shipping policy", "delivery", "furniture shipping"]
)

// Size Guide Metadata
export const sizeGuideMetadata: Metadata = generateMetadata(
  "Size Guide",
  "Check our detailed size guide to find the perfect fit for your furniture and home decor.",
  ["size guide", "dimensions", "furniture size", "measurements"]
)


// Login Page Metadata
export const loginPageMetadata: Metadata = generateMetadata(
  "Login",
  "Access your Pataku account to view orders, manage wishlist, and shop seamlessly.",

)

// Register Page Metadata
export const registerPageMetadata: Metadata = generateMetadata(
  "Register",
  "Create a new Pataku account to enjoy exclusive offers, manage your orders, and save favorite products.",
  
)

// Checkout Page Metadata
export const checkoutPageMetadata: Metadata = generateMetadata(
  "Checkout",
  "Complete your purchase securely with Pataku’s easy checkout process.",

)
