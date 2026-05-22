interface Props {
  siteUrl: string;
}

export default function WebSiteJsonLd({ siteUrl }: Props) {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "운세 참고서",
    url: `${siteUrl}/`,
    inLanguage: "ko",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "운세 참고서",
    url: `${siteUrl}/`,
    founder: {
      "@type": "Person",
      name: "익현",
      alternateName: "益軒",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
