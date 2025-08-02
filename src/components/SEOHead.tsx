import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Juan Arturo Cruz Armenta - Desarrollador Full Stack Elite',
  description = 'Desarrollador Backend & Full Stack especializado en Java Spring Boot, React.js, Python. Portfolio interactivo con certificaciones técnicas y experiencia profesional.',
  keywords = 'desarrollador full stack, java spring boot, react.js, python, typescript, sql optimization, backend developer, frontend developer, certificaciones técnicas, león guanajuato',
  image = '/portfolio-elite/og-image.jpg',
  url = 'https://arturocruzarm.github.io/portfolio-elite/',
  type = 'website'
}) => {
  useEffect(() => {
    // Actualizar título
    document.title = title

    // Función para actualizar o crear meta tag
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Meta tags básicos
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'Juan Arturo Cruz Armenta')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('language', 'es')
    updateMetaTag('theme-color', '#3b82f6')

    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:locale', 'es_MX', true)
    updateMetaTag('og:site_name', 'Portfolio Juan Arturo Cruz', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:creator', '@ArturoCruzDev')

    // Structured Data JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Juan Arturo Cruz Armenta",
      "jobTitle": "Desarrollador Full Stack",
      "description": description,
      "url": url,
      "image": image,
      "sameAs": [
        "https://github.com/ArturoCruzArm",
        "https://linkedin.com/in/juan-arturo-cruz-armenta"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "León",
        "addressRegion": "Guanajuato",
        "addressCountry": "México"
      },
      "knowsAbout": [
        "Java Spring Boot",
        "React.js",
        "Python",
        "TypeScript",
        "SQL Optimization",
        "Backend Development",
        "Frontend Development",
        "Full Stack Development"
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "Instituto Tecnológico de León"
        },
        {
          "@type": "EducationalOrganization", 
          "name": "Universidad Virtual del Estado de Guanajuato"
        }
      ]
    }

    // Actualizar o crear script de structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]')
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)

  }, [title, description, keywords, image, url, type])

  return null
}

export default SEOHead