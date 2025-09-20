// Structured Data for SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Blockchain Pioneer Student UTC",
  "alternateName": "CLB Blockchain UTC",
  "url": "https://blockchain-utc.vercel.app",
  "logo": "https://blockchain-utc.vercel.app/logo.png",
  "description": "Câu lạc bộ Blockchain Pioneer Student - Trường Đại học Giao thông Vận tải. Nơi sinh viên học hỏi, phát triển và ứng dụng công nghệ Blockchain, Web3.",
  "foundingDate": "2024-04-01",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN",
    "addressRegion": "Hà Nội",
    "addressLocality": "Hà Nội"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "blockchain.utc@gmail.com",
    "url": "https://blockchain-utc.vercel.app/contact"
  },
  "sameAs": [
    "https://www.facebook.com/blockchain.utc",
    "https://www.instagram.com/blockchain.utc",
    "https://twitter.com/blockchain_utc",
    "https://www.linkedin.com/company/blockchain-utc"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Trường Đại học Giao thông Vận tải",
    "url": "https://utc.edu.vn"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Blockchain Pioneer Student UTC",
  "url": "https://blockchain-utc.vercel.app",
  "description": "Trang web chính thức của Câu lạc bộ Blockchain Pioneer Student - Trường Đại học Giao thông Vận tải",
  "publisher": {
    "@type": "Organization",
    "name": "Blockchain Pioneer Student UTC"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://blockchain-utc.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Blockchain Pioneer Student UTC",
  "description": "Câu lạc bộ học thuật chuyên về công nghệ Blockchain và Web3",
  "url": "https://blockchain-utc.vercel.app",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN",
    "addressRegion": "Hà Nội"
  },
  "memberOf": {
    "@type": "CollegeOrUniversity",
    "name": "Trường Đại học Giao thông Vận tải"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Chương trình đào tạo Blockchain",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Khóa học Cardano Blockchain",
        "description": "Khóa học cấp tốc 9 buổi về Cardano Blockchain",
        "provider": {
          "@type": "Organization",
          "name": "Blockchain Pioneer Student UTC"
        }
      },
      {
        "@type": "Course", 
        "name": "Hackathon Blockchain",
        "description": "Cuộc thi lập trình Blockchain trong 24-48 giờ",
        "provider": {
          "@type": "Organization",
          "name": "Blockchain Pioneer Student UTC"
        }
      }
    ]
  }
};

export const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Cardano Blockchain Hackathon 2025",
  "description": "Cuộc thi Hackathon quy mô lớn với giải thưởng 350 triệu VNĐ, thu hút hơn 200 thí sinh từ các trường đại học trên cả nước.",
  "startDate": "2025-03-01T08:00:00+07:00",
  "endDate": "2025-03-02T18:00:00+07:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Trường Đại học Giao thông Vận tải",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "VN",
      "addressRegion": "Hà Nội"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Blockchain Pioneer Student UTC",
    "url": "https://blockchain-utc.vercel.app"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "VND",
    "availability": "https://schema.org/InStock",
    "url": "https://blockchain-utc.vercel.app/events"
  }
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const articleSchema = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Blockchain Pioneer Student UTC",
    "logo": {
      "@type": "ImageObject",
      "url": "https://blockchain-utc.vercel.app/logo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified,
  "url": article.url,
  "image": article.image || "https://blockchain-utc.vercel.app/og-image.jpg"
});
